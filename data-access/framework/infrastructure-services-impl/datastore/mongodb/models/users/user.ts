import { Schema, model, Model } from 'mongoose';
import { Base } from '../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base';

export interface User extends Base {
  discriminatorKey: string;
}

// TODO: Discriminator key and Version can't exist together, if we don't use version key it will fall back to __v
export const userOptions = {
  discriminatorKey: 'userType',
  timestamps: true,
  // versionKey: 'version',
};

const UserSchema = new Schema<User, Model<User>, User>({}, userOptions);

export const UserModel = model<User>('User', UserSchema);
