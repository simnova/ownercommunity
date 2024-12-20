import { Model, Schema } from "mongoose";
import { User, UserModel, userOptions } from "./user";
import { NestedPath, NestedPathOptions, Patterns } from "../../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base";

export interface VendorUserContactInformation extends NestedPath {
  email: string;
}

export const VendorUserContactInformationType = {
  email: { type: String, match: Patterns.EMAIL_PATTERN, maxlength: 254, required: false},
}

export interface VendorUserIdentityDetails extends NestedPath {
  lastName: string;
  legalNameConsistsOfOneName: boolean;
  restOfName?: string;
}

export const VendorUserIdentityDetailsType = {
  lastName: { type: String, required: true, maxlength: 50 },
  legalNameConsistsOfOneName: { type: Boolean, required: true, default: false },
  restOfName: { type: String, required: false, maxlength: 50 },
}

export interface VendorUserPersonalInformation extends NestedPath {
  identityDetails: VendorUserIdentityDetails;
  contactInformation: VendorUserContactInformation;
}

export const VendorUserPersonalInformationType = {
  identityDetails: { type: VendorUserIdentityDetailsType, required: true, ...NestedPathOptions },
  contactInformation: { type: VendorUserContactInformationType, required: true, ...NestedPathOptions },
};

export interface VendorUser extends User {
  personalInformation: VendorUserPersonalInformation;
  email?: string;
  displayName: string;
  externalId: string;
  userType?: string;
  accessBlocked: boolean;
  tags?: string[];
}

export const VendorUserSchema = new Schema<VendorUser, Model<VendorUser>, VendorUser>(
  {
    personalInformation: { type: VendorUserPersonalInformationType, required: true, ...NestedPathOptions },
    schemaVersion: {
      type: String,
      default: '1.0.0',
      required: false,
    },
    email: { type: String, match: Patterns.EMAIL_PATTERN, maxlength: 254, required: false },
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
).index({ 'personalInformation.contactInformation.email': 1 }, { sparse: true });

export const VendorUserModel = UserModel.discriminator('vendor-users', VendorUserSchema);