import { ServiceTicketIndexDocument, ServiceTicketIndexSpec } from '../../infrastructure/cognitive-search/service-ticket-search-index-format';
import { CognitiveSearchDomain } from '../../infrastructure/cognitive-search/interfaces';
import { ServiceTicketV1DeletedEvent } from '../types/service-ticket-v1-deleted';
import { EventBusInstance } from '../event-bus';

export default (
  cognitiveSearch:CognitiveSearchDomain
) => { EventBusInstance.register(ServiceTicketV1DeletedEvent, async (payload) => {
    console.log(`Service Ticket Deleted - Search Index Integration: ${JSON.stringify(payload)} and ServiceTicketId: ${payload.id}`);

    let serviceTicketDoc: Partial<ServiceTicketIndexDocument> = {
      id: payload.id,
    };
    await cognitiveSearch.deleteDocument(ServiceTicketIndexSpec.name, serviceTicketDoc);
  });
};
