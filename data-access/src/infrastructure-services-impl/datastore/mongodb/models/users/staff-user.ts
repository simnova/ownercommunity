import { Model, ObjectId, PopulatedDoc, Schema } from "mongoose";
import * as StaffRole from "../roles/staff-role";
import { User, UserModel, userOptions } from "./user";
import { Patterns } from "../../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base";

export interface StaffUser extends User {
  role?: PopulatedDoc<StaffRole.StaffRole> | ObjectId;
  firstName: string;
  lastName: string;
  email: string;
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
      unique: true,
      required: false,
      index: true,
    }

  },
  userOptions
).index({ email: 1 }, { unique: true });

export const StaffUserModel = UserModel.discriminator('internal-staff', StaffUserSchema);