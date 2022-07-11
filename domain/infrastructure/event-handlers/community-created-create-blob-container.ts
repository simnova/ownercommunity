import { NodeEventBus } from '../core/events/node-event-bus';
import { CommunityCreatedEvent } from '../../events/community-created';
import { BlobStorage } from '../../../infrastructure/services/blob-storage';

export default () => { NodeEventBus.register(CommunityCreatedEvent, async (payload) => {

  console.log(`CommunityCreatedEvent -> Create Blob Container - Called with Payload: ${JSON.stringify(payload)}`);

  const blobStorage = new BlobStorage();
  await blobStorage.createContainer(payload.communityId);
  
  
})};