
import { CommunityPermissions, CommunityEntityReference } from '../community/community';
import { MemberEntityReference } from '../community/member';
import { Visa } from './passport';

export class CommunityVisaImpl<root extends CommunityEntityReference> implements CommunityVisa {
  constructor(private root: root, private member: MemberEntityReference) {
  }  
  
  
  async determineIf(func:((permissions:CommunityPermissions) => boolean)) :  Promise<boolean> {
    //ensure that the member is a member of the community
    if(!this.member || this.member.community.id !== this.root.id) {
      return false;
    }
    const communityPermissions = this.member.role.permissions.communityPermissions;
    if(! communityPermissions) {return false;}

    return func(communityPermissions);
  }
}

export interface CommunityVisa extends Visa {
  determineIf(func:((permissions:CommunityPermissions) => boolean)) :  Promise<boolean> ;
}