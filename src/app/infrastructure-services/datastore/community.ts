import { FindQueries } from "./_base";
import { Community as CommunityData} from "../../../infrastructure-services-impl/datastore/mongodb/models/community";

export {CommunityData};

export interface CommunityDatastoreInfrastructureService extends FindQueries<CommunityData> {
  getCommunityByHeader(header: string): Promise<CommunityData>;
  isUserAdmin(communityId: string, externalId: string): Promise<boolean>;
  getCommunitiesForUser(externalId: string): Promise<CommunityData[]>;
}
