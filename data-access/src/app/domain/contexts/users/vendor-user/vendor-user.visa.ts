import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';
import { VendorUserEntityReference } from './vendor-user';

export interface VendorUserPermissionsSpec {
  isEditingOwnAccount: boolean;
}

export interface VendorUserVisa extends Visa{
  determineIf(func:((permissions:VendorUserPermissionsSpec) => boolean)) :  boolean ;
}

export class VendorUserVisaImpl<root extends VendorUserEntityReference> implements VendorUserVisa {
  constructor(private root: root, private user: VendorUserEntityReference) {
  }

  determineIf(func: ((permissions: VendorUserPermissionsSpec) => boolean)): boolean {
    const isEditingOwnAccount = this.user.id === this.root.id;
    const result: Partial<VendorUserPermissionsSpec> = {
      isEditingOwnAccount: isEditingOwnAccount
    };
    return func(result as VendorUserPermissionsSpec);
  }
}

