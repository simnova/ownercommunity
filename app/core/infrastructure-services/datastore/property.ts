import { FindQueries } from "./_base";
import { PropertyDataStructure } from "../../application-services/datastore";

type PropType = PropertyDataStructure;
export interface PropertyDatastoreInfrastructureService extends FindQueries<PropType> {
  getAll(): Promise<PropType[]>;
  getPropertiesByCommunityIdUserId(communityId: string, userId: string): Promise<PropType[]>;
  getPropertyByIdWithCommunityOwner(propertyId: string): Promise<PropType>;
}