import { ServiceTicketIndexDocument as ViolationTicketDocument, ServiceTicketIndexSpec as ViolationTicketIndexSpec } from '../../infrastructure/cognitive-search/service-ticket-search-index-format';
import { CognitiveSearchDomain } from '../../infrastructure/cognitive-search/interfaces';
import { ViolationTicketDeletedEvent } from '../types/violation-ticket-deleted';
import { EventBusInstance } from '../event-bus';

export default (
  cognitiveSearch:CognitiveSearchDomain
) => { EventBusInstance.register(ViolationTicketDeletedEvent, async (payload) => {
    console.log(`Violation ticket deleted - Search Index Integration: ${JSON.stringify(payload)} and ViolationTicketId: ${payload.id}`);

    let violationTicketDoc: Partial<ViolationTicketDocument> = {
      id: payload.id,
    };
    await cognitiveSearch.deleteDocument(ViolationTicketIndexSpec.name, violationTicketDoc);
  });
};
