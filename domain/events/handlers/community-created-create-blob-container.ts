import { CommunityCreatedEvent } from '../types/community-created';
import { IBlobStorage } from '../../services/blob-storage/interfaces';
import { EventBusInstance } from '../event-bus';

export default (
  blobStorage:IBlobStorage,
) => { EventBusInstance.register(CommunityCreatedEvent, async (payload) => {

  console.log(`CommunityCreatedEvent -> Create Blob Container - Called with Payload: ${JSON.stringify(payload)}`);

  await blobStorage.createContainer(payload.communityId);
  await blobStorage.createContainer(`${payload.communityId}-private`, false);
    
})};