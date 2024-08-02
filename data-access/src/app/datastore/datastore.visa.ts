import { CommunityVisa } from './community/community.visa';
import { CommunityVisaImplForCommunity } from './community/community.visa-impl.for-community';
import { CommunityVisaImplForMember } from './community/community.visa-impl.for-member';
import { CommunityVisaImplForEndUserRole } from './community/community.visa-impl.for-end-user-role';
import { PropertyVisa, PropertyVisaImplForProperty } from './property/property.visa';
import { ServiceTicketVisa, ServiceTicketVisaImplForServiceTicket } from './cases/service-ticket/service-ticket.visa';
import { ViolationTicketVisa, ViolationTicketVisaImplForViolationTicket } from './cases/violation-ticket/violation-ticket.visa';
import { CommunityData, MemberData, StaffRolePermissions, EndUserRolePermissions, PropertyData, StaffRoleData, EndUserRoleData, ServiceData, ServiceTicketData, EndUserData, ViolationTicketData, StaffUserData } from '../external-dependencies/datastore';
import { ServiceVisa, ServiceVisaImplForService } from './service/service.visa';
import { CommunityVisaImplForStaffRole } from './community/community.visa-impl.for-staff-role';
import { CommunityPermissionsSpec } from '../domain/contexts/community/community.visa';

export const SystemUserId = 'system';

export interface DatastoreVisa {
  forCommunity(root: CommunityData): CommunityVisa;
  forMember(root: MemberData): CommunityVisa;
  forProperty(root: PropertyData): PropertyVisa;
  forEndUserRole(root: EndUserRoleData): CommunityVisa;
  forStaffRole(root: StaffRoleData): CommunityVisa;
  forService(root: ServiceData): ServiceVisa;
  forServiceTicket(root: ServiceTicketData): ServiceTicketVisa;
  forViolationTicket(root: ViolationTicketData): ViolationTicketVisa
}

export class DatastoreVisaImpl implements DatastoreVisa {
  constructor(
    private readonly user: EndUserData|StaffUserData, 
    private readonly member: MemberData,
    // private readonly community: CommunityData = null
  ){
    if(!member.accounts.find(account => account.user.id === this.user.id)){
      throw new Error(`User ${this.user.id} is not a member of the community ${member.community.id}`);
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

  forEndUserRole(root: EndUserRoleData): CommunityVisa {
    return new CommunityVisaImplForEndUserRole(root,this.member);
  }

  forStaffRole(root: StaffRoleData): CommunityVisa {
    return new CommunityVisaImplForStaffRole(root,this.user as StaffUserData);
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
  forEndUserRole(_root: EndUserRoleData): CommunityVisa {
    return {determineIf:  () => false }; 
  }
  forStaffRole(_root: StaffRoleData): CommunityVisa {
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

  private readonly systemEndUserRolePermissions: EndUserRolePermissions = BuildSystemPermissions();

  private readonly systemStaffRolePermissions: StaffRolePermissions = {
    communityPermissions: {
      canManageStaffRolesAndPermissions: false,
      canManageAllCommunities: false,
      canDeleteCommunities: false,
      canChangeCommunityOwner: false,
      canReIndexSearchCollections: false,
    },
    propertyPermissions: {},
    servicePermissions: {},
    serviceTicketPermissions: {},
    violationTicketPermissions: {}
  };

  private readonly systemCommunityPermissions = {
    ...this.systemEndUserRolePermissions.communityPermissions,
    ...this.systemStaffRolePermissions.communityPermissions
  };



  forCommunity(_root: CommunityData): CommunityVisa {
    return {determineIf:  (func) => func(this.systemCommunityPermissions) };
  }

  forMember(_root: MemberData): CommunityVisa {
    return {determineIf:  (func) => func(this.systemCommunityPermissions) };
  }

  forProperty(_root: PropertyData): PropertyVisa {
    return {determineIf:  (func) => func(this.systemEndUserRolePermissions.propertyPermissions) };
  }

  forEndUserRole(_root: EndUserRoleData): CommunityVisa {
    return {determineIf: (func) => func(this.systemCommunityPermissions) };
  }
  
  forStaffRole(_root: StaffRoleData): CommunityVisa {
    return {determineIf: (func) => func(this.systemCommunityPermissions) };
  }

  forService(_root: ServiceData): ServiceVisa {
    return {determineIf:  (func) => func(this.systemEndUserRolePermissions.servicePermissions) };
  }

  forServiceTicket(_root: ServiceTicketData): ServiceTicketVisa {
    return {determineIf:  (func) => func(this.systemEndUserRolePermissions.serviceTicketPermissions) };
  }

  forViolationTicket(_root: ViolationTicketData): ViolationTicketVisa {
    return {determineIf:  (func) => func(this.systemEndUserRolePermissions.violationTicketPermissions) };
  }
}

const BuildSystemPermissions = (): EndUserRolePermissions => {
  return {
    servicePermissions: {
      canManageServices: false,
      isSystemAccount: false,
    },
    serviceTicketPermissions: {
      canCreateTickets: false,
      canManageTickets: false,
      canAssignTickets: false,
      canWorkOnTickets: false,
      isEditingOwnTicket: false,
      isEditingAssignedTicket: false,
      isSystemAccount: false,
    },
    violationTicketPermissions: {
      canCreateTickets: false,
      canManageTickets: false,
      canAssignTickets: false,
      canWorkOnTickets: false,
      isEditingOwnTicket: false,
      isEditingAssignedTicket: false,
      isSystemAccount: false,
    },
    propertyPermissions: {
      canManageProperties: false,
      canEditOwnProperty: false,
      isEditingOwnProperty: false,
      isSystemAccount: false,
    },
    communityPermissions: {
      canManageRolesAndPermissions: false,
      canManageCommunitySettings: false,
      canManageSiteContent: false,
      canManageMembers: false,
      canEditOwnMemberProfile: false,
      canEditOwnMemberAccounts: false,
      isEditingOwnMemberAccount: false,
      isSystemAccount: false,
    }
  };
}
