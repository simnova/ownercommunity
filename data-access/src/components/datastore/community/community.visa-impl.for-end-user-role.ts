
import { MemberData, EndUserRoleData, StaffUserData, EndUserData } from "../../external-dependencies/datastore";
import { CommunityPermissions, CommunityVisa } from './community.visa';

export class CommunityVisaImplForEndUserRole<root extends EndUserRoleData> implements CommunityVisa {
  constructor(private root: root, private member: MemberData, private user: StaffUserData|EndUserData) {}  
  
  determineIf(func:((permissions: CommunityPermissions) => boolean)) :  boolean {
    //ensure that the member is a member of the community
    // [TBD] - Temporarily commenting out this check as it is causing issues => need more discussion
    // if(!this.member || this.member.community.id !== this.root.community.id) {
    //   console.log("Role Visa : member is not a member of this community", this.member, this.root);
    //   return false;
    // }
    let communityPermissions: CommunityPermissions;
    if (this.member && this.member !== null) {
      communityPermissions = this.member.role.permissions.communityPermissions;
    } else if (this.user && this.user.userType === 'internal-staff' ) {
      const user = this.user as StaffUserData;
      communityPermissions = user.role.permissions.communityPermissions;
    }
    if (!communityPermissions) {
      console.log("End User Role Visa : no community permissions");
      return false;
    }

    return func(communityPermissions as CommunityPermissions);
  }
}
