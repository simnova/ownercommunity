import { UserData } from "../../infrastructure-services/datastore";

export interface UserDatastoreApplicationService {
  getUserById(userId : string): Promise<UserData>;
  getByExternalId(externalId : string): Promise<UserData>;
  getUsers(): Promise<UserData[]>;
}