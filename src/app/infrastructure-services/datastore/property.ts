import { FindQueries } from "./_base";
import { Property as PropertyData } from "../../../infrastructure-services-impl/datastore/mongodb/models/property";

export {PropertyData};
export interface PropertyDatastoreInfrastructureService extends FindQueries<PropertyData> {
  getAll(): Promise<PropertyData[]>;
  getPropertiesByCommunityIdUserId(communityId: string, userId: string): Promise<PropertyData[]>;
  getPropertyByIdWithCommunityOwner(propertyId: string): Promise<PropertyData>;
}