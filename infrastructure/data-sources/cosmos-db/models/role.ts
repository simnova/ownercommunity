import { Schema, model, Model, PopulatedDoc, ObjectId } from 'mongoose';
import { Base, BaseOptions } from './interfaces/base';
import * as  Community from './community';

export interface ServiceTicketPermissions {
  id: ObjectId;
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canWorkOnTickets: boolean;
}

export interface CommunityPermissions {
  id: ObjectId;
  canManageRolesAndPermissions: boolean;  
  canManageCommunitySettings: boolean;
  canManageSiteContent: boolean;
}

export interface Permissions {
  id: ObjectId;
//  serviceTicketPermissions: ServiceTicketPermissions;
  communityPermissions: CommunityPermissions;
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
    community: { type: Schema.Types.ObjectId, ref:Community.CommunityModel.modelName, required: true, index: true, },    
    isDefault: { type: Boolean, required: true, default: false },
    permissions: {
      serviceTicketPermissions: {
        canCreateTickets: { type: Boolean, required: true, default: false },
        canManageTickets: { type: Boolean, required: true, default: false },
        canWorkOnTickets: { type: Boolean, required: true, default: false },
      },
      communityPermissions: {
        canManageRolesAndPermissions: { type: Boolean, required: true, default: false },
        canManageCommunitySettings: { type: Boolean, required: true, default: false },
        canManageSiteContent: { type: Boolean, required: true, default: false },
      }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  {
    ...BaseOptions,
  }
  ).index(
    { name: 1, community: 1 }, { unique: true }
  )
);