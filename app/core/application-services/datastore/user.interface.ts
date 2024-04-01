import { UserDataStructure } from "../../../infrastructure-services-impl/datastore/data-structures/user";

export interface UserDatastoreApplicationService {
  getUserById(userId : string): Promise<UserDataStructure>;
  getByExternalId(externalId : string): Promise<UserDataStructure>;
  getUsers(): Promise<UserDataStructure[]>;
}