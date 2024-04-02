import { MemberModel } from '../../../infrastructure-services-impl/datastore/mongodb/models/member';
import { Property, PropertyModel } from '../../../infrastructure-services-impl/datastore/mongodb/models/property';
import { GraphqlContext } from '../../graphql-context';
import { Types } from 'mongoose';
import { CosmosDataSource } from './cosmos-data-source';

export class Properties extends CosmosDataSource<Property, GraphqlContext> {
  async getPropertiesByCommunityId(communityId: string): Promise<Property[]> {
    return this.findByFields({ community: communityId });
  }

  async getPropertiesByIds(propertyIds: string[]): Promise<Property[]> {
    return this.findManyByIds(propertyIds);
  }

  async getAllProperties(): Promise<Property[]> {
    return PropertyModel.find().exec();
  }

  async getPropertiesForCurrentUserByCommunityId(communityId: string, userId: string): Promise<Property[]> {
    let result = await MemberModel.aggregate<Properties>([
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
}
