import { CommunityData } from "../../infrastructure-services/datastore";

export interface CommunityDomainApplicationService {
  communityCreate(input: CommunityCreateInput) : Promise<CommunityData>;
  communityUpdate(input: CommunityUpdateInput) : Promise<CommunityData>;
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

