import { CosmosDataSource } from "../../../data-sources/cosmos-data-source";
import { VendorUserData } from "../../../external-dependencies/datastore";
import { AppContext } from "../../../init/app-context-builder";
import { FindQuery } from "../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base";

export interface VendorUserDataApi {
  getUserById(userId : string): Promise<VendorUserData>;
  getUserByExternalId(externalId : string): Promise<VendorUserData>;
  getUsers(findQuery?: FindQuery): Promise<VendorUserData[]>;
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

  async getUsers(findQuery?: FindQuery): Promise<VendorUserData[]> {
    console.log(`getUsers:context${JSON.stringify(this.context.verifiedUser)}`);
    return this.model
    .find(findQuery && typeof findQuery === 'object' ? findQuery : {}) // Ensures it's an object before using it
    .exec();
  }
  
}
