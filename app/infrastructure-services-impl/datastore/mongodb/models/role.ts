import { Schema, model, Model, PopulatedDoc, ObjectId } from 'mongoose';
import { Base } from '../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base';
import * as  Community from './community';

export interface ServicePermissions {
  id: ObjectId;
  canManageServices: boolean;
  isSystemAccount: false;
}

export interface ServiceTicketPermissions {
  id: ObjectId;
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canAssignTickets: boolean;
  canWorkOnTickets: boolean;
  isEditingOwnTicket: false;
  isEditingAssignedTicket: false;
  isSystemAccount: false;
}

export interface PropertyPermissions {
  id: ObjectId;
  canManageProperties: boolean;
  canEditOwnProperty: boolean;
  isEditingOwnProperty: false;
  isSystemAccount: false;
}

export interface CommunityPermissions {
  id: ObjectId;
  canManageRolesAndPermissions: boolean;  
  canManageCommunitySettings: boolean;
  canManageSiteContent: boolean;
  canManageMembers: boolean;
  canEditOwnMemberProfile: boolean;
  canEditOwnMemberAccounts: boolean;
  isEditingOwnMemberAccount: false;
  isSystemAccount: false;
}

export interface Permissions {
  id: ObjectId;
  servicePermissions: ServicePermissions;
  serviceTicketPermissions: ServiceTicketPermissions;
  communityPermissions: CommunityPermissions;
  propertyPermissions: PropertyPermissions;
}

export interface Role extends Base {
  roleName: string;
  community: PopulatedDoc<Community.Community> | ObjectId;
  isDefault: boolean;
  permissions: Permissions;
}

export const RoleModel = model<Role>('Role',new Schema<Role, Model<Role>, Role>(
  {
    schemaVersion: { type: String, default: '1.0.0' },

    roleName: { type: String, required: true, maxlength: 50 },
    community: { type: Schema.Types.ObjectId, ref:Community.CommunityModel.modelName, required: true, index: true },    
    isDefault: { type: Boolean, required: true, default: false },
    permissions: {
      servicePermissions: {
        canManageServices: { type: Boolean, required: true, default: false }
      },
      serviceTicketPermissions: {
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
      }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true, 
    versionKey: 'version',
    optimisticConcurrency: true,
    shardKey: {community:1} 
  }
  ).index(
    { roleName: 1, community: 1 }, { unique: true }
  )
);