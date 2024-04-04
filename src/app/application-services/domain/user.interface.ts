import { UserData } from "../../infrastructure-services/datastore";

export interface UserDomainApplicationService {
  addUser() : Promise<UserData>;
  updateUser(user: UserUpdateInput) : Promise<UserData>; 
}

export type UserUpdateInput = {
  email?: string;
  firstName?: string;
  id: string;
  lastName?: string;
};
