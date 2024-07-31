import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';
import { EndUserEntityReference } from './end-user';

export interface EndUserPermissionsSpec {
  isEditingOwnAccount: boolean;
}

export interface EndUserVisa extends Visa{
  determineIf(func:((permissions:EndUserPermissionsSpec) => boolean)) :  boolean ;
}

export class UserVisaImpl<root extends EndUserEntityReference> implements EndUserVisa {
  constructor(private root: root, private user: EndUserEntityReference) {
  }

  determineIf(func: ((permissions: EndUserPermissionsSpec) => boolean)): boolean {
    const isEditingOwnAccount = this.user.id === this.root.id;
    const result: Partial<EndUserPermissionsSpec> = {
      isEditingOwnAccount: isEditingOwnAccount
    };
    return func(result as EndUserPermissionsSpec);
  }
}

