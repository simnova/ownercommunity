import { NodeEventBus } from '../../domain-eventbus-impl-node/node-event-bus';
import { CommunityCreatedEvent } from '../events/community-created';
import { IBlobStorage } from '../services/IBlobStorage';

export default (blobStorage:IBlobStorage) => { NodeEventBus.register(CommunityCreatedEvent, async (payload) => {

  console.log(`CommunityCreatedEvent -> Create Blob Container - Called with Payload: ${JSON.stringify(payload)}`);

  await blobStorage.createContainer(payload.communityId);
  await blobStorage.createContainer(`${payload.communityId}-private`, false);
    
})};