import { CosmosDataSource } from "../../data-sources/cosmos-data-source";
import { PropertyData, PropertyModel } from "../../external-dependencies/datastore";
import { AppContext } from "../../../../framework/app/app-context-builder";

export interface PropertyDataApi {
  getPropertiesByCommunityId(communityId: string): Promise<PropertyData[]>;
  getPropertiesByIds(propertyIds: string[]): Promise<PropertyData[]>;
  getAllProperties(): Promise<PropertyData[]>;
  getPropertiesByOwnerId(ownerId: string): Promise<PropertyData[]>;
  getPropertyByIdWithCommunityOwner(propertyId: string): Promise<PropertyData>;
  getPropertyById(propertyId: string): Promise<PropertyData>;
}

export class PropertyDataApiImpl
  extends CosmosDataSource<PropertyData, AppContext>
  implements PropertyDataApi {
  async getPropertiesByCommunityId(communityId: string): Promise<PropertyData[]> {
    return this.findByFields({ community: communityId });
  }

  async getPropertiesByIds(propertyIds: string[]): Promise<PropertyData[]> {
    return this.findManyByIds(propertyIds);
  }

  async getAllProperties(): Promise<PropertyData[]> {
    return PropertyModel.find().exec();
  }

  async getPropertiesByOwnerId(ownerId: string): Promise<PropertyData[]> {
    return this.findByFields({ community: this.context.community?.id, owner: ownerId });
  }
  async getPropertyByIdWithCommunityOwner(propertyId: string): Promise<PropertyData> {
    return this.model.findById(propertyId).populate(['community', 'owner']).exec();
  }
  async getPropertyById(propertyId: string): Promise<PropertyData> {
    return this.findOneById(propertyId);
  }
}
