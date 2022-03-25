import { CommunityEntityReference, CommunityPermissions } from '../community/community';
import { MemberEntityReference } from '../community/member';
import { RoleEntityReference } from '../community/role';
import { UserEntityReference } from '../user/user';
import { CommunityVisa, CommunityVisaImpl } from './community-visa';
import { MemberVisaImpl } from './member-visa';
import { RoleVisaImpl } from './role-visa';
import { UserVisa, UserVisaImpl } from './user-visa';

export const SystemUserId = 'system';

export interface Visa{
  determineIf(func:((permissions) => boolean)) :  boolean ;
}

export interface Passport {
  forMember(root:MemberEntityReference): CommunityVisa;
  forCommunity(root: CommunityEntityReference):  CommunityVisa;
  forRole(root: RoleEntityReference): CommunityVisa;
  forUser(root: UserEntityReference):  UserVisa;
}

export class PassportImpl implements Passport {
  constructor(
    private readonly user: UserEntityReference, 
    private readonly member: MemberEntityReference
  ){
    if(!member.accounts.find(account => account.user.id === user.id)){
      throw new Error(`User ${user.id} is not a member of the community ${member.community.id}`);
    }
  } 
  forMember(root: MemberEntityReference): CommunityVisa {
    return new MemberVisaImpl(root,this.member);
  }
  forCommunity(root: CommunityEntityReference): CommunityVisa {
    return new CommunityVisaImpl(root,this.member);
  }
  forRole(root: RoleEntityReference): CommunityVisa {
    return new RoleVisaImpl(root,this.member);
  }
  forUser(root: UserEntityReference):  UserVisa {
    return new UserVisaImpl(root,this.user);
  }   
}

export class ReadOnlyPassport implements Passport {
  private constructor(){
    //prevent public construction
  }
  public static GetInstance(): Passport {
    return new ReadOnlyPassport();
  }
  forMember (root: MemberEntityReference): CommunityVisa {
    return {determineIf:  () => false };
  }
  forCommunity(root: CommunityEntityReference): CommunityVisa {
    return {determineIf:  () => false }; 
  }
  forRole(root: RoleEntityReference): CommunityVisa {
    return {determineIf:  () => false }; 
  }
  forUser(root: UserEntityReference): UserVisa {
    return {determineIf:  () => false }; 
  }
}

export class SystemPassport implements Passport {
  private constructor(){
    //prevent public construction
  }
  public static GetInstance(): Passport {
    return new SystemPassport();
  }
  private communityVisa: CommunityPermissions = {
    canManageRolesAndPermissions: false,
    canManageCommunitySettings: false,
    canManageSiteContent: false,
    canManageMembers: false,
    canEditOwnMemberProfile: false,
    canEditOwnMemberAccounts: false,
    isEditingOwnMemberAccount: false,
    isSystemAccount: true,
  }


  forMember (root: MemberEntityReference): CommunityVisa {
    return {determineIf: (func) => func(this.communityVisa) };
  }
  forCommunity(root: CommunityEntityReference): CommunityVisa {
    return {determineIf: (func) => func(this.communityVisa) };
  }
  forRole(root: RoleEntityReference): CommunityVisa {
    return {determineIf: (func) => func(this.communityVisa) };
  }
  forUser(root: UserEntityReference): UserVisa {
    return {determineIf:  () => false }; 
  }
}
