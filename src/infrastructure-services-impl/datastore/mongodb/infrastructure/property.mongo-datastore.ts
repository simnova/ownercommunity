import { Property, PropertyModel } from '../models/property';
import { PropertyDatastoreInfrastructureService } from '../../../../app/infrastructure-services/datastore';
import { PropertyDataStructure } from '../../data-structures/property';
import { BaseMongoDatastore } from './_base.mongo-datastore';
import { Types } from 'mongoose';
import { MemberModel } from '../models/member';

export class MongoPropertyDatastore 
  extends BaseMongoDatastore<Property>
  implements PropertyDatastoreInfrastructureService {

  constructor(){
    super({ modelOrCollection: PropertyModel})
  }

  async getAll(): Promise<PropertyDataStructure[]> {
    return this.findByFields({});
  }

  async getPropertiesByCommunityIdUserId(communityId: string, userId: string): Promise<PropertyDataStructure[]> {
    let result = await MemberModel.aggregate<MongoPropertyDatastore>([
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

  async getPropertyByIdWithCommunityOwner(propertyId: string): Promise<PropertyDataStructure> {
    return this.model.findById(propertyId).populate(['community', 'owner']).exec();
  }

}