
import { EndUserRoleCommunityPermissionsSpec } from "./entities/end-user-role-community-permissions";
import { MemberEntityReference } from '../../member/member';
import { EndUserRoleEntityReference } from './entities/end-user-role';
import { CommunityVisa } from "../../community.visa";

export class CommunityVisaImplForEndUserRole<root extends EndUserRoleEntityReference> implements CommunityVisa {
  constructor(private root: root, private member: MemberEntityReference) {}  
  
  determineIf(func:((permissions:EndUserRoleCommunityPermissionsSpec) => boolean)) :  boolean {
    //ensure that the member is a member of the community
    if(!this.member || this.member.community.id !== this.root.community.id) {
      console.log("End User Role Visa : member is not a member of this community", this.member, this.root);
      return false;
    }
    const communityPermissions = this.member.role.permissions.communityPermissions;
    if(!communityPermissions) {
      console.log("End User Role Visa : no community permissions");
      return false;
    }
    
    return func(communityPermissions as EndUserRoleCommunityPermissionsSpec);
  }
}

import { Visa } from "../../../../../framework/seedwork/passport-seedwork/visa";
import { StaffRoleCommunityPermissionsSpec } from "./roles/staff-role/staff-role-community-permissions";
import { EndUserRoleCommunityPermissionsSpec } from "./roles/end-user-role/end-user-role-community-permissions";

export interface CommunityPermissionsSpec extends StaffRoleCommunityPermissionsSpec, EndUserRoleCommunityPermissionsSpec {}

export interface CommunityVisa extends Visa {
  determineIf(func: ((permissions: CommunityPermissionsSpec) => boolean)): boolean;
}

