import { NodeEventBus } from '../infrastructure/core/events/node-event-bus';
import { ServiceTicketIndexDocument, ServiceTicketIndexSpec } from './service-ticket-search-index-format';
import { ICognitiveSearch } from '../../infrastructure/services/cognitive-search';
import { ServiceTicketDeletedEvent } from '../events/service-ticket-deleted';

export default (cognitiveSearch:ICognitiveSearch) => {
  NodeEventBus.register(ServiceTicketDeletedEvent, async (payload) => {
    console.log(`Property Deleted - Search Index Integration: ${JSON.stringify(payload)} and PropertyId: ${payload.id}`);

    let serviceTicketDoc: Partial<ServiceTicketIndexDocument> = {
      id: payload.id,
    };
    await cognitiveSearch.deleteDocument(ServiceTicketIndexSpec.name, serviceTicketDoc);
  });
};
