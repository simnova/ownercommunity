import { CustomDomainEventImpl } from '../shared/domain-event';

export interface CommunityDomainUpdatedProps {
  communityId: string;
  domain:string
  oldDomain?:string
}

export class CommunityDomainUpdatedEvent extends CustomDomainEventImpl<CommunityDomainUpdatedProps>  {
  constructor(aggregateRootId: string) {super(aggregateRootId);}
}