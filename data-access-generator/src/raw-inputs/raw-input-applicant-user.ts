import { RawInputFromModel } from "../common";

export const rawInputApplicantUser: RawInputFromModel = {
  aggregateRootDefinition: `
export interface ApplicantUser extends User {
  termsAndConditions?: Types.DocumentArray<ApplicantUserTermsAndConditions>
  personalInformation?: ApplicantUserPersonalInformation;
  accessBlocked?: boolean;
  tags?: string[];
  search?: ApplicantUserSearch;
  displayName?: string;
  userType?: string; // Discriminator key
  discriminatorKey: string;
  schemaVersion: string;
  externalId: string;
  isProfileSubmitted?: boolean;
}`,
  complexSchemaTypeDefinitions: `export interface ApplicantUserSearch extends NestedPath {
  hash?: string;
  indexedAt?: Date;
  indexingFailedAt?: Date;
}

export interface ApplicantUserPersonalInformation extends NestedPath {
  identityDetails?: ApplicantUserIdentityDetails;
  nameOnDocumentAssets?: Types.DocumentArray<ApplicantUserNameOnDocumentAsset>;
  contactInformation?: ApplicantUserContactInformation;
  citizenship?: ApplicantUserCitizenship;
  professional?: ApplicantUserProfessional;
  applyingTo?: string[]; // Array of entity references
}

export interface ApplicantUserProfessional extends NestedPath {
  healthProfession?: string;
  citizenshipAtTimeEnteredMedicalInstitution?: string; // Extended ISO code
  primaryEducationalInformation?: Types.DocumentArray<ApplicantUserPrimaryEducationalInformation>; // Min 1, max 5
}

export interface ApplicantUserOtherIssuingInstitution extends NestedPath {
  name?: string;
  addressLine1?: string;
  city?: string;
  stateOrProvince?: string;
  zipOrPostalCode?: string;
  country?: string; // Extended ISO code
}

export interface ApplicantUserCitizenship extends NestedPath {
  currentCitizenOf?: string[]; // One or more extended ISO codes
}
export interface ApplicantUserContactInformation extends NestedPath {
  emailAddress?: string;
  primaryPhone?: string; // ObjectId
  phone?: Types.DocumentArray<ApplicantUserPhone>;
  address?: ApplicantUserAddress;
}

export interface ApplicantUserAddress extends NestedPath {
  streetAddressLine1?: string;
  streetAddressLine2?: string;
  city?: string;
  stateOrProvince?: string;
  zipOrPostalCode?: string;
  country?: string; // Extended ISO code
}
export interface ApplicantUserIdentityDetails extends NestedPath {
  lastName?: string;
  legalNameConsistsOfOneName?: boolean;
  restOfName?: string;
  generationalSuffix?: string; // Example enums
  gender?: string; // enums M,F,X
  dateOfBirth?: Date;
}
  export interface ApplicantUserTermsAndConditions extends SubdocumentBase {
  acceptanceOf?: string;
  version: number;
  attestedOn?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
  export interface ApplicantUserNameOnDocumentAsset extends SubdocumentBase {
  documentName?: string;
  uploadedAt?: Date;
  createdAt?: Date;
  isDeleteRequested?: boolean;
}
  
export interface ApplicantUserPhone extends SubdocumentBase {
  phoneNumber?: string;
  phoneType?: string; // could be an enum
  createdAt?: Date;
  updatedAt?: Date;
}
  export interface ApplicantUserPrimaryEducationalInformation extends SubdocumentBase {
  degreeTitle?: string;
  attendanceStartDate?: Date;
  attendanceEndDate?: Date;
  dateDegreeIssued?: Date;
  graduationYear?: number; // Four digit year
  issuingInstitution?: string; // Entity reference
  otherIssuingInstitution?: ApplicantUserOtherIssuingInstitution;
  createdAt?: Date;
  updatedAt?: Date;
}`,
};
