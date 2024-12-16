import { CosmosDataSource } from "../../../data-sources/cosmos-data-source";
import { VendorUserData } from "../../../external-dependencies/datastore";
import { AppContext } from "../../../init/app-context-builder";

export interface VendorUserDataApi {
  getUserById(userId : string): Promise<VendorUserData>;
  getUserByExternalId(externalId : string): Promise<VendorUserData>;
  getUsers(): Promise<VendorUserData[]>;
}
export class VendorUserDataApiImpl
  extends CosmosDataSource<VendorUserData, AppContext>
  implements VendorUserDataApi {

  async getUserById(userId: string): Promise<VendorUserData> {
    return this.findOneById(userId);
  }

  async getUserByExternalId(externalId: string): Promise<VendorUserData> {
    return (await this.findByFields({ externalId: externalId }))[0];
  }

  async getUsers(): Promise<VendorUserData[]> {
    console.log(`getUsers:context${JSON.stringify(this.context.verifiedUser)}`);
    return this.model
      .find({})
      .exec();
  }

}
