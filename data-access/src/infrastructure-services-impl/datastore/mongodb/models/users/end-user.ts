import { Model, Schema } from "mongoose";
import { User, UserModel, userOptions } from "./user";
import { NestedPath, NestedPathOptions, Patterns } from "../../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base";

export interface EndUserContactInformation extends NestedPath {
  email: string;
}

export const EndUserContactInformationType = {
  email: { type: String, match: Patterns.EMAIL_PATTERN, maxlength: 254, unique: true, required: true, index: true },
}

export interface EndUserIdentityDetails extends NestedPath {
  lastName: string;
  legalNameConsistsOfOneName: boolean;
  restOfName?: string;
}

export const EndUserIdentityDetailsType = {
  lastName: { type: String, required: true, maxlength: 50 },
  legalNameConsistsOfOneName: { type: Boolean, required: true, default: false },
  restOfName: { type: String, required: false, maxlength: 50 },
}

export interface EndUserPersonalInformation extends NestedPath {
  identityDetails: EndUserIdentityDetails;
  contactInformation: EndUserContactInformation;
}

export const EndUserPersonalInformationType = {
  identityDetails: { type: EndUserIdentityDetailsType, required: true, ...NestedPathOptions },
  contactInformation: { type: EndUserContactInformationType, required: true, ...NestedPathOptions },
};

export interface EndUser extends User {
  personalInformation: EndUserPersonalInformation;
}

export const EndUserSchema = new Schema<EndUser, Model<EndUser>, EndUser>(
  {
    personalInformation: { type: EndUserPersonalInformationType, required: true, ...NestedPathOptions },
  },
  userOptions
).index({ "personalInformation.contactInformation.email": 1 }, { unique: true });

export const EndUserModel = UserModel.discriminator('end-users', EndUserSchema);