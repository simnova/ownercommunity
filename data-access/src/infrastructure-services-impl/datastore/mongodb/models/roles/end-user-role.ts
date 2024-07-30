import { Schema, Model, PopulatedDoc, ObjectId } from 'mongoose';
import * as Community from '../community';
import { Role, RoleModel } from './role';

export interface EndUserRoleServicePermissions {
  id?: ObjectId;
  canManageServices: boolean;
  isSystemAccount: false;
}

export interface EndUserRoleServiceTicketPermissions {
  id?: ObjectId;
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canAssignTickets: boolean;
  canWorkOnTickets: boolean;
  isEditingOwnTicket: false;
  isEditingAssignedTicket: false;
  isSystemAccount: false;
}

export interface EndUserRoleViolationTicketPermissions {
  id?: ObjectId;
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canAssignTickets: boolean;
  canWorkOnTickets: boolean;
  isEditingOwnTicket: false;
  isEditingAssignedTicket: false;
  isSystemAccount: false;
}

export interface EndUserRolePropertyPermissions {
  id?: ObjectId;
  canManageProperties: boolean;
  canEditOwnProperty: boolean;
  isEditingOwnProperty: false;
  isSystemAccount: false;
}

export interface EndUserRoleCommunityPermissions {
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

export interface EndUserRolePermissions {
  id?: ObjectId;
  servicePermissions: EndUserRoleServicePermissions;
  serviceTicketPermissions: EndUserRoleServiceTicketPermissions;
  violationTicketPermissions: EndUserRoleViolationTicketPermissions;
  communityPermissions: EndUserRoleCommunityPermissions;
  propertyPermissions: EndUserRolePropertyPermissions;
}

export interface EndUserRole extends Role {
  community: PopulatedDoc<Community.Community> | ObjectId;
  permissions: EndUserRolePermissions;
}

export const EndUserRoleSchema = new Schema<EndUserRole, Model<EndUserRole>, EndUserRole>(
  {
    community: { type: Schema.Types.ObjectId, ref: Community.CommunityModel.modelName, required: true, index: true },
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
  {
    optimisticConcurrency: true,
    shardKey: { community: 1 },
  }
).index({ roleName: 1, community: 1 }, { unique: true });

export const EndUserRoleModel = RoleModel.discriminator('end-user-roles', EndUserRoleSchema);
