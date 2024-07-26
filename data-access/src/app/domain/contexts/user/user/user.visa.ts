import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';
import { UserEntityReference } from './user';

export interface UserPermissions {
  canManageUser: boolean;
}

export interface UserVisa extends Visa{
  determineIf(func:((permissions:UserPermissions) => boolean)) :  boolean ;
}

export class UserVisaImpl<root extends UserEntityReference> implements UserVisa {
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

