import { FindQueries } from "./_base";
import { PropertyDataStructure } from "../../application-services/datastore";

export interface PropertyDatastoreInfrastructureService extends FindQueries<PropertyDataStructure> {
  getAll(): Promise<PropertyDataStructure[]>;
  getPropertiesForCurrentUserByCommunityId(communityId: string, userId: string): Promise<PropertyDataStructure[]>;
  getPropertyByIdWithCommunityOwner(propertyId: string): Promise<PropertyDataStructure>;
}