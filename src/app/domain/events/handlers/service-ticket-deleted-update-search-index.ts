import { ServiceTicketIndexDocument, ServiceTicketIndexSpec } from '../../infrastructure/cognitive-search/service-ticket-search-index-format';
import { CognitiveSearchDomain } from '../../infrastructure/cognitive-search/interfaces';
import { ServiceTicketDeletedEvent } from '../types/service-ticket-deleted';
import { EventBusInstance } from '../event-bus';

export default (
  cognitiveSearch:CognitiveSearchDomain
) => { EventBusInstance.register(ServiceTicketDeletedEvent, async (payload) => {
    console.log(`Property Deleted - Search Index Integration: ${JSON.stringify(payload)} and PropertyId: ${payload.id}`);

    let serviceTicketDoc: Partial<ServiceTicketIndexDocument> = {
      id: payload.id,
    };
    await cognitiveSearch.deleteDocument(ServiceTicketIndexSpec.name, serviceTicketDoc);
  });
};
