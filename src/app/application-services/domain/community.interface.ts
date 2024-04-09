import { CommunityData } from "../../external-dependencies/datastore";
import { CommunityCreateInput, CommunityUpdateInput } from "../../external-dependencies/graphql-api";

export interface CommunityDomainApplicationService {
  communityCreate(input: CommunityCreateInput) : Promise<CommunityData>;
  communityUpdate(input: CommunityUpdateInput) : Promise<CommunityData>;
}


