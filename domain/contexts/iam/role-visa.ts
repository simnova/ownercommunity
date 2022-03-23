
import { CommunityPermissions } from '../community/community';
import { MemberEntityReference } from '../community/member';
import { RoleEntityReference } from '../community/role';
import { CommunityVisa } from './community-visa';

export class RoleVisaImpl<root extends RoleEntityReference> implements CommunityVisa {
  constructor(private root: root, private member: MemberEntityReference) {
  }  
  
  async determineIf(func:((permissions:CommunityPermissions) => boolean)) :  Promise<boolean> {
    //ensure that the member is a member of the community
    if(!this.member || this.member.community.id !== this.root.community.id) {
      return false;
    }
    const communityPermissions = this.member.role.permissions.communityPermissions;
    if(! communityPermissions) {return false;}

    return func(communityPermissions);
  }
}

