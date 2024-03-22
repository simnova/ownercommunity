import { PropertyListingIndexDocument, PropertyListingIndexSpec } from '../../infrastructure/cognitive-search/property-search-index-format';
import { CognitiveSearchDomain } from '../../infrastructure/cognitive-search/interfaces';
import { PropertyDeletedEvent } from '../types/property-deleted';
import { EventBusInstance } from '../event-bus';

export default (
  cognitiveSearch:CognitiveSearchDomain,
) => { EventBusInstance.register(PropertyDeletedEvent, async (payload) => {
    console.log(`Property Deleted - Search Index Integration: ${JSON.stringify(payload)} and PropertyId: ${payload.id}`);

    let listingDoc: Partial<PropertyListingIndexDocument> = {
      id: payload.id,
    };
    await cognitiveSearch.deleteDocument(PropertyListingIndexSpec.name, listingDoc);
  });
};
