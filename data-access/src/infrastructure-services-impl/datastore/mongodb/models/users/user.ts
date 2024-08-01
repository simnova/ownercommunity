import { Schema, model, Model } from 'mongoose';
import { Base, Patterns } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base';

export interface User extends Base {
  displayName: string;
  externalId: string;
  userType?: string;
  discriminatorKey: string;
  accessBlocked: boolean;
  tags?: string[];
}

// TODO: Discriminator key and Version can't exist together, if we don't use version key it will fall back to __v
export const userOptions = {
  discriminatorKey: 'userType',
  timestamps: true,
  // versionKey: 'version',
};

const UserSchema = new Schema<User, Model<User>, User>({
    schemaVersion: {
      type: String,
      default: '1.0.0',
      required: false,
    },
    externalId: {
      type: String,
      match: Patterns.GUID_PATTERN,
      minlength: [36, 'External ID must be 36 characters long'],
      maxlength: [36, 'External ID must be 36 characters long'],
      required: true,
      index: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
      maxlength: 500,
    },
    userType: {
      type: String,
      required: false,
      maxlength: 50,
    },
    discriminatorKey: {
      type: String,
      required: true,
      default: 'userType',
    },
    accessBlocked: {
      type: Boolean,
      required: true,
      default: false
    },
    tags: {
      type: [String],
      required: false,
    }
  }, userOptions);

export const UserModel = model<User>('User', UserSchema);
