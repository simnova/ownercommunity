import { CommunityEntityReference } from './community';
import { CommunityPermissionsSpec } from "../role/community-permissions";
import { MemberEntityReference } from '../member/member';
import { CommunityVisa } from "../community.visa";


export class CommunityVisaImplForCommunity<root extends CommunityEntityReference> implements CommunityVisa {
  constructor(private root: root, private member: MemberEntityReference) {
  }


  determineIf(func: ((permissions: CommunityPermissionsSpec) => boolean)): boolean {
    //ensure that the member is a member of this community
    if (!this.member || this.member.community.id !== this.root.id) {
      console.log("member is not a member of this community");
      return false;
    }
    const communityPermissions = this.member.role.permissions.communityPermissions;
    if (!communityPermissions) {
      console.log("no community permissions");
      return false;
    }
    console.log("communityPermissions", communityPermissions);
    return func(communityPermissions);
  }
}
