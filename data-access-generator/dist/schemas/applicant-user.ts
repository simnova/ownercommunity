//Types and Schema for Nested Path and SubdocumentBase definitions
export const ApplicantUserSearchType = {
  hash: { type: String, required: false},
indexedAt: { type: Date, required: false},
indexingFailedAt: { type: Date, required: false},
};

export const ApplicantUserPersonalInformationType = {
  identityDetails: {type: ApplicantUserIdentityDetailsType,required: false, ...NestedPathOptions,},
nameOnDocumentAssets: { type: [ApplicantUserNameOnDocumentAssetSchema], required: false }
,
contactInformation: {type: ApplicantUserContactInformationType,required: false, ...NestedPathOptions,},
citizenship: {type: ApplicantUserCitizenshipType,required: false, ...NestedPathOptions,},
professional: {type: ApplicantUserProfessionalType,required: false, ...NestedPathOptions,},
applyingTo: { type: [String], required: false},
};

export const ApplicantUserProfessionalType = {
  healthProfession: { type: String, required: false},
citizenshipAtTimeEnteredMedicalInstitution: { type: String, required: false},
primaryEducationalInformation: { type: [ApplicantUserPrimaryEducationalInformationSchema], required: false }
,
};

export const ApplicantUserOtherIssuingInstitutionType = {
  name: { type: String, required: false},
addressLine1: { type: String, required: false},
city: { type: String, required: false},
stateOrProvince: { type: String, required: false},
zipOrPostalCode: { type: String, required: false},
country: { type: String, required: false},
};

export const ApplicantUserCitizenshipType = {
  currentCitizenOf: { type: [String], required: false},
};

export const ApplicantUserContactInformationType = {
  emailAddress: { type: String, required: false},
primaryPhone: { type: String, required: false},
phone: { type: [ApplicantUserPhoneSchema], required: false }
,
address: {type: ApplicantUserAddressType,required: false, ...NestedPathOptions,},
};

export const ApplicantUserAddressType = {
  streetAddressLine1: { type: String, required: false},
streetAddressLine2: { type: String, required: false},
city: { type: String, required: false},
stateOrProvince: { type: String, required: false},
zipOrPostalCode: { type: String, required: false},
country: { type: String, required: false},
};

export const ApplicantUserIdentityDetailsType = {
  lastName: { type: String, required: false},
legalNameConsistsOfOneName: { type: Boolean, required: false},
restOfName: { type: String, required: false},
generationalSuffix: { type: String, required: false},
gender: { type: String, required: false},
dateOfBirth: { type: Date, required: false},
};



export const ApplicantUserTermsAndConditionsSchema = new Schema<ApplicantUserTermsAndConditions, Model<ApplicantUserTermsAndConditions>, ApplicantUserTermsAndConditions>({
  acceptanceOf: { type: String, required: false},
version: { type: Number, required: false},
attestedOn: { type: Date, required: false},
});

export const ApplicantUserNameOnDocumentAssetSchema = new Schema<ApplicantUserNameOnDocumentAsset, Model<ApplicantUserNameOnDocumentAsset>, ApplicantUserNameOnDocumentAsset>({
  documentName: { type: String, required: false},
uploadedAt: { type: Date, required: false},
isDeleteRequested: { type: Boolean, required: false},
});

export const ApplicantUserPhoneSchema = new Schema<ApplicantUserPhone, Model<ApplicantUserPhone>, ApplicantUserPhone>({
  phoneNumber: { type: String, required: false},
phoneType: { type: String, required: false},
});

export const ApplicantUserPrimaryEducationalInformationSchema = new Schema<ApplicantUserPrimaryEducationalInformation, Model<ApplicantUserPrimaryEducationalInformation>, ApplicantUserPrimaryEducationalInformation>({
  degreeTitle: { type: String, required: false},
attendanceStartDate: { type: Date, required: false},
attendanceEndDate: { type: Date, required: false},
dateDegreeIssued: { type: Date, required: false},
graduationYear: { type: Number, required: false},
issuingInstitution: { type: String, required: false},
otherIssuingInstitution: {type: ApplicantUserOtherIssuingInstitutionType,required: false, ...NestedPathOptions,},
});



export const ApplicantUserSchema = new Schema<ApplicantUser, Model<ApplicantUser>, ApplicantUser>({
  termsAndConditions: { type: [ApplicantUserTermsAndConditionSchema], required: false }
,
personalInformation: {type: ApplicantUserPersonalInformationType,required: false, ...NestedPathOptions,},
accessBlocked: { type: Boolean, required: false},
tags: { type: [String], required: false},
search: {type: ApplicantUserSearchType,required: false, ...NestedPathOptions,},
displayName: { type: String, required: false},
userType: { type: String, required: false},
externalId: { type: String, required: false},
isProfileSubmitted: { type: Boolean, required: false},
payment: {type: ApplicantUserPaymentType,required: false, ...NestedPathOptions,},
  schemaVersion: { type: String, required: false, default: "1.0.0" },
});

export const ApplicantUserModel = model<ApplicantUser>("ApplicantUser", ApplicantUserSchema);
