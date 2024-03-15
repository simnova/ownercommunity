import { NodeEventBus } from '../infrastructure/core/events/node-event-bus';
import { ServiceTicketIndexDocument, ServiceTicketIndexSpec } from './service-ticket-search-index-format';
import { ICognitiveSearch } from '../../infrastructure/services/cognitive-search';
import { SystemExecutionContext } from '../infrastructure/execution-context';
import { ServiceTicketUpdatedEvent } from '../events/service-ticket-updated';
import retry from 'async-retry';
import { ServiceTicketUnitOfWork } from '../../domain-impl-mongo/service-ticket.uow';
import { ServiceTicket } from '../contexts/service-ticket/service-ticket';
import { ServiceTicketDomainAdapter } from '../../domain-impl-mongo/service-ticket.domain-adapter';
import { MongoServiceTicketRepository } from '../../domain-impl-mongo/service-ticket.mongo-repository';
import dayjs from 'dayjs';

const crypto = require('crypto');

export default (cognitiveSearch: ICognitiveSearch) => {
  NodeEventBus.register(ServiceTicketUpdatedEvent, async (payload) => {
    console.log(`Service Ticket Updated - Search Index Integration: ${JSON.stringify(payload)} and ServiceTicketId: ${payload.id}`);

    const context = SystemExecutionContext();
    await ServiceTicketUnitOfWork.withTransaction(context, async (repo) => {
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
    serviceTicket: ServiceTicket<ServiceTicketDomainAdapter>,
    hash: any,
    repo: MongoServiceTicketRepository<ServiceTicketDomainAdapter>
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
