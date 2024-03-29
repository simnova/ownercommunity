import { Community, CommunityProps } from '../../domain/contexts/community/community';

export interface CommunityDomainApplicationService {
  communityCreate(input: CommunityCreateInput) : Promise<Community<CommunityProps>>;
  communityUpdate(input: CommunityUpdateInput) : Promise<Community<CommunityProps>>;
}

export type CommunityCreateInput = {
  communityName: string;
};

export type CommunityUpdateInput = {
  id: string;
  communityName?: string;
  domain?: string;
  handle?: string;
  whiteLabelDomain?: string;
};

