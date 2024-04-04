import { ServiceTicketIndexDocument, ServiceTicketIndexSpec } from '../../infrastructure/cognitive-search/service-ticket-search-index-format';
import { CognitiveSearchDomain } from '../../infrastructure/cognitive-search/interfaces';
import { SystemExecutionContext } from '../../contexts/domain-execution-context';
import { ServiceTicketUpdatedEvent } from '../types/service-ticket-updated';
import retry from 'async-retry';
import { ServiceTicket, ServiceTicketProps } from '../../contexts/service-ticket/service-ticket';
import dayjs from 'dayjs';
import { EventBusInstance } from '../event-bus';
import { ServiceTicketUnitOfWork } from '../../contexts/service-ticket/service-ticket.uow';
import { ServiceTicketRepository } from '../../contexts/service-ticket/service-ticket.repository';

const crypto = require('crypto');

export default (
  cognitiveSearch: CognitiveSearchDomain,
  serviceTicketUnitOfWork: ServiceTicketUnitOfWork
) => { EventBusInstance.register(ServiceTicketUpdatedEvent, async (payload) => {
    console.log(`Service Ticket Updated - Search Index Integration: ${JSON.stringify(payload)} and ServiceTicketId: ${payload.id}`);

    const context = SystemExecutionContext();
    await serviceTicketUnitOfWork.withTransaction(context, async (repo) => {
      let serviceTicket = await repo.getById(payload.id);

      const updatedDate = dayjs(serviceTicket.updatedAt.toISOString().split('T')[0]).toISOString();

      const createdDate = dayjs(serviceTicket.createdAt.toISOString().split('T')[0]).toISOString();

      let serviceTicketDoc: Partial<ServiceTicketIndexDocument> = {
        id: serviceTicket.id,
        communityId: serviceTicket.community.id,
        propertyId: serviceTicket.property.id,
        title: serviceTicket.title,
        requestor: serviceTicket.requestor.memberName,
        requestorId: serviceTicket.requestor.id,
        assignedTo: serviceTicket.assignedTo?.memberName ?? '',
        assignedToId: serviceTicket.assignedTo?.id ?? '',
        description: serviceTicket.description,
        status: serviceTicket.status,
        priority: serviceTicket.priority,
        createdAt: createdDate,
        updatedAt: updatedDate,
      };

      let serviceTicketDocCopy = JSON.parse(JSON.stringify(serviceTicketDoc));
      delete serviceTicketDocCopy.updatedAt;

      const hash = crypto.createHash('sha256').update(JSON.stringify(serviceTicketDocCopy)).digest('base64');

      const maxAttempt = 3;
      if (serviceTicket.hash !== hash) {
        await retry(
          async (failedCB, currentAttempt) => {
            if (currentAttempt > maxAttempt) {
              serviceTicket.UpdateIndexFailedDate = new Date();
              serviceTicket.Hash = hash;
              await repo.save(serviceTicket);
              console.log('Index update failed: ', serviceTicket.updateIndexFailedDate);
              console.log(serviceTicket);
              return;
            }
            await updateSearchIndex(serviceTicketDoc, serviceTicket, hash, repo);
          },
          {
            retries: maxAttempt,
          }
        );
      }
    });
  });

  async function updateSearchIndex(
    serviceTicketDoc: Partial<ServiceTicketIndexDocument>,
    serviceTicket: ServiceTicket<ServiceTicketProps>,
    hash: any,
    repo: ServiceTicketRepository<ServiceTicketProps>,
  ) {
    await cognitiveSearch.createOrUpdateIndex(ServiceTicketIndexSpec.name, ServiceTicketIndexSpec);
    await cognitiveSearch.indexDocument(ServiceTicketIndexSpec.name, serviceTicketDoc);
    console.log(`Service Ticket Updated - Index Updated: ${JSON.stringify(serviceTicketDoc)}`);

    serviceTicket.LastIndexed = new Date();
    serviceTicket.Hash = hash;
    await repo.save(serviceTicket);
    console.log('Index update successful: ', serviceTicket.lastIndexed);
  }
};
