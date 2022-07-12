import { NodeEventBus } from '../core/events/node-event-bus';
import { ServiceTicketIndexDocument, ServiceTicketIndexSpec } from './service-ticket-search-index-format';
import { CognitiveSearch } from '../../../infrastructure/services/cognitive-search';
import { SystemExecutionContext } from '../execution-context';
import { ServiceTicketUpdatedEvent } from '../../events/service-ticket-updated';
import retry from 'async-retry';
import { ServiceTicketUnitOfWork } from '../persistence/service-ticket.uow';
import { ServiceTicket } from '../../contexts/service-ticket/service-ticket';
import { ServiceTicketDomainAdapter } from '../persistence/service-ticket.domain-adapter';
import { MongoServiceTicketRepository } from '../persistence/service-ticket.mongo-repository';
import dayjs from 'dayjs';

const crypto = require('crypto');

export default () => {
  NodeEventBus.register(ServiceTicketUpdatedEvent, async (payload) => {
    console.log(`Service Ticket Updated - Search Index Integration: ${JSON.stringify(payload)} and ServiceTicketId: ${payload.id}`);

    const context = await SystemExecutionContext();
    await ServiceTicketUnitOfWork.withTransaction(context, async (repo) => {
      let serviceTicket = await repo.getById(payload.id);

      let updatedDate = serviceTicket.updatedAt.toISOString();
      updatedDate = dayjs(serviceTicket.updatedAt.toISOString().split('T')[0]).toISOString();

      let createdDate = serviceTicket.createdAt.toISOString();
      createdDate = dayjs(serviceTicket.createdAt.toISOString().split('T')[0]).toISOString();


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
        createdAt:createdDate,
        updatedAt: updatedDate
      };

      let serviceTicketDocCopy = JSON.parse(JSON.stringify(serviceTicketDoc));
      delete serviceTicketDocCopy.updatedAt;

      const hash = crypto.createHash('sha256').update(JSON.stringify(serviceTicketDocCopy)).digest('base64');

      const maxAttempt = 3;
      if (serviceTicket.hash !== hash) {
        await retry(
          async (failedCB, currentAttempt) => {
            if (currentAttempt > maxAttempt) {
              serviceTicket.requestSetUpdateIndexFailedDate(new Date());
              serviceTicket.requestSetHash(hash);
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
};

async function updateSearchIndex(serviceTicketDoc: Partial<ServiceTicketIndexDocument>, serviceTicket: ServiceTicket<ServiceTicketDomainAdapter>, hash: any, repo: MongoServiceTicketRepository<ServiceTicketDomainAdapter>) {
  let cognitiveSearch = new CognitiveSearch();
  // await cognitiveSearch.createIndexIfNotExists(ServiceTicketIndexSpec.name, ServiceTicketIndexSpec);
  await cognitiveSearch.createOrUpdateIndex(ServiceTicketIndexSpec.name, ServiceTicketIndexSpec);
  await cognitiveSearch.indexDocument(ServiceTicketIndexSpec.name, serviceTicketDoc);
  console.log(`Service Ticket Updated - Index Updated: ${JSON.stringify(serviceTicketDoc)}`);

  serviceTicket.requestSetLastIndexed(new Date());
  serviceTicket.requestSetHash(hash);
  await repo.save(serviceTicket);
  console.log('Index update successful: ', serviceTicket.lastIndexed);
}
