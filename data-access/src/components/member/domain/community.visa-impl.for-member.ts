
import { MemberEntityReference } from './member';
import { CommunityVisa, CommunityPermissionsSpec } from "../community.visa";

export class CommunityVisaImplForMember<root extends MemberEntityReference> implements CommunityVisa {
  constructor(private root: root, private member: MemberEntityReference) {}  
  
  determineIf(func:((permissions:CommunityPermissionsSpec) => boolean)) :  boolean {
    //ensure that the member is a member of this community
    if(!this.member || this.member.community.id !== this.root.community.id) {
      console.log("Member Visa: member is not a member of this community", this.member, this.root);
      return false;
    }

    const communityPermissions = this.member.role.permissions.communityPermissions;
    if(!communityPermissions) {
      console.log("Member Visa: no community permissions");
      return false;}

    const updatedPermissions = Object.create(communityPermissions, {
       isEditingOwnMemberAccount : {value: (this.member.id === this.root.id)} // override isEditingOwnMemberAccount
    }) as CommunityPermissionsSpec;
      
    return func(updatedPermissions);
  }
}

import { Visa } from "../../../../../framework/seedwork/passport-seedwork/visa";
import { StaffRoleCommunityPermissionsSpec } from "./roles/staff-role/staff-role-community-permissions";
import { EndUserRoleCommunityPermissionsSpec } from "./roles/end-user-role/end-user-role-community-permissions";

export interface CommunityPermissionsSpec extends StaffRoleCommunityPermissionsSpec, EndUserRoleCommunityPermissionsSpec {}

export interface CommunityVisa extends Visa {
  determineIf(func: ((permissions: CommunityPermissionsSpec) => boolean)): boolean;
}

