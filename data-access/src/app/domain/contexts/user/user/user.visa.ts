import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';
import { UserEntityReference } from './user';

export interface UserPermissionsSpec {
  isEditingOwnAccount: boolean;
}

export interface UserVisa extends Visa{
  determineIf(func:((permissions:UserPermissionsSpec) => boolean)) :  boolean ;
}

export class UserVisaImpl<root extends UserEntityReference> implements UserVisa {
  constructor(private root: root, private user: UserEntityReference) {
  }

  determineIf(func: ((permissions: UserPermissionsSpec) => boolean)): boolean {
    const isEditingOwnAccount = this.user.id === this.root.id;
    const result: Partial<UserPermissionsSpec> = {
      isEditingOwnAccount: isEditingOwnAccount
    };
    return func(result as UserPermissionsSpec);
  }
}

