import { UserData } from "../../external-dependencies/datastore";
import { UserUpdateInput } from "../../external-dependencies/graphql-api";

export interface UserDomainApplicationService {
  addUser() : Promise<UserData>;
  updateUser(user: UserUpdateInput) : Promise<UserData>; 
}