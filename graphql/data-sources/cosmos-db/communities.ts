import { msRestAzureVersion } from '@azure/ms-rest-azure-js';
import { MongoDataSource } from 'apollo-datasource-mongodb';
import { resourceLimits } from 'worker_threads';
import { Community, CommunityModel } from '../../../infrastructure/data-sources/cosmos-db/models/community';
import { UserModel } from '../../../infrastructure/data-sources/cosmos-db/models/user';
import { Context } from '../../context';

export class Communities extends MongoDataSource<Community, Context> {
  
  async getCommunityById(id: string): Promise<Community> {
    return this.findOneById(id);
  }
  async getCommunityByHandle(handle: string): Promise<Community> {
    return this.findByFields({handle: handle})?.[0];
  }
  async getCommunityByDomain(domain: string): Promise<Community> {
    return this.findByFields({domain: domain})?.[0];
  }
  async getCommunityByHeader(header: string): Promise<Community> {
    return this.collection.find({
      $or: [
        {_id: header},
        {handle: header},
        {domain: header},
        {whileLabelDomain: header}
      ]
      })?.[0];
  }
  async getCommunitiesForCurrentUser(): Promise<Community[]> {
    var externalId = this.context.verifiedUser.verifiedJWT.sub
    // starts from user (looking up by externalId), then find where they are a member, and then find the communities they are a member of
    var result = await UserModel.aggregate<Community>(
    [
      { 
          "$match" : { 
              "externalId" : externalId
          }
      }, 
      { 
          "$lookup" : { 
              "from" : "members", 
              "localField" : "_id", 
              "foreignField" : "accounts.user", 
              "as" : "m"
          }
      }, 
      { 
          "$match" : { 
              "m" : { 
                  "$ne" : []
              }
          }
      }, 
      { 
          "$lookup" : { 
              "from" : "communities", 
              "localField" : "m.community", 
              "foreignField" : "_id", 
              "as" : "c"
          }
      }, 
      { 
          "$unwind" : { 
              "path" : "$c", 
              "preserveNullAndEmptyArrays" : true
          }
      }, 
      { 
          "$replaceWith" : "$c"
      }
    ]
    ).exec();
    return result.map(r =>  CommunityModel.hydrate(r));
  }
  

}