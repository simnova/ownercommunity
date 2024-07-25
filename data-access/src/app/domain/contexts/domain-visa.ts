import { CommunityEntityReference } from './community/community/community';
import { CommunityPermissions } from "./community/community.visa";
import { MemberEntityReference } from './community/member/member';
import { RoleEntityReference } from './community/role/role';
import { PropertyEntityReference } from './property/property/property';
import { PropertyPermissions } from "./property/property/property.visa";
import { ServiceEntityReference } from './community/service/service';
import { ServicePermissions } from "./community/service/service.visa";
import { ServiceTicketV1EntityReference } from './cases/service-ticket/v1/service-ticket';
import { ServiceTicketV1Permissions } from "./cases/service-ticket/v1/service-ticket.visa";
import { UserEntityReference } from './user/user/user';
import { CommunityVisa } from "./community/community.visa";
import { CommunityVisaImplForCommunity } from './community/community/community.visa-impl.for-community';
import { CommunityVisaImplForMember } from './community/member/community.visa-impl.for-member';
import { PropertyVisa } from './property/property/property.visa';
import { PropertyVisaImpl } from './property/property/property.visa';
import { CommunityVisaImplForRole } from './community/role/community.visa-impl.for-role';
import { ServiceVisa } from './community/service/service.visa';
import { ServiceVisaImpl } from './community/service/service.visa';
import { ServiceTicketV1Visa } from './cases/service-ticket/v1/service-ticket.visa';
import { ServiceTicketV1VisaImpl } from './cases/service-ticket/v1/service-ticket.visa';
import { UserVisa } from './user/user/user.visa';
import { UserVisaImpl } from './user/user/user.visa';
import { ViolationTicketV1EntityReference } from './cases/violation-ticket/v1/violation-ticket';
import { ViolationTicketV1Visa, ViolationTicketV1VisaImpl } from './cases/violation-ticket/v1/violation-ticket.visa';
import { ViolationTicketV1Permissions } from "./cases/violation-ticket/v1/violation-ticket.visa";

export const SystemUserId = 'system';

export interface DomainVisa {
  forMember(root:MemberEntityReference): CommunityVisa;
  forCommunity(root: CommunityEntityReference):  CommunityVisa;
  forCurrentCommunity(): CommunityVisa;
  forRole(root: RoleEntityReference): CommunityVisa;
  forUser(root: UserEntityReference):  UserVisa;
  forProperty(root: PropertyEntityReference):  PropertyVisa;
  forService(root: ServiceEntityReference): ServiceVisa;
  forServiceTicketV1(root: ServiceTicketV1EntityReference): ServiceTicketV1Visa;
  forViolationTicketV1(root: ViolationTicketV1EntityReference): ViolationTicketV1Visa
}

export class DomainVisaImpl implements DomainVisa {
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
    return new CommunityVisaImplForMember(root,this.member);
  }
  forCommunity(root: CommunityEntityReference): CommunityVisa {
    return new CommunityVisaImplForCommunity(root,this.member);
  }
  forCurrentCommunity(): CommunityVisa {
    return this.forCommunity(this.community);
  }
  forRole(root: RoleEntityReference): CommunityVisa {
    return new CommunityVisaImplForRole(root,this.member);
  }
  forUser(root: UserEntityReference):  UserVisa {
    return new UserVisaImpl(root,this.user);
  }   
  forProperty(root: PropertyEntityReference):  PropertyVisa {
    return new PropertyVisaImpl(root,this.member);
  }
  forService(root: ServiceEntityReference): ServiceVisa {
    return new ServiceVisaImpl(root,this.member);
  }
  forServiceTicketV1(root: ServiceTicketV1EntityReference): ServiceTicketV1Visa {
    return new ServiceTicketV1VisaImpl(root,this.member);
  }
  forViolationTicketV1(root: ViolationTicketV1EntityReference): ViolationTicketV1Visa {
    return new ViolationTicketV1VisaImpl(root,this.member);
  }
}

export class ReadOnlyDomainVisa implements DomainVisa {
  private constructor(){
    //prevent public construction
  }
  public static GetInstance(): DomainVisa {
    return new ReadOnlyDomainVisa();
  }
  forMember (_root: MemberEntityReference): CommunityVisa {
    return {determineIf:  () => false };
  }
  forCommunity(_root: CommunityEntityReference): CommunityVisa {
    return {determineIf:  () => false }; 
  }
  forCurrentCommunity(): CommunityVisa {
    return {determineIf:  () => false }; 
  }
  forRole(_root: RoleEntityReference): CommunityVisa {
    return {determineIf:  () => false }; 
  }
  forUser(_root: UserEntityReference): UserVisa {
    return {determineIf:  () => false }; 
  }
  forProperty(_root: PropertyEntityReference): PropertyVisa {
    return {determineIf:  () => false }; 
  }
  forService(_root: ServiceEntityReference): ServiceVisa {
    return {determineIf:  () => false };
  }
  forServiceTicketV1(_root: ServiceTicketV1EntityReference): ServiceTicketV1Visa {
    return {determineIf:  () => false }; 
  }
  forViolationTicketV1(_root: ViolationTicketV1EntityReference): ViolationTicketV1Visa {
    return {determineIf:  () => false }; 
  }
}

export class SystemDomainVisa implements DomainVisa {
  private constructor(){
    //prevent public construction
  }
  public static GetInstance(): DomainVisa {
    return new SystemDomainVisa();
  }
  private communityPermissionsForSystem: CommunityPermissions = {
    canManageRolesAndPermissions: false,
    canManageCommunitySettings: false,
    canManageSiteContent: false,
    canManageMembers: false,
    canEditOwnMemberProfile: false,
    canEditOwnMemberAccounts: false,
    isEditingOwnMemberAccount: false,
    isSystemAccount: true,
  }
  private propertyPermissionsForSystem: PropertyPermissions = {
    canManageProperties: false,
    canEditOwnProperty: false,
    isEditingOwnProperty: false,
    isSystemAccount: true,
  }
  private servicePermissionsForSystem: ServicePermissions = {
    canManageServices: false,
    isSystemAccount: true,
  }
  private serviceTicketPermissionsForSystem: ServiceTicketV1Permissions = {
    canCreateTickets: false,
    canManageTickets: false,
    canAssignTickets: false,
    canWorkOnTickets: false,
    isEditingOwnTicket: false,
    isEditingAssignedTicket: false,
    isSystemAccount: true,
  }
  private violationTicketPermissionsForSystem: ViolationTicketV1Permissions = {
    canCreateTickets: false,
    canManageTickets: false,
    canAssignTickets: false,
    canWorkOnTickets: false,
    isEditingOwnTicket: false,
    isEditingAssignedTicket: false,
    isSystemAccount: true,
  }
  forMember (root: MemberEntityReference): CommunityVisa {
    return {determineIf: (func) => func(this.communityPermissionsForSystem) };
  }
  forCommunity(root: CommunityEntityReference): CommunityVisa {
    return {determineIf: (func) => func(this.communityPermissionsForSystem) };
  }
  forCurrentCommunity(): CommunityVisa {
    return {determineIf:  (func) => func(this.communityPermissionsForSystem) };
  }
  forRole(root: RoleEntityReference): CommunityVisa {
    return {determineIf: (func) => func(this.communityPermissionsForSystem) };
  }
  forUser(root: UserEntityReference): UserVisa {
    return {determineIf:  () => false }; 
  }
  forProperty(root: PropertyEntityReference): PropertyVisa {
    return {determineIf:  (func) => func(this.propertyPermissionsForSystem) };
  }
  forService(root: ServiceEntityReference): ServiceVisa {
    return {determineIf:  (func) => func(this.servicePermissionsForSystem) };
  }
  forServiceTicketV1(root: ServiceTicketV1EntityReference): ServiceTicketV1Visa {
    return {determineIf:  (func) => func(this.serviceTicketPermissionsForSystem) };
  }
  forViolationTicketV1(root: ViolationTicketV1EntityReference): ViolationTicketV1Visa {
    return {determineIf:  (func) => func(this.violationTicketPermissionsForSystem) };
  }
}
