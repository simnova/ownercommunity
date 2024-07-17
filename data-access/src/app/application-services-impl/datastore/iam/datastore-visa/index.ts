import { CommunityVisa } from './community-visa';
import { CommunityVisaImplForCommunity } from './community-visa-impl-for-community';
import { CommunityVisaImplForMember } from './community-visa-impl-for-member';
import { CommunityVisaImplForRole } from './community-visa-impl-for-role';
import { PropertyVisa } from './property-visa';
import { PropertyVisaImplForProperty } from './property-visa-impl-for-property';
import { ServiceTicketVisa } from './service-ticket-visa';
import { ServiceTicketVisaImplForServiceTicket } from './service-ticket-visa-impl-for-service-ticket';
import { ViolationTicketVisa } from './violation-ticket-visa';
import { ViolationTicketVisaImplForViolationTicket } from './violation-ticket-visa-impl-for-violation-ticket';
import { CommunityData, CommunityPermissions, MemberData, PropertyData, PropertyPermissions, RoleData, ServiceData, ServicePermissions, ServiceTicketData, ServiceTicketPermissions, UserData, ViolationTicketData, ViolationTicketPermissions } from '../../../../external-dependencies/datastore';
import { ServiceVisa } from './service-visa';
import { ServiceVisaImplForService } from './service-visa-impl-for-service';


export const SystemUserId = 'system';

export interface DatastoreVisa {
  forCommunity(root: CommunityData): CommunityVisa;
  forMember(root: MemberData): CommunityVisa;
  forProperty(root: PropertyData): PropertyVisa;
  forRole(root: RoleData): CommunityVisa;
  forService(root: ServiceData): ServiceVisa;
  forServiceTicket(root: ServiceTicketData): ServiceTicketVisa;
  forViolationTicket(root: ViolationTicketData): ViolationTicketVisa
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

  forCommunity(root: CommunityData): CommunityVisa {
    return new CommunityVisaImplForCommunity(root,this.member);
  }

  forMember(root: MemberData): CommunityVisa {
    return new CommunityVisaImplForMember(root,this.member);
  }

  forProperty(root: PropertyData): PropertyVisa {
    return new PropertyVisaImplForProperty(root,this.member);
  }

  forRole(root: RoleData): CommunityVisa {
    return new CommunityVisaImplForRole(root,this.member);
  }

  forService(root: ServiceData): ServiceVisa {
    return new ServiceVisaImplForService(root,this.member);
  }

  forServiceTicket(root: ServiceTicketData): ServiceTicketVisa {
    return new ServiceTicketVisaImplForServiceTicket(root,this.member);
  }

  forViolationTicket(root: ViolationTicketData): ViolationTicketVisa {
    return new ViolationTicketVisaImplForViolationTicket(root, this.member);
  }
}

export class ReadOnlyDatastoreVisaImpl implements DatastoreVisa {
  private constructor(){
    //prevent public construction
  }
  public static GetInstance(): DatastoreVisa {
    return new ReadOnlyDatastoreVisaImpl();
  }
  forCommunity(_root: CommunityData): CommunityVisa {
    return {determineIf:  () => false };
  }
  forMember(_root: MemberData): CommunityVisa {
    return {determineIf:  () => false };
  }
  forProperty(_root: PropertyData): PropertyVisa {
    return {determineIf:  () => false };
  }
  forRole(_root: RoleData): CommunityVisa {
    return {determineIf:  () => false }; 
  }
  forService(_root: ServiceData): ServiceVisa {
    return {determineIf:  () => false };
  }
  forServiceTicket(_root: ServiceTicketData): ServiceTicketVisa {
    return {determineIf:  () => false };
  }
  forViolationTicket(root: ViolationTicketData): ViolationTicketVisa {
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

  private propertyPermissionsForSystem: PropertyPermissions = {
    canManageProperties: false,
    canEditOwnProperty: false,
    isEditingOwnProperty: false,
    isSystemAccount: false,
  }

  private servicePermissionsForSystem: ServicePermissions = {
    canManageServices: false,
    isSystemAccount: false,
  }

  private serviceTicketPermissionsForSystem: ServiceTicketPermissions = {
    canCreateTickets: false,
    canManageTickets: false,
    canAssignTickets: false,
    canWorkOnTickets: false,
    isEditingOwnTicket: false,
    isEditingAssignedTicket: false,
    isSystemAccount: false,
  }

  private violationTicketPermissionsForSystem: ViolationTicketPermissions = {
    canCreateTickets: false,
    canManageTickets: false,
    canAssignTickets: false,
    canWorkOnTickets: false,
    isEditingOwnTicket: false,
    isEditingAssignedTicket: false,
    isSystemAccount: false,
  }

  forCommunity(root: CommunityData): CommunityVisa {
    return {determineIf:  (func) => func(this.communityPermissionsForSystem) };
  }

  forMember(root: MemberData): CommunityVisa {
    return {determineIf:  (func) => func(this.communityPermissionsForSystem) };
  }

  forProperty(root: PropertyData): PropertyVisa {
    return {determineIf:  (func) => func(this.propertyPermissionsForSystem) };
  }

  forRole(root: RoleData): CommunityVisa {
    return {determineIf: (func) => func(this.communityPermissionsForSystem) };
  }

  forService(root: ServiceData): ServiceVisa {
    return {determineIf:  (func) => func(this.servicePermissionsForSystem) };
  }

  forServiceTicket(root: ServiceTicketData): ServiceTicketVisa {
    return {determineIf:  (func) => func(this.serviceTicketPermissionsForSystem) };
  }

  forViolationTicket(root: ViolationTicketData): ViolationTicketVisa {
    return {determineIf:  (func) => func(this.violationTicketPermissionsForSystem) };
  }
}
