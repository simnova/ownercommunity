import { ObjectId, Schema, Model } from "mongoose";
import { Role, RoleModel } from "./role";


export interface StaffRoleServicePermissions {
  id?: ObjectId;
  canManageServices: boolean;
  isSystemAccount: false;
}

export interface StaffRoleServiceTicketPermissions {
  id?: ObjectId;
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canAssignTickets: boolean;
  canWorkOnTickets: boolean;
  isEditingOwnTicket: false;
  isEditingAssignedTicket: false;
  isSystemAccount: false;
}

export interface StaffRoleViolationTicketPermissions {
  id?: ObjectId;
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canAssignTickets: boolean;
  canWorkOnTickets: boolean;
  isEditingOwnTicket: false;
  isEditingAssignedTicket: false;
  isSystemAccount: false;
}

export interface StaffRolePropertyPermissions {
  id?: ObjectId;
  canManageProperties: boolean;
  canEditOwnProperty: boolean;
  isEditingOwnProperty: false;
  isSystemAccount: false;
}

export interface StaffRoleCommunityPermissions {
  id?: ObjectId;
  canManageRolesAndPermissions: boolean;
  canManageCommunitySettings: boolean;
  canManageSiteContent: boolean;
  canManageMembers: boolean;
  canEditOwnMemberProfile: boolean;
  canEditOwnMemberAccounts: boolean;
  isEditingOwnMemberAccount: false;
  isSystemAccount: false;
}

export interface StaffRolePermissions {
  id?: ObjectId;
  servicePermissions: StaffRoleServicePermissions;
  serviceTicketPermissions: StaffRoleServiceTicketPermissions;
  violationTicketPermissions: StaffRoleViolationTicketPermissions;
  communityPermissions: StaffRoleCommunityPermissions;
  propertyPermissions: StaffRolePropertyPermissions;
}

export interface StaffRole extends Role {
  roleName: string;
  isDefault: boolean;
  permissions: StaffRolePermissions;
}

export const StaffRoleSchema = new Schema<StaffRole, Model<StaffRole>, StaffRole>(
  {
    permissions: {
      servicePermissions: {
        canManageServices: { type: Boolean, required: true, default: false },
      },
      serviceTicketPermissions: {
        canCreateTickets: { type: Boolean, required: true, default: false },
        canManageTickets: { type: Boolean, required: true, default: false },
        canAssignTickets: { type: Boolean, required: true, default: false },
        canWorkOnTickets: { type: Boolean, required: true, default: false, index: true },
      },
      violationTicketPermissions: {
        canCreateTickets: { type: Boolean, required: true, default: false },
        canManageTickets: { type: Boolean, required: true, default: false },
        canAssignTickets: { type: Boolean, required: true, default: false },
        canWorkOnTickets: { type: Boolean, required: true, default: false, index: true },
      },
      communityPermissions: {
        canManageRolesAndPermissions: { type: Boolean, required: true, default: false },
        canManageCommunitySettings: { type: Boolean, required: true, default: false },
        canManageSiteContent: { type: Boolean, required: true, default: false },
        canManageMembers: { type: Boolean, required: true, default: false },
        canEditOwnMemberProfile: { type: Boolean, required: true, default: false },
        canEditOwnMemberAccounts: { type: Boolean, required: true, default: false },
      },
      propertyPermissions: {
        canManageProperties: { type: Boolean, required: true, default: false },
        canEditOwnProperty: { type: Boolean, required: true, default: false },
      },
    },
  },
);

export const StaffRoleModel = RoleModel.discriminator('staff-roles', StaffRoleSchema);
