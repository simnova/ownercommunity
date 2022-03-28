import { msRestAzureVersion } from '@azure/ms-rest-azure-js';
import { MongoDataSource } from 'apollo-datasource-mongodb';
import { resourceLimits } from 'worker_threads';
import { Community } from '../../../infrastructure/data-sources/cosmos-db/models/community';
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
    var externalId = this.context.verifiedUser.verifiedJWT.sid
    var result = await this.collection.aggregate(
      [
        { 
          "$project" : { 
              "_id" : 0, 
              "community" : "$$ROOT"
          }
      }, 
        { 
            "$lookup" : { 
                "localField" : "community.id", 
                "from" : "members", 
                "foreignField" : "id", 
                "as" : "member"
            }
        }, 
        { 
            "$unwind" : { 
                "path" : "$member", 
                "preserveNullAndEmptyArrays" : false
            }
        }, 
        { 
            "$lookup" : { 
                "localField" : "member.accounts.user", 
                "from" : "users", 
                "foreignField" : "id", 
                "as" : "user"
            }
        }, 
        { 
            "$unwind" : { 
                "path" : "$user", 
                "preserveNullAndEmptyArrays" : false
            }
        }, 
        { 
            "$match" : { 
                "user.externalId" : externalId
            }
        }, 

    ],
    { 
        "allowDiskUse" : true
    }
    ).toArray();
    
    return result as Community[];
  }
  

}