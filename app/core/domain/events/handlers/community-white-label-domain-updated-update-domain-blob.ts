import { BlobStorageDomain } from '../../infrastructure/blob-storage/interfaces';
import { EventBusInstance } from '../event-bus';
import { CommunityWhiteLabelDomainUpdatedEvent } from '../types/community-white-label-domain-updated';

export default (
  blobStorage:BlobStorageDomain
) => { EventBusInstance.register(CommunityWhiteLabelDomainUpdatedEvent, async (payload) => {

  console.log(`CommunityWhiteLabelDomainUpdatedEvent -> Create Blob Container - Called with Payload: ${JSON.stringify(payload)}`);

  try {
    await blobStorage.deleteBlob(`${payload.oldWhiteLabelDomain}.owner.community`, 'community-domains');
  } catch (error) {
    if(error.code !== 'BlobNotFound') {
      console.log(`CommunityWhiteLabelDomainUpdatedEvent -> Create Blob Container - Error: ${error}`);
    }
  }
  
  await blobStorage.createTextBlob(`${payload.whiteLabelDomain}.owner.community`, 'community-domains',JSON.stringify({communityId: payload.communityId}));
  
})};