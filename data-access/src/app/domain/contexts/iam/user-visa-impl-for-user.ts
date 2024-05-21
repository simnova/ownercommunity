import { UserEntityReference, UserPermissions } from '../user/user';
import { UserVisa } from './user-visa';


export class UserVisaImplForUser<root extends UserEntityReference> implements UserVisa {
  constructor(private root: root, private user: UserEntityReference) {
  }

  determineIf(func: ((permissions: UserPermissions) => boolean)): boolean {
    const userIsEditingTheirAccount = this.user.id === this.root.id;
    const result: Partial<UserPermissions> = {
      canManageUser: userIsEditingTheirAccount
    };
    return func(result as UserPermissions);
  }
}
