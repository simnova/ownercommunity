import { NodeEventBus } from '../events/node-event-bus';
import { PropertyListingIndexDocument, propertyListingIndexSpec } from './property-search-index-format';
import { CognitiveSearch } from '../../../infrastructure/services/cognitive-search';
import { PropertyUnitOfWork } from '../persistance/repositories';
import { SystemExecutionContext } from '../persistance/execution-context';
import { PropertyUpdatedEvent } from '../../events/property-updated';


export default () => { NodeEventBus.register(PropertyUpdatedEvent, async (payload) => {
  console.log(`Property Updated - Search Index Integration: ${JSON.stringify(payload)} and PropertyId: ${payload.id}`);

  const context = await SystemExecutionContext();
  await PropertyUnitOfWork.withTransaction(context,async (repo) => {

    let property = await repo.getById(payload.id);
    let listingDoc:Partial<PropertyListingIndexDocument> = {
      id: property.id,
      communityId: property.community.id,
      name: property.propertyName,
      type: property.propertyType,
    };
    let cognitiveSearch = new CognitiveSearch();
    await cognitiveSearch.createIndexIfNotExists(propertyListingIndexSpec.name, propertyListingIndexSpec);
    await cognitiveSearch.indexDocument(propertyListingIndexSpec.name, listingDoc);
    console.log(`Property Updated - Search Completed: ${JSON.stringify(listingDoc)}`);
  
  });

})};