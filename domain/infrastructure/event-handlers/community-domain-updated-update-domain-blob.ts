import { NodeEventBus } from '../core/events/node-event-bus';
import { BlobStorage } from '../../../infrastructure/services/blob-storage';
import { CommunityDomainUpdatedEvent } from '../../events/community-domain-updated';

export default () => { NodeEventBus.register(CommunityDomainUpdatedEvent, async (payload) => {

  console.log(`CommunityDomainUpdatedEvent -> Create Blob Container - Called with Payload: ${JSON.stringify(payload)}`);

  const blobStorage = new BlobStorage();
  try {
    await blobStorage.deleteBlob(payload.oldDomain, 'community-domains');
  } catch (error) {
    if(error.code !== 'BlobNotFound') {
      console.log(`CommunityDomainUpdatedEvent -> Create Blob Container - Error: ${error}`);
    }
  }
  
  await blobStorage.createTextBlob(payload.domain, 'community-domains',JSON.stringify({communityId: payload.communityId}));
  
})};