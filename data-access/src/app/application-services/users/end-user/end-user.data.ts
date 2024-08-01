import { CosmosDataSource } from "../../../data-sources/cosmos-data-source";
import { EndUserData } from "../../../external-dependencies/datastore";
import { AppContext } from "../../../init/app-context-builder";

export interface EndUserDataApi {
  getUserById(userId : string): Promise<EndUserData>;
  getUserByExternalId(externalId : string): Promise<EndUserData>;
  getUsers(): Promise<EndUserData[]>;
}
export class EndUserDataApiImpl
  extends CosmosDataSource<EndUserData, AppContext>
  implements EndUserDataApi {

  async getUserById(userId: string): Promise<EndUserData> {
    return this.findOneById(userId);
  }

  async getUserByExternalId(externalId: string): Promise<EndUserData> {
    return (await this.findByFields({ externalId: externalId }))[0];
  }

  async getUsers(): Promise<EndUserData[]> {
    console.log(`getUsers:context${JSON.stringify(this.context.verifiedUser)}`);
    return this.model
      .find({})
      .exec();
  }

}
