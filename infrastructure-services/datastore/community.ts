import { FindQueries } from "./_base";
import { CommunityDataStructure } from "../../application-services/datastore";

export interface CommunityDatastoreInfrastructureService extends FindQueries<CommunityDataStructure> {
  getCommunityByHeader(header: string): Promise<CommunityDataStructure>;
  isUserAdmin(communityId: string, externalId: string): Promise<boolean>;
  getCommunitiesForUser(externalId: string): Promise<CommunityDataStructure[]>;
}
