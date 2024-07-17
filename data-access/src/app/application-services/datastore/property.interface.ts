import { PropertyData } from "../../external-dependencies/datastore";

export interface PropertyDatastoreApplicationService {
  getPropertiesByCommunityId(communityId: string): Promise<PropertyData[]>;
  getPropertiesByIds(propertyIds: string[]): Promise<PropertyData[]>;
  getAllProperties(): Promise<PropertyData[]>;
  getPropertiesByOwnerId(ownerId: string): Promise<PropertyData[]>;
  getPropertyByIdWithCommunityOwner(propertyId: string): Promise<PropertyData>;
  getPropertyById(propertyId: string): Promise<PropertyData>;
}