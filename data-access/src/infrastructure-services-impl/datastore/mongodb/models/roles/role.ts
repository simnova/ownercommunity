import { Schema, model, Model } from 'mongoose';
import { Base } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base';

export interface Role extends Base {
  roleName: string;
  roleType?: string;
  isDefault: boolean;
  discriminatorKey: string;
}

// TODO: Discriminator key and Version can't exist together, if we don't use version key it will fall back to __v
export const roleOptions = {
  discriminatorKey: 'roleType',
  timestamps: true,
  // versionKey: 'version',
};

const RoleSchema = new Schema<Role, Model<Role>, Role>({
  schemaVersion: { type: String, default: '1.0.0' },
  roleName: { type: String, required: true, maxlength: 50 },
  roleType: { type: String, required: false, maxlength: 50 },
  isDefault: { type: Boolean, required: true, default: false },
  discriminatorKey: { type: String, required: true, default: 'roleType' },
}, roleOptions);

export const RoleModel = model<Role>('Role', RoleSchema);
