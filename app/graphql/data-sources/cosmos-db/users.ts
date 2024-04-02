import { User } from '../../../infrastructure-services-impl/datastore/mongodb/models/user';
import { GraphqlContext } from '../../graphql-context';
import { CosmosDataSource } from './cosmos-data-source';

export class Users extends CosmosDataSource<User, GraphqlContext> {
  
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