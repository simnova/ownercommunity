import { CommunityVisa } from "./contexts/community/community.visa";
import { CommunityPermissionsSpec } from "./contexts/community/role/community-permissions";

import { MemberEntityReference } from './contexts/community/member/member';
import { CommunityVisaImplForMember } from './contexts/community/member/community.visa-impl.for-member';

import { RoleEntityReference } from './contexts/community/role/role';
import { CommunityVisaImplForRole } from './contexts/community/role/community.visa-impl.for-role';

import { CommunityEntityReference } from './contexts/community/community/community';
import { CommunityVisaImplForCommunity } from './contexts/community/community/community.visa-impl.for-community';

import { PropertyEntityReference } from './contexts/property/property/property';
import { PropertyVisa, PropertyVisaImpl } from './contexts/property/property/property.visa';
import { PropertyPermissionsSpec } from './contexts/community/role/property-permissions';

import { ServiceEntityReference } from './contexts/community/service/service';
import { ServiceVisa, ServiceVisaImpl } from './contexts/community/service/service.visa';
import { ServicePermissionsSpec } from './contexts/community/role/service-permissions';

import { ServiceTicketV1EntityReference } from './contexts/cases/service-ticket/v1/service-ticket';
import { ServiceTicketV1Visa, ServiceTicketV1VisaImpl } from './contexts/cases/service-ticket/v1/service-ticket.visa';
import { ServiceTicketPermissionsSpec } from './contexts/community/role/service-ticket-permissions';

import { UserEntityReference } from './contexts/user/user/user';
import { UserVisa, UserVisaImpl } from './contexts/user/user/user.visa';

import { ViolationTicketV1EntityReference } from './contexts/cases/violation-ticket/v1/violation-ticket';
import { ViolationTicketV1Visa, ViolationTicketV1VisaImpl } from './contexts/cases/violation-ticket/v1/violation-ticket.visa';
import { ViolationTicketPermissionsSpec } from './contexts/community/role/violation-ticket-permissions';

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
  private communityPermissionsForSystem: CommunityPermissionsSpec = {
    canManageRolesAndPermissions: false,
    canManageCommunitySettings: false,
    canManageSiteContent: false,
    canManageMembers: false,
    canEditOwnMemberProfile: false,
    canEditOwnMemberAccounts: false,
    isEditingOwnMemberAccount: false,
    isSystemAccount: true,
  }
  private propertyPermissionsForSystem: PropertyPermissionsSpec = {
    canManageProperties: false,
    canEditOwnProperty: false,
    isEditingOwnProperty: false,
    isSystemAccount: true,
  }
  private servicePermissionsForSystem: ServicePermissionsSpec = {
    canManageServices: false,
    isSystemAccount: true,
  }
  private serviceTicketPermissionsForSystem: ServiceTicketPermissionsSpec = {
    canCreateTickets: false,
    canManageTickets: false,
    canAssignTickets: false,
    canWorkOnTickets: false,
    isEditingOwnTicket: false,
    isEditingAssignedTicket: false,
    isSystemAccount: true,
  }
  private violationTicketPermissionsForSystem: ViolationTicketPermissionsSpec = {
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
