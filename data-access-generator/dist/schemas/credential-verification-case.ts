//Types and Schema for Nested Path and SubdocumentBase definitions
export const CredentialVerificationCaseOtherIssuingInstitutionType = {
  institutionName: { type: String, required: false},
addressLine1: { type: String, required: false},
city: { type: String, required: false},
stateOrProvince: { type: String, required: false},
zipOrPostalCode: { type: String, required: false},
country: { type: String, required: false},
};

export const CredentialVerificationCaseCredentialAssetsType = {
  credential: { type: String, required: false},
credentialUploadedAt: { type: Date, required: false},
credentialVersion: { type: String, required: false},
translation: { type: String, required: false},
translationUploadedAt: { type: Date, required: false},
translationVersion: { type: String, required: false},
};

export const CredentialVerificationCaseEntitySuppliedCredentialType = {
  credential: { type: String, required: false},
credentialUploadedAt: { type: Date, required: false},
credentialVersion: { type: String, required: false},
translation: { type: String, required: false},
translationUploadedAt: { type: Date, required: false},
translationVersion: { type: String, required: false},
};

export const CredentialVerificationCaseAuditType = {
  completedAt: { type: Date, required: false},
completedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
result: { type: String, required: false},
};

export const CredentialVerificationCaseAffirmationsType = {
  isNameAcceptable: { type: Boolean, required: false},
isTranslationAcceptable: { type: Boolean, required: false},
isCredentialAcceptable: { type: Boolean, required: false},
isCredentialDetailsAcceptable: { type: Boolean, required: false},
isDateOfBirthAcceptable: { type: Boolean, required: false},
isEntityAcceptable: { type: Boolean, required: false},
isCredentialSentForVerification: { type: Boolean, required: false},
audit: {type: CredentialVerificationCaseAuditType,required: false, ...NestedPathOptions,},
};

export const CredentialVerificationCaseVerificationAffirmationsType = {
  isReturnedFromCorrectEntity: { type: Boolean, required: false},
isVerificationMethodAcceptable: { type: Boolean, required: false},
isVerificationComplete: { type: Boolean, required: false},
isVerificationInEnglishOrWithTranslation: { type: Boolean, required: false},
isEntityDetailCorrect: { type: Boolean, required: false},
isCredentialReturnedFromEntity: { type: Boolean, required: false},
isVerificationStatusComplete: { type: Boolean, required: false},
isVerificationComponentPacketCompiled: { type: Boolean, required: false},
audit: {type: CredentialVerificationCaseAuditType,required: false, ...NestedPathOptions,},
};

export const CredentialVerificationCaseInstitutionContactDetailsType = {
  institutionEmail: { type: String, required: false},
institutionPhone: { type: String, required: false},
};

export const CredentialVerificationCaseAlternateVerifyingEntityType = {
  isVerifiedWithOther: { type: Boolean, required: false},
otherDetails: { type: String, required: false},
};

export const CredentialVerificationCaseVerificationStatusType = {
  verificationResponse: { type: String, required: false},
};

export const CredentialVerificationCasePrivateCaseDetailsType = {
  institutionContactDetails: {type: CredentialVerificationCaseInstitutionContactDetailsType,required: false, ...NestedPathOptions,},
alternateVerifyingEntity: {type: CredentialVerificationCaseAlternateVerifyingEntityType,required: false, ...NestedPathOptions,},
verificationStatus: {type: CredentialVerificationCaseVerificationStatusType,required: false, ...NestedPathOptions,},
entitySuppliedCredential: {type: CredentialVerificationCaseEntitySuppliedCredentialType,required: false, ...NestedPathOptions,},
};

export const CredentialVerificationCaseApplicationReviewDecisionType = {
  completedAt: { type: Date, required: false},
completedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
result: { type: String, required: false},
rejectionReason: { type: String, required: false},
};

export const CredentialVerificationCaseApplicationReviewType = {
  caseWorkerAssigned: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
affirmations: {type: CredentialVerificationCaseAffirmationsType,required: false, ...NestedPathOptions,},
verificationAffirmations: {type: CredentialVerificationCaseVerificationAffirmationsType,required: false, ...NestedPathOptions,},
privateCaseDetails: {type: CredentialVerificationCasePrivateCaseDetailsType,required: false, ...NestedPathOptions,},
decision: {type: CredentialVerificationCaseApplicationReviewDecisionType,required: false, ...NestedPathOptions,},
};

export const CredentialVerificationCaseAssetsPrivateType = {
  verificationForm: { type: String, required: false},
verificationFormHistory: { type: [CredentialVerificationCaseAssetHistorySchema], required: false }
,
verificationPacket: { type: String, required: false},
verificationPacketHistory: { type: [CredentialVerificationCaseAssetHistorySchema], required: false }
,
verificationPacketResponse: { type: String, required: false},
verificationPacketResponseHistory: { type: [CredentialVerificationCaseAssetHistorySchema], required: false }
,
verificationComponentPacket: { type: String, required: false},
verificationComponentPacketHistory: { type: [CredentialVerificationCaseAssetHistorySchema], required: false }
,
};

export const CredentialVerificationCaseAssetsType = {
  private: {type: CredentialVerificationCaseAssetsPrivateType,required: false, ...NestedPathOptions,},
};

export const CredentialVerificationCaseRequestedChangesType = {
  requestUpdatedCredentialDetails: { type: Boolean, required: false},
requestUploadCredential: { type: Boolean, required: false},
requestUploadTranslation: { type: Boolean, required: false},
requestUpdatedIssuingInstitution: { type: Boolean, required: false},
};

export const CredentialVerificationCaseRevisionRequestType = {
  requestedAt: { type: Date, required: false},
requestedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
revisionSummary: { type: String, required: false},
requestedChanges: {type: CredentialVerificationCaseRequestedChangesType,required: false, ...NestedPathOptions,},
revisionSubmittedAt: { type: Date, required: false},
};

export const CredentialVerificationCaseRevenueRecognitionSubmissionType = {
  debitGlAccount: { type: String, required: false},
creditGlAccount: { type: String, required: false},
amount: { type: Number, required: false},
recognizedAt: { type: Date, required: false},
completedAt: { type: Date, required: false},
};

export const CredentialVerificationCaseRevenueRecognitionRecognitionType = {
  debitGlAccount: { type: String, required: false},
creditGlAccount: { type: String, required: false},
amount: { type: Number, required: false},
recognizedAt: { type: Date, required: false},
completedAt: { type: Date, required: false},
};

export const CredentialVerificationCaseRevenueRecognitionType = {
  submission: {type: CredentialVerificationCaseRevenueRecognitionSubmissionType,required: false, ...NestedPathOptions,},
recognition: {type: CredentialVerificationCaseRevenueRecognitionRecognitionType,required: false, ...NestedPathOptions,},
};

export const CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigSubmissionType = {
  amount: { type: Number, required: false},
debitGlAccount: { type: String, required: false},
creditGlAccount: { type: String, required: false},
};

export const CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigRefundsType = {
  creditGlAccount: { type: String, required: false},
debitGlAccount: { type: String, required: false},
};

export const CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigRecognitionType = {
  creditGlAccount: { type: String, required: false},
debitGlAccount: { type: String, required: false},
};

export const CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigType = {
  submission: {type: CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigSubmissionType,required: false, ...NestedPathOptions,},
additionalCharges: { type: [CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigAdditionalChargeSchema], required: false }
,
refunds: {type: CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigRefundsType,required: false, ...NestedPathOptions,},
recognition: {type: CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigRecognitionType,required: false, ...NestedPathOptions,},
};

export const CredentialVerificationCaseFinanceDetailsFinanceConfigType = {
  effectiveAt: { type: Date, required: false},
glConfig: {type: CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigType,required: false, ...NestedPathOptions,},
createdAt: { type: Date, required: false},
createdBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
note: { type: String, required: false},
};

export const CredentialVerificationCaseFinanceDetailsType = {
  financeConfig: {type: CredentialVerificationCaseFinanceDetailsFinanceConfigType,required: false, ...NestedPathOptions,},
serviceFee: { type: Number, required: false},
revenueRecognition: {type: CredentialVerificationCaseRevenueRecognitionType,required: false, ...NestedPathOptions,},
transactions: {type: CredentialVerificationCaseFinanceDetailsTransactionsType,required: false, ...NestedPathOptions,},
};

export const CredentialVerificationCaseTransactionReferenceType = {
  vendor: { type: String, required: false},
referenceId: { type: String, required: false},
completedAt: { type: Date, required: false},
};

export const CredentialVerificationCaseFinanceDetailsTransactionSubmissionType = {
  amount: { type: Number, required: false},
transactionReference: {type: CredentialVerificationCaseTransactionReferenceType,required: false, ...NestedPathOptions,},
};

export const CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactionsApprovalType = {
  isApplicantApprovalRequired: { type: Boolean, required: false},
isApplicantApproved: { type: Boolean, required: false},
applicantRespondedAt: { type: Date, required: false},
};

export const CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactionsFinanceReferenceType = {
  debitGlAccount: { type: String, required: false},
creditGlAccount: { type: String, required: false},
completedAt: { type: Date, required: false},
};

export const CredentialVerificationCaseFinanceDetailsTransactionsType = {
  submission: {type: CredentialVerificationCaseFinanceDetailsTransactionSubmissionType,required: false, ...NestedPathOptions,},
adhocTransactions: { type: [CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactionsSchema], required: false }
,
};

export const CredentialVerificationCaseSearchType = {
  hash: { type: String, required: false},
indexedAt: { type: Date, required: false},
indexingFailedAt: { type: Date, required: false},
};

export const CredentialVerificationCaseApplicationType = {
  attestedAt: { type: Date, required: false},
credentialTitle: { type: String, required: false},
program: { type: String, required: false},
nameOnCredential: { type: String, required: false},
dateCredentialIssued: { type: Date, required: false},
credentialType: { type: String, required: false},
isCredentialInEnglish: { type: Boolean, required: false},
issuingInstitution: { type: Schema.Types.ObjectId, ref: Entity.EntityModel.modelName, required: false}
,
otherIssuingInstitution: {type: CredentialVerificationCaseOtherIssuingInstitutionType,required: false, ...NestedPathOptions,},
credentialAssets: {type: CredentialVerificationCaseCredentialAssetsType,required: false, ...NestedPathOptions,},
sendDestination: { type: Schema.Types.ObjectId, ref: Entity.EntityModel.modelName, required: false}
,
};

export const CredentialVerificationCaseCaseDetailsType = {
  application: {type: CredentialVerificationCaseApplicationType,required: false, ...NestedPathOptions,},
applicationReview: {type: CredentialVerificationCaseApplicationReviewType,required: false, ...NestedPathOptions,},
createdAt: { type: Date, required: false},
};



export const CredentialVerificationCaseAssetHistorySchema = new Schema<CredentialVerificationCaseAssetHistory, Model<CredentialVerificationCaseAssetHistory>, CredentialVerificationCaseAssetHistory>({
  assetVersion: { type: String, required: false},
assetUploadedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
});

export const CredentialVerificationCaseCaseHistorySchema = new Schema<CredentialVerificationCaseCaseHistory, Model<CredentialVerificationCaseCaseHistory>, CredentialVerificationCaseCaseHistory>({
  caseDetails: {type: CredentialVerificationCaseCaseDetailsType,required: false, ...NestedPathOptions,},
revisionRequest: {type: CredentialVerificationCaseRevisionRequestType,required: false, ...NestedPathOptions,},
});

export const CredentialVerificationCaseMessageSchema = new Schema<CredentialVerificationCaseMessage, Model<CredentialVerificationCaseMessage>, CredentialVerificationCaseMessage>({
  sentBy: { type: String, required: false},
initiatedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
message: { type: String, required: false},
embedding: { type: String, required: false},
isHiddenFromApplicant: { type: Boolean, required: false},
});

export const CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigAdditionalChargeSchema = new Schema<CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigAdditionalCharge, Model<CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigAdditionalCharge>, CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigAdditionalCharge>({
  type: { type: String, required: false},
debitGlAccount: { type: String, required: false},
creditGlAccount: { type: String, required: false},
});

export const CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactionsSchema = new Schema<CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactions, Model<CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactions>, CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactions>({
  amount: { type: Number, required: false},
requestedAt: { type: Date, required: false},
requestedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
reason: { type: String, required: false},
approval: {type: CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactionsApprovalType,required: false, ...NestedPathOptions,},
transactionReference: {type: CredentialVerificationCaseTransactionReferenceType,required: false, ...NestedPathOptions,},
financeReference: {type: CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactionsFinanceReferenceType,required: false, ...NestedPathOptions,},
});

export const CredentialVerificationCaseActivityLogSchema = new Schema<CredentialVerificationCaseActivityLog, Model<CredentialVerificationCaseActivityLog>, CredentialVerificationCaseActivityLog>({
  activityType: { type: String, required: false},
activityBy: { type: Schema.Types.ObjectId, ref: User.UserModel.modelName, required: false}
,
description: { type: String, required: false},
metaData: { type: String, required: false},
tags: { type: [String], required: false},
});

export const CredentialVerificationCaseCaseFlaggedSchema = new Schema<CredentialVerificationCaseCaseFlagged, Model<CredentialVerificationCaseCaseFlagged>, CredentialVerificationCaseCaseFlagged>({
  flagType: { type: String, required: false},
reason: { type: String, required: false},
});



export const CredentialVerificationCaseSchema = new Schema<CredentialVerificationCase, Model<CredentialVerificationCase>, CredentialVerificationCase>({
  caseDetails: {type: CredentialVerificationCaseCaseDetailsType,required: false, ...NestedPathOptions,},
assets: {type: CredentialVerificationCaseAssetsType,required: false, ...NestedPathOptions,},
revisionRequest: {type: CredentialVerificationCaseRevisionRequestType,required: false, ...NestedPathOptions,},
caseHistory: { type: [CredentialVerificationCaseCaseHistorySchema], required: false }
,
messages: { type: [CredentialVerificationCaseMessageSchema], required: false }
,
financeDetails: {type: CredentialVerificationCaseFinanceDetailsType,required: false, ...NestedPathOptions,},
activityLog: { type: [CredentialVerificationCaseActivityLogSchema], required: false }
,
applicant: { type: Schema.Types.ObjectId, ref: ApplicantUser.ApplicantUserModel.modelName, required: false}
,
submittedAt: { type: Date, required: false},
purgeEligibleAt: { type: Date, required: false},
expirationEligibleAt: { type: Date, required: false},
caseType: { type: String, required: false},
state: { type: String, required: false},
caseName: { type: String, required: false},
systemTags: { type: [String], required: false},
tags: { type: [String], required: false},
caseFlagged: { type: [CredentialVerificationCaseCaseFlaggedSchema], required: false }
,
search: {type: CredentialVerificationCaseSearchType,required: false, ...NestedPathOptions,},
  schemaVersion: { type: String, required: false, default: "1.0.0" },
});

export const CredentialVerificationCaseModel = model<CredentialVerificationCase>("CredentialVerificationCase", CredentialVerificationCaseSchema);
