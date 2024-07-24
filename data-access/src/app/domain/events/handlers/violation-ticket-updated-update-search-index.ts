import retry from 'async-retry';
import crypto from 'crypto';
import dayjs from 'dayjs';
import { CognitiveSearchDomain } from '../../infrastructure/cognitive-search/interfaces';
import { ViolationTicket, ViolationTicketProps } from '../../contexts/cases/violation-ticket/v1/violation-ticket';
import { ViolationTicketUpdatedEvent } from '../types/violation-ticket-updated';
import { SystemExecutionContext } from '../../contexts/domain-execution-context';
import { ViolationTicketUnitOfWork } from '../../contexts/cases/violation-ticket/v1/violation-ticket.uow';
import { ServiceTicketIndexDocument, ServiceTicketIndexSpec } from '../../infrastructure/cognitive-search/service-ticket-search-index-format';
import { EventBusInstance } from '../event-bus';
import { ViolationTicketRepository } from '../../contexts/cases/violation-ticket/v1/violation-ticket.repository';

export default (cognitiveSearch: CognitiveSearchDomain, violationTicketUnitOfWork: ViolationTicketUnitOfWork) => {
  EventBusInstance.register(ViolationTicketUpdatedEvent, async (payload) => {
    // add logging: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry-exporter/samples-dev/logSample.ts

    try {
      const context = SystemExecutionContext();
      await violationTicketUnitOfWork.withTransaction(context, async (repo) => {
        let violationTicket = await repo.getById(payload.id);
        const violationTicketHash = violationTicket.hash;

        let listingDoc: Partial<ServiceTicketIndexDocument> = convertToIndexDocument(violationTicket);

        const hash = generateHash(listingDoc);

        const maxAttempt = 3;

        if (violationTicket.hash === hash) {
          console.log(`Updated Violation ticket hash [${hash}] is same as previous hash [[${violationTicketHash}]]`);
        } else {
          console.log(`Updated Violation ticket hash [${hash}] is different from previous hash [[${violationTicketHash}]]`);
          await retry(
            async (failedCB, currentAttempt) => {
              if (currentAttempt > maxAttempt) {
                violationTicket.UpdateIndexFailedDate = new Date();
                violationTicket.Hash = hash;
                await repo.save(violationTicket);
                console.log('Index update failed: ', violationTicket.updateIndexFailedDate);
              } else {
                await updateSearchIndex(listingDoc, violationTicket, hash, repo);
              }
            },
            {
              retries: maxAttempt,
            }
          );
        }
      });
    } catch (ex) {
      console.log(`Error in updating search index for violation ticket: ${ex}`);
      throw ex;
    }
  });

  async function updateSearchIndex(
    listingDoc: Partial<ServiceTicketIndexDocument>,
    violationTicket: ViolationTicket<ViolationTicketProps>,
    hash: any,
    repo: ViolationTicketRepository<ViolationTicketProps>
  ) {
    await cognitiveSearch.createOrUpdateIndex(ServiceTicketIndexSpec.name, ServiceTicketIndexSpec);
    await cognitiveSearch.indexDocument(ServiceTicketIndexSpec.name, listingDoc);
    console.log(`Violation Ticket - Index Updated: ${JSON.stringify(listingDoc)}`);

    violationTicket.LastIndexed = new Date();
    violationTicket.Hash = hash;
    await repo.save(violationTicket);
    console.log('Index update successful: ', violationTicket.lastIndexed);
  }
};

function generateHash(listingDoc: Partial<ServiceTicketIndexDocument>) {
  const listingDocCopy = structuredClone(listingDoc);
  delete listingDocCopy.updatedAt;
  const hash = crypto.createHash('sha256').update(JSON.stringify(listingDocCopy)).digest('base64');
  return hash;
}

function convertToIndexDocument(violationTicket: ViolationTicket<ViolationTicketProps>) {
  const updatedDate = dayjs(violationTicket.updatedAt.toISOString().split('T')[0]).toISOString();
  const createdDate = dayjs(violationTicket.createdAt.toISOString().split('T')[0]).toISOString();
  const penaltyPaidDate = violationTicket?.penaltyPaidDate ? dayjs(violationTicket?.penaltyPaidDate?.toISOString().split('T')[0]).toISOString() : null;

  let listingDoc: Partial<ServiceTicketIndexDocument> = {
    id: violationTicket.id,
    communityId: violationTicket.community.id,
    propertyId: violationTicket.property.id,
    title: violationTicket.title,
    requestor: violationTicket.requestor.memberName,
    requestorId: violationTicket.requestor.id,
    assignedTo: violationTicket.assignedTo?.memberName ?? '',
    assignedToId: violationTicket.assignedTo?.id ?? '',
    description: violationTicket.description,
    penaltyAmount: violationTicket.penaltyAmount,
    penaltyPaidDate: penaltyPaidDate,
    ticketType: violationTicket.ticketType,
    status: violationTicket.status,
    priority: violationTicket.priority,
    createdAt: createdDate,
    updatedAt: updatedDate,
  };
  return listingDoc;
}
