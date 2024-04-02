import { FindQueries } from "./_base";
import { CommunityDataStructure } from "../../application-services/datastore";

type PropType = CommunityDataStructure;
export interface CommunityDatastoreInfrastructureService extends FindQueries<PropType> {
  getCommunityByHeader(header: string): Promise<PropType>;
  isUserAdmin(communityId: string, externalId: string): Promise<boolean>;
  getCommunitiesForUser(externalId: string): Promise<PropType[]>;
}
