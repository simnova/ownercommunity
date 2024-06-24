import { ServiceTicketIndexDocument, ServiceTicketIndexSpec } from '../../infrastructure/cognitive-search/service-ticket-search-index-format';
import { CognitiveSearchDomain } from '../../infrastructure/cognitive-search/interfaces';
import { SystemExecutionContext } from '../../contexts/domain-execution-context';
import { ViolationTicketUpdatedEvent } from '../types/violation-ticket-updated';
import retry from 'async-retry';
import { ViolationTicket, ViolationTicketProps } from '../../contexts/violation-ticket/violation-ticket';
import dayjs from 'dayjs';
import { EventBusInstance } from '../event-bus';
import { ViolationTicketUnitOfWork } from '../../contexts/violation-ticket/violation-ticket.uow';
import { ViolationTicketRepository } from '../../contexts/violation-ticket/violation-ticket.repository';

const crypto = require('crypto');
let called = 0;
export default (
  cognitiveSearch: CognitiveSearchDomain,
  violationTicketUnitOfWork: ViolationTicketUnitOfWork
) => { EventBusInstance.register(ViolationTicketUpdatedEvent, async (payload) => {
    console.log(`Violation Ticket Updating - Search Index Integration: ${JSON.stringify(payload)} and ViolationTicketId: ${payload.id}`);
    const context = SystemExecutionContext();
    await violationTicketUnitOfWork.withTransaction(context, async (repo) => {
      let violationTicket = await repo.getById(payload.id);

      const updatedDate = dayjs(violationTicket.updatedAt.toISOString().split('T')[0]).toISOString();

      const createdDate = dayjs(violationTicket.createdAt.toISOString().split('T')[0]).toISOString();

      const penaltyPaidDate = violationTicket.penaltyPaidDate ? dayjs(violationTicket.penaltyPaidDate.toISOString().split('T')[0]).toISOString() : null;

      let violationTicketDoc: Partial<ServiceTicketIndexDocument> = {
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

      let violationTicketDocCopy = JSON.parse(JSON.stringify(violationTicketDoc));
      delete violationTicketDocCopy.updatedAt;

      const hash = crypto.createHash('sha256').update(JSON.stringify(violationTicketDocCopy)).digest('base64');

      const maxAttempt = 3;
      if (violationTicket.hash !== hash) {
        await retry(
          async (failedCB, currentAttempt) => {
            if (currentAttempt > maxAttempt) {
              violationTicket.UpdateIndexFailedDate = new Date();
              violationTicket.Hash = hash;
              await repo.save(violationTicket);
              console.log('Index update failed: ', violationTicket.updateIndexFailedDate);
              console.log(violationTicket);
              return;
            }
            await updateSearchIndex(violationTicketDoc, violationTicket, hash, repo);
          },
          {
            retries: maxAttempt,
          }
        );
      }
    });
  });

  const updateSearchIndex = async (
    violationTicketDoc: Partial<ServiceTicketIndexDocument>,
    violationTicket: ViolationTicket<ViolationTicketProps>,
    hash: any,
    repo: ViolationTicketRepository<ViolationTicketProps>,
  ) => {
    await cognitiveSearch.createOrUpdateIndex(ServiceTicketIndexSpec.name, ServiceTicketIndexSpec);
    await cognitiveSearch.indexDocument(ServiceTicketIndexSpec.name, violationTicketDoc);
    console.log(`Violation Ticket Updated - Index Updated: ${JSON.stringify(violationTicketDoc)}`);

    violationTicket.LastIndexed = new Date();
    violationTicket.Hash = hash;
    await repo.save(violationTicket);
    console.log('Index update successful: ', violationTicket.lastIndexed);
  }
};
