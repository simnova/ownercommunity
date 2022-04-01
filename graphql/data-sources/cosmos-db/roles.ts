import { MongoDataSource } from 'apollo-datasource-mongodb';
import { Role } from '../../../infrastructure/data-sources/cosmos-db/models/role';
import { Context } from '../../context';

export class Roles extends MongoDataSource<Role, Context> {
  
  async getRoleById(id : string): Promise<Role> {
    return (await this.findByFields({id: id, community: this.context.community}))?.[0];
  }

  async getRoles(): Promise<Role[]> {
    return this.findByFields({community: this.context.community});
  }

}