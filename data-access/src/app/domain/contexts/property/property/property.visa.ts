
import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';
import { MemberEntityReference } from '../../community/member/member';
import { StaffRolePropertyPermissionsSpec } from '../../community/roles/staff-role/staff-role-property-permissions';
import { EndUserRolePropertyPermissionsSpec } from '../../community/roles/end-user-role/property-permissions';
import { PropertyEntityReference } from './property';

export interface PropertyPermissionsSpec extends StaffRolePropertyPermissionsSpec, EndUserRolePropertyPermissionsSpec {}

export interface PropertyVisa extends Visa {
  determineIf(func:((permissions:PropertyPermissionsSpec) => boolean)) :  boolean ;
}

export class PropertyVisaImpl<root extends PropertyEntityReference> implements PropertyVisa {
  constructor(private root: root, private member: MemberEntityReference) {
  }

  determineIf(func: ((permissions: PropertyPermissionsSpec) => boolean)): boolean {
    //ensure that the member is a member of this community
    if (!this.member || this.member.community.id !== this.root.community.id) {
      console.log('member not part of community', this.member, this.root.community);
      return false;
    }
    const propertyPermissions = this.member.role.permissions.propertyPermissions;
    if (!propertyPermissions) {
      console.log('no property permissions', this.member.role.permissions);
      return false;
    }

    const updatedPermissions = Object.create(propertyPermissions, {
      isEditingOwnProperty: {
        value: (
          this.root.owner?.id && this.member.id === this.root.owner.id)
      } //overwrite isEditingOwnProperty based on user ownership
    }) as PropertyPermissionsSpec;

    console.log('updatedPermissions', updatedPermissions);
    return func(updatedPermissions);

  }
}

