import { NodeEventBus } from '../events/node-event-bus';
import { ServiceTicketIndexDocument, ServiceTicketIndexSpec } from './service-ticket-search-index-format';
import { CognitiveSearch } from '../../../infrastructure/services/cognitive-search';
import { ServiceTicketDeletedEvent } from '../../events/service-ticket-deleted';

export default () => {
  NodeEventBus.register(ServiceTicketDeletedEvent, async (payload) => {
    console.log(`Property Deleted - Search Index Integration: ${JSON.stringify(payload)} and PropertyId: ${payload.id}`);

    let cognitiveSearch = new CognitiveSearch();
    let serviceTicketDoc: Partial<ServiceTicketIndexDocument> = {
      id: payload.id,
    };
    await cognitiveSearch.deleteDocument(ServiceTicketIndexSpec.name, serviceTicketDoc);
  });
};
