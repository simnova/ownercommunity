import { CommunityEntityReference, CommunityPermissions } from '../community/community';
import { MemberEntityReference } from '../community/member';
import { RoleEntityReference } from '../community/role';
import { PropertyEntityReference, PropertyPermissions } from '../property/property';
import { ServiceTicketEntityReference, ServiceTicketPermissions } from '../service-ticket/service-ticket';
import { UserEntityReference } from '../user/user';
import { CommunityVisa, CommunityVisaImpl } from './community-visa';
import { MemberVisaImpl } from './member-visa';
import { PropertyVisa, PropertyVisaImpl } from './property-visa';
import { RoleVisaImpl } from './role-visa';
import { ServiceTicketVisa, ServiceTicketVisaImpl } from './service-ticket-visa';
import { UserVisa, UserVisaImpl } from './user-visa';

export const SystemUserId = 'system';

export interface Visa{
  determineIf(func:((permissions) => boolean)) :  boolean ;
}

export interface Passport {
  forMember(root:MemberEntityReference): CommunityVisa;
  forCommunity(root: CommunityEntityReference):  CommunityVisa;
  forCurrentCommunity(): CommunityVisa;
  forRole(root: RoleEntityReference): CommunityVisa;
  forUser(root: UserEntityReference):  UserVisa;
  forProperty(root: PropertyEntityReference):  PropertyVisa;
  forServiceTicket(root: ServiceTicketEntityReference): ServiceTicketVisa;
}

export class PassportImpl implements Passport {
  constructor(
    private readonly user: UserEntityReference, 
    private readonly member: MemberEntityReference,
    private readonly community: CommunityEntityReference = null
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
  forCurrentCommunity(): CommunityVisa {
    return this.forCommunity(this.community);
  }
  forRole(root: RoleEntityReference): CommunityVisa {
    return new RoleVisaImpl(root,this.member);
  }
  forUser(root: UserEntityReference):  UserVisa {
    return new UserVisaImpl(root,this.user);
  }   
  forProperty(root: PropertyEntityReference):  PropertyVisa {
    return new PropertyVisaImpl(root,this.member);
  }
  forServiceTicket(root: ServiceTicketEntityReference): ServiceTicketVisa {
    return new ServiceTicketVisaImpl(root,this.member);
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
  forCurrentCommunity(): CommunityVisa {
    return {determineIf:  () => false }; 
  }
  forRole(root: RoleEntityReference): CommunityVisa {
    return {determineIf:  () => false }; 
  }
  forUser(root: UserEntityReference): UserVisa {
    return {determineIf:  () => false }; 
  }
  forProperty(root: PropertyEntityReference): PropertyVisa {
    return {determineIf:  () => false }; 
  }
  forServiceTicket(root: ServiceTicketEntityReference): ServiceTicketVisa {
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
  private propertyVisa: PropertyPermissions = {
    canManageProperties: false,
    canEditOwnProperty: false,
    isEditingOwnProperty: false,
    isSystemAccount: true,
  }
  private serviceTicketVisa: ServiceTicketPermissions = {
    canCreateTickets: false,
    canManageTickets: false,
    canAssignTickets: false,
    canWorkOnTickets: false,
    isEditingOwnTicket: false,
    isEditingAssignedTicket: false,
    isSystemAccount: true,
  }
  forMember (root: MemberEntityReference): CommunityVisa {
    return {determineIf: (func) => func(this.communityVisa) };
  }
  forCommunity(root: CommunityEntityReference): CommunityVisa {
    return {determineIf: (func) => func(this.communityVisa) };
  }
  forCurrentCommunity(): CommunityVisa {
    return {determineIf:  (func) => func(this.communityVisa) };
  }
  forRole(root: RoleEntityReference): CommunityVisa {
    return {determineIf: (func) => func(this.communityVisa) };
  }
  forUser(root: UserEntityReference): UserVisa {
    return {determineIf:  () => false }; 
  }
  forProperty(root: PropertyEntityReference): PropertyVisa {
    return {determineIf:  (func) => func(this.propertyVisa) };
  }
  forServiceTicket(root: ServiceTicketEntityReference): ServiceTicketVisa {
    return {determineIf:  (func) => func(this.serviceTicketVisa) };
  }
}
