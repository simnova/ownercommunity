import { CosmosDataSource } from "../../data-sources/cosmos-data-source";
import { UserData } from "../../external-dependencies/datastore";
import { AppContext } from "../../init/app-context-builder";

export interface UserDataApi {
  getUserById(userId : string): Promise<UserData>;
  getUserByExternalId(externalId : string): Promise<UserData>;
  getUsers(): Promise<UserData[]>;
}

export class UserDataApiImpl 
  extends CosmosDataSource<UserData, AppContext> 
  implements UserDataApi
{
  
  async getUserById(userId : string): Promise<UserData> {
    return this.findOneById(userId);
  }

  async getUserByExternalId(externalId : string): Promise<UserData> {
    return (await this.findByFields({externalId: externalId}))[0];
  }

  async getUsers(): Promise<UserData[]> {
    console.log(`getUsers:context${JSON.stringify(this.context.verifiedUser)}`);
    return this.model
      .find({})
      .exec();
  }
  
}