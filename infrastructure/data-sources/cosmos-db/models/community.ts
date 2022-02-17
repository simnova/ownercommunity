import mongoose, { Schema, model, Model, ObjectId, Document,PopulatedDoc } from 'mongoose';
import { Base, BaseOptions, EmbeddedBase } from './interfaces/base';
import * as User from './user';

export interface ListingPermissions {
  id: ObjectId;
  canManageListings: boolean;
}
export interface AccountPermissions {
  id: ObjectId;
  canManageRolesAndPermissions: boolean;
}
export interface Permissions {
  id: ObjectId;
  listingPermissions: ListingPermissions;
  accountPermissions: AccountPermissions;
}

export interface Role extends EmbeddedBase {
  roleName: string;
  isDefault: boolean;
  permissions: Permissions;
}

export interface Contact extends EmbeddedBase {
  firstName:string;
  lastName?:string;
  role?:ObjectId;
  user:PopulatedDoc<User.User> | ObjectId;
}

export interface Community extends Base {
  name: string;
  handle: string;
  contacts: mongoose.Types.DocumentArray<Contact>
  roles: mongoose.Types.DocumentArray<Role>;
}

export const CommunityModel = model<Community>('Community',new Schema<Community, Model<Community>, Community>(
  {
    schemaVersion: { type: String, default: '1.0.0' },
    name: { type: String, required: true },
    handle: { type: String, required: false, unique: true },
    
    roles: [{
      roleName: { type: String, required: true },
      isDefault: { type: Boolean, required: true },
      permissions: {
        listingPermissions: {
          canManageListings: { type: Boolean, required: true }
        },
        accountPermissions: {
          canManageRolesAndPermissions: { type: Boolean, required: true }
        }
      },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }]
  },
  {
    ...BaseOptions,
  }
));