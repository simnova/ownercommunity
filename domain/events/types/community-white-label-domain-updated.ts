import { CustomDomainEventImpl } from '../../../domain-seedwork/domain-event';

export interface CommunityWhiteLabelDomainUpdatedProps {
  communityId: string;
  whiteLabelDomain: string;
  oldWhiteLabelDomain?: string;
}

export class CommunityWhiteLabelDomainUpdatedEvent extends CustomDomainEventImpl<CommunityWhiteLabelDomainUpdatedProps> {}
