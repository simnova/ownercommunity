import { Model, Schema } from "mongoose";
import { User, UserModel, userOptions } from "./user";
import { NestedPath, Patterns } from "../../../../../../seedwork/services-seedwork-datastore-mongodb/interfaces/base";

export interface EndUserContactInformation extends NestedPath {
  email: string;
}

export interface EndUserIdentityDetails extends NestedPath {
  lastName: string;
  legalNameConsistsOfOneName: boolean;
  restOfName?: string;
}

export interface EndUserPersonalInformation extends NestedPath {
  identityDetails: EndUserIdentityDetails;
  contactInformation: EndUserContactInformation;
}

export interface EndUser extends User {
  personalInformation: EndUserPersonalInformation;
}

export const EndUserSchema = new Schema<EndUser, Model<EndUser>, EndUser>(
  {
    personalInformation: {
      identityDetails: {
        lastName: {
          type: String,
          required: true,
          maxlength: 50,
        },
        legalNameConsistsOfOneName: {
          type: Boolean,
          required: true,
          default: false,
        },
        restOfName: {
          type: String,
          required: false,
          maxlength: 50,
        },
      },
      contactInformation: {
        email: {
          type: String,
          match: Patterns.EMAIL_PATTERN,
          maxlength: 254,
          unique: true,
          required: true,
          index: true,
        },
      },
    },
  },
  userOptions
);

export const EndUserModel = UserModel.discriminator('end-users', EndUserSchema);