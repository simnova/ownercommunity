import { PropertyData, PropertyModel, MemberModel } from '../../external-dependencies/datastore';
import { Types } from 'mongoose';
import { CosmosDataSource } from './cosmos-data-source';
import { PropertyDataApi } from '../../application-services/datastore';
import { AppContext } from '../../init/app-context-builder';

export class PropertyDataApiImpl 
  extends CosmosDataSource<PropertyData, AppContext> 
  implements PropertyDataApi
{
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
    return this.findByFields({ community: this.context.communityId, owner: ownerId });
  }
  async getPropertyByIdWithCommunityOwner(propertyId: string): Promise<PropertyData> {
    return this.model.findById(propertyId).populate(['community', 'owner']).exec();
  }
  async getPropertyById(propertyId: string): Promise<PropertyData> {
    return this.findOneById(propertyId);
  }
}
