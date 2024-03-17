import { PropertyListingIndexDocument, PropertyListingIndexSpec } from '../../services/cognitive-search/property-search-index-format';
import { ICognitiveSearch } from '../../services/cognitive-search/interfaces';
import { PropertyDeletedEvent } from '../types/property-deleted';
import { EventBusInstance } from '../event-bus';

export default (
  cognitiveSearch:ICognitiveSearch,
) => { EventBusInstance.register(PropertyDeletedEvent, async (payload) => {
    console.log(`Property Deleted - Search Index Integration: ${JSON.stringify(payload)} and PropertyId: ${payload.id}`);

    let listingDoc: Partial<PropertyListingIndexDocument> = {
      id: payload.id,
    };
    await cognitiveSearch.deleteDocument(PropertyListingIndexSpec.name, listingDoc);
  });
};
