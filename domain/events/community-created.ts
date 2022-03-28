import { CustomDomainEventImpl } from '../shared/domain-event';

export interface CommunityCreatedProps {
  communityId: string;
}

export class CommunityCreatedEvent extends CustomDomainEventImpl<CommunityCreatedProps>  {
  constructor(aggregateRootId: string) {super(aggregateRootId);}
}