import { NodeEventBus } from '../core/events/node-event-bus';
import { PropertyListingIndexDocument, propertyListingIndexSpec } from './property-search-index-format';
import { CognitiveSearch } from '../../../infrastructure/services/cognitive-search';
import { PropertyDeletedEvent } from '../../events/property-deleted';


export default () => { NodeEventBus.register(PropertyDeletedEvent, async (payload) => {
  console.log(`Property Deleted - Search Index Integration: ${JSON.stringify(payload)} and PropertyId: ${payload.id}`);

  let cognitiveSearch = new CognitiveSearch();
  let listingDoc:Partial<PropertyListingIndexDocument> = {
    id: payload.id,
  };  
  await cognitiveSearch.deleteDocument(propertyListingIndexSpec.name, listingDoc);

})};