import { Types } from "mongoose";
import { CosmosDataSource } from "../../data-sources/cosmos-data-source";
import { MemberModel, PropertyData, PropertyModel } from "../../external-dependencies/datastore";
import { AppContext } from "../../init/app-context-builder";

export interface PropertyDataApi {
  getPropertiesByCommunityId(communityId: string): Promise<PropertyData[]>;
  getPropertiesByIds(propertyIds: string[]): Promise<PropertyData[]>;
  getAllProperties(): Promise<PropertyData[]>;
  getPropertiesForCurrentUserByCommunityId(communityId: string, userId: string): Promise<PropertyData[]>;
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

  async getPropertiesForCurrentUserByCommunityId(communityId: string, userId: string): Promise<PropertyData[]> {
    let result = await MemberModel.aggregate<PropertyData>([
      {
        $match: {
          community: new Types.ObjectId(communityId),
          'accounts.user': new Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'properties',
          localField: '_id',
          foreignField: 'owner',
          as: 'p',
        },
      },
      {
        $unwind: {
          path: '$p',
        },
      },
      {
        $replaceWith: '$p',
      },
    ]).exec();
    return result.map((r) => PropertyModel.hydrate(r));
  }
  async getPropertyByIdWithCommunityOwner(propertyId: string): Promise<PropertyData> {
    return this.model.findById(propertyId).populate(['community', 'owner']).exec();
  }
  async getPropertyById(propertyId: string): Promise<PropertyData> {
    return this.findOneById(propertyId);
  }
}
