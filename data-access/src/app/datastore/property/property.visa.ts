
import { Visa } from '../../../../seedwork/passport-seedwork/visa';
import { MemberData, PropertyData, EndUserRolePropertyPermissions, StaffRolePropertyPermissions } from '../../external-dependencies/datastore';

export type PropertyPermissions = StaffRolePropertyPermissions | EndUserRolePropertyPermissions;

export interface PropertyVisa extends Visa {
  determineIf(func:((permissions: PropertyPermissions) => boolean)) : boolean;
}

export class PropertyVisaImplForProperty<root extends PropertyData> implements PropertyVisa {
  constructor(private root: root, private member: MemberData) { }

  determineIf(func: ((permissions: PropertyPermissions) => boolean)): boolean {
    const propertyPermissions = this.member.role.permissions.propertyPermissions;
    if (!propertyPermissions) {
      console.log("Property Visa : no property permissions");
      return false;
    }

    return func(propertyPermissions as PropertyPermissions);
  }
}
