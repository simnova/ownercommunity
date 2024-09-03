
import { StaffRoleData, StaffUserData } from "../../external-dependencies/datastore";
import { CommunityVisa, CommunityPermissions } from './community.visa';

export class CommunityVisaImplForStaffRole<root extends StaffRoleData> implements CommunityVisa {
  constructor(private root: root, private user: StaffUserData) {}  
  
  determineIf(func:((permissions: CommunityPermissions) => boolean)) :  boolean {
    //ensure that the member is a member of the community
    // [TBD] - Temporarily commenting out this check as it is causing issues => need more discussion
    // if(!this.member || this.member.community.id !== this.root.community.id) {
    //   console.log("Role Visa : member is not a member of this community", this.member, this.root);
    //   return false;
    // }
    // const communityPermissions = this.user.role.permissions.communityPermissions;
    // if (!communityPermissions) {
    //   console.log("Staff Role Visa : no community permissions");
    //   return false;
    // }

    const communityPermissions = {
      canManageStaffRolesAndPermissions: true,
      canManageAllCommunities: true,
      canDeleteCommunities: true,
      canChangeCommunityOwner: true,
      canReIndexSearchCollections: true
    }

    return func(communityPermissions as CommunityPermissions);
  }
}
