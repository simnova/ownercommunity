import { NodeEventBus } from '../core/events/node-event-bus';
import { BlobStorage } from '../../../infrastructure/services/blob-storage';
import { CommunityWhiteLabelDomainUpdatedEvent } from '../../events/community-white-label-domain-updated';

export default () => { NodeEventBus.register(CommunityWhiteLabelDomainUpdatedEvent, async (payload) => {

  console.log(`CommunityWhiteLabelDomainUpdatedEvent -> Create Blob Container - Called with Payload: ${JSON.stringify(payload)}`);

  const blobStorage = new BlobStorage();
  try {
    await blobStorage.deleteBlob(`${payload.oldWhiteLabelDomain}.owner.community`, 'community-domains');
  } catch (error) {
    if(error.code !== 'BlobNotFound') {
      console.log(`CommunityWhiteLabelDomainUpdatedEvent -> Create Blob Container - Error: ${error}`);
    }
  }
  
  await blobStorage.createTextBlob(`${payload.whiteLabelDomain}.owner.community`, 'community-domains',JSON.stringify({communityId: payload.communityId}));
  
})};