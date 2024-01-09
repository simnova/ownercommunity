import { CustomDomainEventImpl } from '../shared/domain-event';

export interface CommunityWhiteLabelDomainUpdatedProps {
  communityId: string;
  whiteLabelDomain: string;
  oldWhiteLabelDomain?: string;
}

export class CommunityWhiteLabelDomainUpdatedEvent extends CustomDomainEventImpl<CommunityWhiteLabelDomainUpdatedProps> {}
