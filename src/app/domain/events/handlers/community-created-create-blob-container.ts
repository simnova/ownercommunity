import { CommunityCreatedEvent } from '../types/community-created';
import { BlobStorageDomain } from '../../infrastructure/blob-storage/interfaces';
import { EventBusInstance } from '../event-bus';

export default (
  blobStorage:BlobStorageDomain,
) => { EventBusInstance.register(CommunityCreatedEvent, async (payload) => {

  console.log(`CommunityCreatedEvent -> Create Blob Container - Called with Payload: ${JSON.stringify(payload)}`);

  await blobStorage.createContainer(payload.communityId);
  await blobStorage.createContainer(`${payload.communityId}-private`, false);
    
})};