
import { MemberData, CommunityData, StaffUserData, EndUserData } from "../../external-dependencies/datastore";
import { CommunityVisa, CommunityPermissions } from "./community.visa";

export class CommunityVisaImplForCommunity<root extends CommunityData> implements CommunityVisa {
  constructor(private root: root, private member: MemberData, private user: StaffUserData|EndUserData) {}  
  
  determineIf(func:((permissions:CommunityPermissions) => boolean)) :  boolean {
    let communityPermissions: CommunityPermissions;

    if (this.member && this.member !== null) {
      communityPermissions = this.member.role.permissions.communityPermissions;
    } 
    else if (this.user && this.user !== null && this.user.userType === 'internal-staff') {
      const user = this.user as StaffUserData;
      communityPermissions = user.role.permissions.communityPermissions;
    }
    
    if(!communityPermissions) {
      console.log("Community Visa : no community permissions");
      return false;
    }
    
    return func(communityPermissions as CommunityPermissions);
  }
}