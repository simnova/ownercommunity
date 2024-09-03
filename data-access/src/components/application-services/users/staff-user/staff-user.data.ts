import { CosmosDataSource } from "../../../data-sources/cosmos-data-source";
import { StaffUserData } from "../../../external-dependencies/datastore";
import { AppContext } from "../../../../../framework/app/app-context-builder";

export interface StaffUserDataApi {
  getUserById(userId : string): Promise<StaffUserData>;
  getUserByExternalId(externalId : string): Promise<StaffUserData>;
  getUsers(): Promise<StaffUserData[]>;
}
export class StaffUserDataApiImpl
  extends CosmosDataSource<StaffUserData, AppContext>
  implements StaffUserDataApi {

  async getUserById(userId: string): Promise<StaffUserData> {
    return this.findOneById(userId);
  }

  async getUserByExternalId(externalId: string): Promise<StaffUserData> {
    return this.model.findOne({ externalId: externalId }).populate('role').exec();
  }

  async getUsers(): Promise<StaffUserData[]> {
    console.log(`getUsers:context${JSON.stringify(this.context.verifiedUser)}`);
    return this.model
      .find({})
      .exec();
  }

}
