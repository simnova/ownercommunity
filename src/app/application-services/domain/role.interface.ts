import { RoleData } from "../../infrastructure-services/datastore";

export interface RoleDomainApplicationService {
  roleAdd(input: RoleAddInput) : Promise<RoleData>;
  roleUpdate(input: RoleUpdateInput) : Promise<RoleData>;
  roleDeleteAndReassign(input: RoleDeleteAndReassignInput) : Promise<RoleData>;
}

export type RoleAddInput = {
  permissions: PermissionsInput;
  roleName: string;
};

export type PermissionsInput = {
  communityPermissions: CommunityPermissionsInput;
  propertyPermissions: PropertyPermissionsInput;
  serviceTicketPermissions: ServiceTicketPermissionsInput;
};

export type CommunityPermissionsInput = {
  canEditOwnMemberAccounts: boolean;
  canEditOwnMemberProfile: boolean;
  canManageCommunitySettings: boolean;
  canManageMembers: boolean;
  canManageRolesAndPermissions: boolean;
  canManageSiteContent: boolean;
};

export type PropertyPermissionsInput = {
  canEditOwnProperty: boolean;
  canManageProperties: boolean;
};

export type ServiceTicketPermissionsInput = {
  canAssignTickets: boolean;
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canWorkOnTickets: boolean;
};

export type RoleUpdateInput = {
  id: string;
  permissions: PermissionsInput;
  roleName: string;
};

export type RoleDeleteAndReassignInput = {
  roleToDelete: string;
  roleToReassignTo: string;
};