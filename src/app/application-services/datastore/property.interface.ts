import { PropertyData } from "../../infrastructure-services/datastore";

export interface PropertyDatastoreApplicationService {
  getPropertiesByCommunityId(communityId: string): Promise<PropertyData[]>;
  getPropertiesByIds(propertyIds: string[]): Promise<PropertyData[]>;
  getAllProperties(): Promise<PropertyData[]>;
  getPropertiesForCurrentUserByCommunityId(communityId: string, userId: string): Promise<PropertyData[]>;
  getPropertyByIdWithCommunityOwner(propertyId: string): Promise<PropertyData>;
  getPropertyById(propertyId: string): Promise<PropertyData>;
}