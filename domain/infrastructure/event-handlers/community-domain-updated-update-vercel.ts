import { NodeEventBus } from '../core/events/node-event-bus';
import { Vercel } from '../../../infrastructure/services/vercel';
import { CommunityDomainUpdatedEvent } from '../../events/community-domain-updated';

export default () => { NodeEventBus.register(CommunityDomainUpdatedEvent, async (payload) => {

  console.log(`CommunityDomainUpdatedEvent -> Update Vercel - Called with Payload: ${JSON.stringify(payload)}`);

  const vercel = new Vercel();
  try {
    if(payload.oldDomain && payload.oldDomain.trim.length > 0){
      await vercel.removeDomainFromProject(payload.oldDomain);
    }
  } catch (error) {
    console.log(`CommunityDomainUpdatedEvent -> Remove Old Domain from Vercel - Error: ${error}`);
  }

  try {
    if(payload.domain && payload.domain.trim.length > 0){
      await vercel.addDomainToProject(payload.domain);
    }
  } catch (error) {
    console.log(`CommunityDomainUpdatedEvent -> Add New Domain to Vercel - Error: ${error}`);
  }
  
  
})};