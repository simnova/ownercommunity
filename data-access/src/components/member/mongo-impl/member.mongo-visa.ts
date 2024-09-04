
import { Visa } from '../../../../framework/seedwork/passport-seedwork/visa';
import { StaffRoleCommunityPermissions, EndUserRoleCommunityPermissions } from '../../external-dependencies/datastore';

export type CommunityPermissions = StaffRoleCommunityPermissions & EndUserRoleCommunityPermissions;

export interface CommunityVisa extends Visa {
  determineIf(func:((permissions: CommunityPermissions) => boolean)) : boolean;
}

import { MemberData } from "../../external-dependencies/datastore";
import { CommunityVisa, CommunityPermissions } from './community.visa';

export class CommunityVisaImplForMember<root extends MemberData> implements CommunityVisa {
  constructor(private root: root, private member: MemberData) {}  
  
  determineIf(func:((permissions:CommunityPermissions) => boolean)) :  boolean {
    const communityPermissions = this.member.role.permissions.communityPermissions;
    if(!communityPermissions) {
      console.log("Member Visa : no community permissions");
      return false;
    }
    
    return func(communityPermissions as CommunityPermissions);
  }
}