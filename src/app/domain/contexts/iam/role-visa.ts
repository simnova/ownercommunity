
import { CommunityPermissions } from "../community/community-permissions.spec";
import { MemberEntityReference } from '../community/member';
import { RoleEntityReference } from '../community/role';
import { CommunityVisa } from './community-visa';

export class RoleVisaImpl<root extends RoleEntityReference> implements CommunityVisa {
  constructor(private root: root, private member: MemberEntityReference) {}  
  
  determineIf(func:((permissions:CommunityPermissions) => boolean)) :  boolean {
    //ensure that the member is a member of the community
    if(!this.member || this.member.community.id !== this.root.community.id) {
      console.log("Role Visa : member is not a member of this community", this.member, this.root);
      return false;
    }
    const communityPermissions = this.member.role.permissions.communityPermissions;
    if(!communityPermissions) {
      console.log("Role Visa : no community permissions");
      return false;
    }
    
    return func(communityPermissions as CommunityPermissions);
  }
}