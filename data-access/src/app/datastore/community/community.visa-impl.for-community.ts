
import { MemberData, CommunityData } from "../../external-dependencies/datastore";
import { CommunityVisa, CommunityPermissions } from "./community.visa";

export class CommunityVisaImplForCommunity<root extends CommunityData> implements CommunityVisa {
  constructor(private root: root, private member: MemberData) {}  
  
  determineIf(func:((permissions:CommunityPermissions) => boolean)) :  boolean {
    const communityPermissions = this.member.role.permissions.communityPermissions;
    if(!communityPermissions) {
      console.log("Community Visa : no community permissions");
      return false;
    }
    
    return func(communityPermissions as CommunityPermissions);
  }
}