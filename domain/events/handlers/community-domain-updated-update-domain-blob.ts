import { IBlobStorage } from '../../infrastructure/blob-storage/interfaces';
import { EventBusInstance } from '../event-bus';
import { CommunityDomainUpdatedEvent } from '../types/community-domain-updated';

export default (
  blobStorage:IBlobStorage,
) => { EventBusInstance.register(CommunityDomainUpdatedEvent, async (payload) => {

  console.log(`CommunityDomainUpdatedEvent -> Create Blob Container - Called with Payload: ${JSON.stringify(payload)}`);

  try {
    await blobStorage.deleteBlob(payload.oldDomain, 'community-domains');
  } catch (error) {
    if(error.code !== 'BlobNotFound') {
      console.log(`CommunityDomainUpdatedEvent -> Create Blob Container - Error: ${error}`);
    }
  }
  
  await blobStorage.createTextBlob(payload.domain, 'community-domains',JSON.stringify({communityId: payload.communityId}));
  
})};