import { ServiceTicketIndexDocument, ServiceTicketIndexSpec } from '../../../../search/service-ticket-search-index-format';
import { CognitiveSearchDomain } from '../../infrastructure/cognitive-search/interfaces';
import { SystemExecutionContext } from '../../../../../framework/domain/domain-execution-context';
import { ServiceTicketV1UpdatedEvent } from '../types/service-ticket-v1-updated';
import retry from 'async-retry';
import { ServiceTicketV1, ServiceTicketV1Props } from '../../contexts/cases/service-ticket/v1/service-ticket';
import dayjs from 'dayjs';
import { EventBusInstance } from '../../../../../framework/domain/event-bus';
import { ServiceTicketV1UnitOfWork } from '../../contexts/cases/service-ticket/v1/service-ticket.uow';
import { ServiceTicketV1Repository } from '../../contexts/cases/service-ticket/v1/service-ticket.repository';

const crypto = require('crypto');

export default (
  cognitiveSearch: CognitiveSearchDomain,
  serviceTicketV1UnitOfWork: ServiceTicketV1UnitOfWork
) => { EventBusInstance.register(ServiceTicketV1UpdatedEvent, async (payload) => {
    console.log(`Service Ticket Updated - Search Index Integration: ${JSON.stringify(payload)} and ServiceTicketId: ${payload.id}`);

    const context = SystemExecutionContext();
    await serviceTicketV1UnitOfWork.withTransaction(context, async (repo) => {
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
        ticketType: serviceTicket.ticketType,
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
    serviceTicket: ServiceTicketV1<ServiceTicketV1Props>,
    hash: any,
    repo: ServiceTicketV1Repository<ServiceTicketV1Props>,
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
