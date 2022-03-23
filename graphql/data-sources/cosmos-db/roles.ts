import { MongoDataSource } from 'apollo-datasource-mongodb';
import { Role } from '../../../infrastructure/data-sources/cosmos-db/models/role';
import { Context } from '../../context';

export class Roles extends MongoDataSource<Role, Context> {
  
  async getRolesByCommunityId(communityId : string): Promise<Role[]> {
    return this.findByFields({community: communityId});
  }

}