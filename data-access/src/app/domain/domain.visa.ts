import { CommunityVisa, CommunityPermissionsSpec } from "./contexts/community/community.visa";

import { MemberEntityReference } from './contexts/community/member/member';
import { CommunityVisaImplForMember } from './contexts/community/member/community.visa-impl.for-member';

import { StaffRoleEntityReference } from './contexts/community/roles/staff-role/staff-role';
import { CommunityVisaImplForStaffRole } from './contexts/community/roles/staff-role/community.visa-impl.for-staff-role';

import { EndUserRoleEntityReference } from "./contexts/community/roles/end-user-role/end-user-role";
import { CommunityVisaImplForEndUserRole } from "./contexts/community/roles/end-user-role/community.visa-impl.for-role";

import { CommunityEntityReference } from './contexts/community/community/community';
import { CommunityVisaImplForCommunity } from './contexts/community/community/community.visa-impl.for-community';

import { PropertyEntityReference } from './contexts/property/property/property';
import { PropertyVisa, PropertyVisaImpl, PropertyPermissionsSpec } from './contexts/property/property/property.visa';

import { ServiceEntityReference } from './contexts/community/service/service';
import { ServiceVisa, ServiceVisaImpl, ServicePermissionsSpec } from './contexts/community/service/service.visa';

import { ServiceTicketV1EntityReference } from './contexts/cases/service-ticket/v1/service-ticket';
import { ServiceTicketV1Visa, ServiceTicketV1VisaImpl, ServiceTicketPermissionsSpec } from './contexts/cases/service-ticket/v1/service-ticket.visa';

import { EndUserEntityReference } from './contexts/users/end-user/end-user';
import { EndUserVisa, EndUserVisaImpl } from './contexts/users/end-user/end-user.visa';

import { StaffUserEntityReference } from "./contexts/users/staff-user/staff-user";
import { StaffUserPermissionsSpec, StaffUserVisa, StaffUserVisaImpl } from "./contexts/users/staff-user/staff-user.visa";

import { ViolationTicketV1EntityReference } from './contexts/cases/violation-ticket/v1/violation-ticket';
import { ViolationTicketV1Visa, ViolationTicketV1VisaImpl, ViolationTicketPermissionsSpec } from './contexts/cases/violation-ticket/v1/violation-ticket.visa';

export const SystemUserId = 'system';

export interface DomainVisa {
  forMember(root:MemberEntityReference): CommunityVisa;
  forCommunity(root: CommunityEntityReference):  CommunityVisa;
  forCurrentCommunity(): CommunityVisa;
  forStaffRole(root: StaffRoleEntityReference): CommunityVisa;
  forEndUserRole(root: EndUserRoleEntityReference): CommunityVisa;
  forEndUser(root: EndUserEntityReference):  EndUserVisa;
  forStaffUser(root: StaffUserEntityReference): StaffUserVisa;
  forProperty(root: PropertyEntityReference):  PropertyVisa;
  forService(root: ServiceEntityReference): ServiceVisa;
  forServiceTicketV1(root: ServiceTicketV1EntityReference): ServiceTicketV1Visa;
  forViolationTicketV1(root: ViolationTicketV1EntityReference): ViolationTicketV1Visa
}

export class DomainVisaImpl implements DomainVisa {
  constructor(
    private readonly user: EndUserEntityReference|StaffUserEntityReference, 
    private readonly member: MemberEntityReference,
    private readonly community: CommunityEntityReference = null
  ){
    if (!user) {
      throw new Error("User is required");
    }
    if(member !== null && !member.accounts.find(account => account.user.id === user.id)){
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
  forStaffRole(root: StaffRoleEntityReference): CommunityVisa {
    return new CommunityVisaImplForStaffRole(root,this.user as StaffUserEntityReference);
  }
  forEndUserRole(root: EndUserRoleEntityReference): CommunityVisa {
    return new CommunityVisaImplForEndUserRole(root,this.member);
  }
  forEndUser(root: EndUserEntityReference):  EndUserVisa {
    return new EndUserVisaImpl(root,this.user as EndUserEntityReference);
  }   
  forStaffUser(root: StaffUserEntityReference): StaffUserVisa {
    return new StaffUserVisaImpl(root, this.user as StaffUserEntityReference);
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
  forStaffRole(_root: StaffRoleEntityReference): CommunityVisa {
    return {determineIf:  () => false }; 
  }
  forEndUserRole(_root: EndUserRoleEntityReference): CommunityVisa {
    return {determineIf:  () => false }; 
  }
  forEndUser(_root: EndUserEntityReference): EndUserVisa {
    return {determineIf:  () => false }; 
  }
  forStaffUser(_root: StaffUserEntityReference): StaffUserVisa {
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
  private staffUserPermissionsForSystem: StaffUserPermissionsSpec = {
    isEditingOwnAccount: false,
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
  forStaffRole(root: StaffRoleEntityReference): CommunityVisa {
    return {determineIf: (func) => func(this.communityPermissionsForSystem) };
  }
  forEndUserRole(root: EndUserRoleEntityReference): CommunityVisa {
    return {determineIf:  () => false };
  }
  forEndUser(root: EndUserEntityReference): EndUserVisa {
    return {determineIf:  () => false }; 
  }
  forStaffUser(root: StaffUserEntityReference): StaffUserVisa {
    return {determineIf:  (func) => func(this.staffUserPermissionsForSystem) };
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
