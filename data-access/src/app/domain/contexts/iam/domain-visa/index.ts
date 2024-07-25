import { CommunityEntityReference } from '../../community/community/community';
import { CommunityPermissions } from "../../community/community-permissions.spec";
import { MemberEntityReference } from '../../community/member/member';
import { RoleEntityReference } from '../../community/role/role';
import { PropertyEntityReference } from '../../property/property';
import { PropertyPermissions } from "../../property/property-permissions.spec";
import { ServiceEntityReference } from '../../community/service/service';
import { ServicePermissions } from "../../community/service-permissions.spec";
import { ServiceTicketV1EntityReference } from '../../cases/service-ticket/v1/service-ticket';
import { ServiceTicketPermissions } from "../../cases/service-ticket/v1/service-ticket-permissions.spec";
import { UserEntityReference } from '../../user/user';
import { CommunityVisa } from './community-visa';
import { CommunityVisaImplForCommunity } from './community-visa-impl-for-community';
import { CommunityVisaImplForMember } from './community-visa-impl-for-member';
import { PropertyVisa } from './property-visa';
import { PropertyVisaImplForProperty } from './property-visa-impl-for-property';
import { CommunityVisaImplForRole } from './community-visa-impl-for-role';
import { ServiceVisa } from './service-visa';
import { ServiceVisaImplForService } from './service-visa-impl-for-service';
import { ServiceTicketVisa } from './service-ticket-visa';
import { ServiceTicketVisaImplForServiceTicket } from './service-ticket-visa-impl-for-service-ticket';
import { UserVisa } from './user-visa';
import { UserVisaImplForUser } from './user-visa-impl-for-user';
import { ViolationTicketV1EntityReference } from '../../cases/violation-ticket/v1/violation-ticket';
import { ViolationTicketVisa } from './violation-ticket-visa';
import { ViolationTicketVisaImplForViolationTicket } from './violation-ticket-visa-impl-for-violation-ticket';
import { ViolationTicketPermissions } from '../../cases/violation-ticket/v1/violation-ticket-permissions.spec';

export const SystemUserId = 'system';

export interface DomainVisa {
  forMember(root:MemberEntityReference): CommunityVisa;
  forCommunity(root: CommunityEntityReference):  CommunityVisa;
  forCurrentCommunity(): CommunityVisa;
  forRole(root: RoleEntityReference): CommunityVisa;
  forUser(root: UserEntityReference):  UserVisa;
  forProperty(root: PropertyEntityReference):  PropertyVisa;
  forService(root: ServiceEntityReference): ServiceVisa;
  forServiceTicket(root: ServiceTicketV1EntityReference): ServiceTicketVisa;
  forViolationTicket(root: ViolationTicketV1EntityReference): ViolationTicketVisa
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
    return new UserVisaImplForUser(root,this.user);
  }   
  forProperty(root: PropertyEntityReference):  PropertyVisa {
    return new PropertyVisaImplForProperty(root,this.member);
  }
  forService(root: ServiceEntityReference): ServiceVisa {
    return new ServiceVisaImplForService(root,this.member);
  }
  forServiceTicket(root: ServiceTicketV1EntityReference): ServiceTicketVisa {
    return new ServiceTicketVisaImplForServiceTicket(root,this.member);
  }
  forViolationTicket(root: ViolationTicketV1EntityReference): ViolationTicketVisa {
    return new ViolationTicketVisaImplForViolationTicket(root,this.member);
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
  forServiceTicket(_root: ServiceTicketV1EntityReference): ServiceTicketVisa {
    return {determineIf:  () => false }; 
  }
  forViolationTicket(_root: ViolationTicketV1EntityReference): ViolationTicketVisa {
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
  private serviceTicketPermissionsForSystem: ServiceTicketPermissions = {
    canCreateTickets: false,
    canManageTickets: false,
    canAssignTickets: false,
    canWorkOnTickets: false,
    isEditingOwnTicket: false,
    isEditingAssignedTicket: false,
    isSystemAccount: true,
  }
  private violationTicketPermissionsForSystem: ViolationTicketPermissions = {
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
  forServiceTicket(root: ServiceTicketV1EntityReference): ServiceTicketVisa {
    return {determineIf:  (func) => func(this.serviceTicketPermissionsForSystem) };
  }
  forViolationTicket(root: ViolationTicketV1EntityReference): ViolationTicketVisa {
    return {determineIf:  (func) => func(this.violationTicketPermissionsForSystem) };
  }
}
