import { CustomDomainEventImpl } from '../../../domain-seedwork/domain-event';

export interface CommunityCreatedProps {
  communityId: string;
}

export class CommunityCreatedEvent extends CustomDomainEventImpl<CommunityCreatedProps> {}
