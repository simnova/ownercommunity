import { NodeEventBus } from '../../domain-impl-event-bus/node-event-bus';
import { CommunityCreatedEvent } from '../events/community-created';
import { IBlobStorage } from '../../infrastructure/services/blob-storage';

export default (blobStorage:IBlobStorage) => { NodeEventBus.register(CommunityCreatedEvent, async (payload) => {

  console.log(`CommunityCreatedEvent -> Create Blob Container - Called with Payload: ${JSON.stringify(payload)}`);

  await blobStorage.createContainer(payload.communityId);
  await blobStorage.createContainer(`${payload.communityId}-private`, false);
    
})};