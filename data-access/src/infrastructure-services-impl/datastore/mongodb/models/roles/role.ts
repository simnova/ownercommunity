import { Schema, model, Model } from 'mongoose';
import { Base } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base';

export interface Role extends Base {
  discriminatorKey: string;
}

// TODO: Discriminator key and Version can't exist together, if we don't use version key it will fall back to __v
export const roleOptions = {
  discriminatorKey: 'roleType',
  timestamps: true,
  // versionKey: 'version',
};

const RoleSchema = new Schema<Role, Model<Role>, Role>({}, roleOptions);

export const RoleModel = model<Role>('Role', RoleSchema);
