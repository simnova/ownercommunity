import { RoleVisa } from './role/role.visa';
import { RoleVisaImplForRole } from "./role/role.visa";
import { CommunityPermissions, MemberData, RoleData, UserData } from '../external-dependencies/datastore';

export const SystemUserId = 'system';

export interface DatastoreVisa {
  forRole(root: RoleData): RoleVisa;
}

export class DatastoreVisaImpl implements DatastoreVisa {
  constructor(
    private readonly user: UserData, 
    private readonly member: MemberData,
    // private readonly community: CommunityData = null
  ){
    if(!member.accounts.find(account => account.user.id === user.id)){
      throw new Error(`User ${user.id} is not a member of the community ${member.community.id}`);
    }
  } 

  forRole(root: RoleData): RoleVisa {
    return new RoleVisaImplForRole(root,this.member);
  }
}

export class ReadOnlyDatastoreVisaImpl implements DatastoreVisa {
  private constructor(){
    //prevent public construction
  }
  public static GetInstance(): DatastoreVisa {
    return new ReadOnlyDatastoreVisaImpl();
  }
  forRole(_root: RoleData): RoleVisa {
    return {determineIf:  () => false }; 
  }
}

export class SystemDatastoreVisaImpl implements DatastoreVisa {
  private constructor(){
    //prevent public construction
  }
  public static GetInstance(): DatastoreVisa {
    return new SystemDatastoreVisaImpl();
  }
  private communityPermissionsForSystem: CommunityPermissions = {
    canManageRolesAndPermissions: false,
    canManageCommunitySettings: false,
    canManageSiteContent: false,
    canManageMembers: false,
    canEditOwnMemberProfile: false,
    canEditOwnMemberAccounts: false,
    isEditingOwnMemberAccount: false,
    isSystemAccount: false,
  }

  forRole(root: RoleData): RoleVisa {
    return {determineIf: (func) => func(this.communityPermissionsForSystem) };
  }
}
