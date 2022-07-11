import { NodeEventBus } from '../events/node-event-bus';
import { ServiceTicketIndexDocument, ServiceTicketIndexSpec } from './service-ticket-search-index-format';
import { CognitiveSearch } from '../../../infrastructure/services/cognitive-search';
import { ServiceTicketUnitOfWork } from '../persistance/repositories';
import { SystemExecutionContext } from '../persistance/execution-context';
import { ServiceTicketUpdatedEvent } from '../../events/service-ticket-updated';
import { ServiceTicketDomainAdapter } from '../persistance/adapters/service-ticket-domain-adapter';
import { ServiceTicket } from '../../contexts/service-ticket/service-ticket';
import { MongoServiceTicketRepository } from '../persistance/repositories/mongo-service-ticket-repository';
import retry from 'async-retry';
const crypto = require('crypto');

export default () => {
  NodeEventBus.register(ServiceTicketUpdatedEvent, async (payload) => {
    console.log(`Service Ticket Updated - Search Index Integration: ${JSON.stringify(payload)} and ServiceTicketId: ${payload.id}`);

    const context = await SystemExecutionContext();
    await ServiceTicketUnitOfWork.withTransaction(context, async (repo) => {
      let serviceTicket = await repo.getById(payload.id);

      let serviceTicketDoc: Partial<ServiceTicketIndexDocument> = {
        id: serviceTicket.id,
        communityId: serviceTicket.community.id,
        propertyId: serviceTicket.property.id,
        title: serviceTicket.title,
        requestor: serviceTicket.requestor.memberName,
        assignedTo: serviceTicket.assignedTo?.memberName ?? '',
        description: serviceTicket.description,
        status: serviceTicket.status,
        priority: serviceTicket.priority,
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
