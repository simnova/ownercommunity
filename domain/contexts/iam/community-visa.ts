
import { CommunityEntityReference } from '../community/community';
import { CommunityPermissions } from "../community/community-permissions.spec";
import { MemberEntityReference } from '../community/member';
import { Visa } from './passport';

export class CommunityVisaImpl<root extends CommunityEntityReference> implements CommunityVisa {
  constructor(private root: root, private member: MemberEntityReference) {
  }  
  
  
  determineIf(func:((permissions:CommunityPermissions) => boolean)) :  boolean {
    //ensure that the member is a member of this community
    if(!this.member || this.member.community.id !== this.root.id){ 
      console.log("member is not a member of this community");
      return false;
    }
    const communityPermissions = this.member.role.permissions.communityPermissions;
    if(!communityPermissions) { 
      console.log("no community permissions");
      return false;
    }
    console.log("communityPermissions",communityPermissions);
    return func(communityPermissions);
  }
}

export interface CommunityVisa extends Visa {
  determineIf(func:((permissions:CommunityPermissions) => boolean)) :  boolean ;
}