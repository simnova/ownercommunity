import { UserData } from "../../external-dependencies/datastore";

export interface UserDatastoreApplicationService {
  getUserById(userId : string): Promise<UserData>;
  getUserByExternalId(externalId : string): Promise<UserData>;
  getUsers(): Promise<UserData[]>;
}