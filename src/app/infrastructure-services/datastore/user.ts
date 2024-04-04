import { FindQueries } from "./_base";
import { User as UserData} from "../../../infrastructure-services-impl/datastore/mongodb/models/user";

export {UserData};
export interface UserDatastoreInfrastructureService extends FindQueries<UserData> {
  getAll(): Promise<UserData[]>;
}