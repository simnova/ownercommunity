
import { CommunityPermissions, CommunityEntityReference } from '../community/community';
import { MemberEntityReference } from '../community/member';
import { Visa, SystemUserId } from './passport';

export class MemberVisaImpl<root extends MemberEntityReference> implements CommunityVisa {
  constructor(private root: root, private member: MemberEntityReference) {
  }  
  
  determineIf(func:((permissions:CommunityPermissions) => boolean)) :  boolean {
    //ensure that the member is a member of this community
    if(!this.member || this.member.community.id !== this.root.community.id) {
      return false;
    }

    const communityPermissions = this.member.role.permissions.communityPermissions;
    if(! communityPermissions) {return false;}

    var updatedPermissions = { 
        ...communityPermissions, 
        ...{isEditingOwnMemberAccount : (this.member.id === this.root.id)}
      } as CommunityPermissions;
    return func(updatedPermissions);
  }
}

export interface CommunityVisa extends Visa {
  determineIf(func:((permissions:CommunityPermissions) => boolean)) :  boolean ;
}