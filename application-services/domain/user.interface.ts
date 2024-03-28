import { User, UserProps } from '../../domain/contexts/user/user';

export interface UserDomainApplicationService {
  addUser() : Promise<User<UserProps>>;
  updateUser(user: UserUpdateInput) : Promise<User<UserProps>>; 
}

export type UserUpdateInput = {
  email?: string;
  firstName?: string;
  id: string;
  lastName?: string;
};
