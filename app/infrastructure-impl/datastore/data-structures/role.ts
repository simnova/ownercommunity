import { BaseDataStructure } from "../../../../seedwork/services-seedwork-datastore-memorydb/interfaces/base";
import { CommunityDataStructure } from "./community";

export interface ServicePermissions {
  id: any;
  canManageServices: boolean;
  isSystemAccount: boolean;
}

export interface ServiceTicketPermissions {
  id: any;
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canAssignTickets: boolean;
  canWorkOnTickets: boolean;
  isEditingOwnTicket: boolean;
  isEditingAssignedTicket: boolean;
  isSystemAccount: boolean;
}

export interface PropertyPermissions {
  id: any;
  canManageProperties: boolean;
  canEditOwnProperty: boolean;
  isEditingOwnProperty: boolean;
  isSystemAccount: boolean;
}

export interface CommunityPermissions {
  id: any;
  canManageRolesAndPermissions: boolean;  
  canManageCommunitySettings: boolean;
  canManageSiteContent: boolean;
  canManageMembers: boolean;
  canEditOwnMemberProfile: boolean;
  canEditOwnMemberAccounts: boolean;
  isEditingOwnMemberAccount: boolean;
  isSystemAccount: boolean;
}

export interface Permissions {
  id: any;
  servicePermissions: ServicePermissions;
  serviceTicketPermissions: ServiceTicketPermissions;
  communityPermissions: CommunityPermissions;
  propertyPermissions: PropertyPermissions;
}

export interface RoleDataStructure extends BaseDataStructure {
  roleName: string;
  community: CommunityDataStructure | string;
  isDefault: boolean;
  permissions: Permissions;
}
