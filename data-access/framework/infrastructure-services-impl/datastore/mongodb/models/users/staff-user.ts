import { Model, ObjectId, PopulatedDoc, Schema } from "mongoose";
import * as StaffRole from "../roles/staff-role";
import { User, UserModel, userOptions } from "./user";
import { Patterns } from "../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base";

export interface StaffUser extends User {
  role?: PopulatedDoc<StaffRole.StaffRole> | ObjectId;
  firstName: string;
  lastName: string;
  email: string;

  displayName: string;
  externalId: string;
  userType?: string;
  accessBlocked: boolean;
  tags?: string[];
}

export const StaffUserSchema = new Schema<StaffUser, Model<StaffUser>, StaffUser>(
  {
    role: { type: Schema.Types.ObjectId, ref: StaffRole.StaffRoleModel.modelName, required: false },
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
      required: false,
    },
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
    accessBlocked: {
      type: Boolean,
      required: true,
      default: false
    },
    tags: {
      type: [String],
      required: false,
    }
  },
  userOptions
).index({ email: 1 }, { sparse: true });

export const StaffUserModel = UserModel.discriminator('internal-staff', StaffUserSchema);