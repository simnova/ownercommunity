import { User } from '../../../infrastructure/data-sources/cosmos-db/models/user';
import { Context } from '../../context';
import { CosmosDataSource } from './cosmos-data-source';

export class Users extends CosmosDataSource<User, Context> {
  
  async getUser(userId : string): Promise<User> {
    return this.findOneById(userId);
  }

  async getByExternalId(externalId : string): Promise<User> {
    return (await this.findByFields({externalId: externalId}))[0];
  }

  async getUsers(): Promise<User[]> {
    console.log(`getUsers:context${JSON.stringify(this.context.verifiedUser)}`);
    return this.model
      .find({})
      .exec();
  }
  
}