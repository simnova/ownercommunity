import { CustomDomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface CommunityDomainUpdatedProps {
  communityId: string;
  domain: string;
  oldDomain?: string;
}

export class CommunityDomainUpdatedEvent extends CustomDomainEventImpl<CommunityDomainUpdatedProps> {}
