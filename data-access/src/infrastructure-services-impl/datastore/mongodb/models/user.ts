import { Schema, model, Model } from 'mongoose';
import { Base, Patterns } from '../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base';


export interface User extends Base {
  externalId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const UserModel = model<User>('User', new Schema<User, Model<User>, User>(
  {
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
    firstName: {
      type: String,
      required: false,
      maxlength: 500,
    },
    lastName: {
      type: String,
      required: false,
      maxlength: 500,
    },
    email: {
      type: String,
      match: Patterns.EMAIL_PATTERN,
      maxlength: 254,
      unique: true,
      required: false,
      index: true,
    }
  },
  {
    timestamps: true, 
    versionKey: 'version',
  }
));