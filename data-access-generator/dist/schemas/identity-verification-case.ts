//Types and Schema for Nested Path and SubdocumentBase definitions
export const IdentityVerificationCaseCaseDetailsApplicationPhotoAssetsType = {
  photo: { type: String, required: false},
photoUploadedAt: { type: Date, required: false},
photoVersion: { type: String, required: false},
};

export const IdentityVerificationCaseCaseDetailsApplicationPassportDetailsType = {
  passportCountry: { type: String, required: false},
passportNumber: { type: String, required: false},
passportIssuedAt: { type: Date, required: false},
passportExpiresAt: { type: Date, required: false},
isPassportExpirationDateVisible: { type: Boolean, required: false},
isPassportInLatinCharacters: { type: Boolean, required: false},
};

export const IdentityVerificationCaseCaseDetailsApplicationPassportAssetsType = {
  passport: { type: String, required: false},
passportUploadedAt: { type: Date, required: false},
passportVersion: { type: String, required: false},
passportExpiration: { type: String, required: false},
passportExpirationUploadedAt: { type: Date, required: false},
passportExpirationVersion: { type: String, required: false},
passportTranslation: { type: String, required: false},
passportTranslationUploadedAt: { type: Date, required: false},
passportTranslationVersion: { type: String, required: false},
};

export const IdentityVerificationCaseCaseDetailsApplicationNotarizationDetailsType = {
  isNotarizationComplete: { type: Boolean, required: false},
};

export const IdentityVerificationCaseCaseDetailsApplicationType = {
  attestedAt: { type: Date, required: false},
photoAssets: {type: IdentityVerificationCaseCaseDetailsApplicationPhotoAssetsType,required: false, ...NestedPathOptions,},
caseWorkerModifiedPassportDetails: { type: Boolean, required: false},
passportDetails: {type: IdentityVerificationCaseCaseDetailsApplicationPassportDetailsType,required: false, ...NestedPathOptions,},
passportAssets: {type: IdentityVerificationCaseCaseDetailsApplicationPassportAssetsType,required: false, ...NestedPathOptions,},
notarizationDetails: {type: IdentityVerificationCaseCaseDetailsApplicationNotarizationDetailsType,required: false, ...NestedPathOptions,},
};

export const IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmationsAuditType = {
  completedAt: { type: Date, required: false},
completedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
result: { type: String, required: false},
};

export const IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmationsType = {
  isNotaryAcceptable: { type: Boolean, required: false},
isNotarizedIdAcceptable: { type: Boolean, required: false},
audit: {type: IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmationsAuditType,required: false, ...NestedPathOptions,},
};

export const IdentityVerificationCaseCaseDetailsApplicationReviewAffirmationsAuditType = {
  completedAt: { type: Date, required: false},
completedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
result: { type: String, required: false},
};

export const IdentityVerificationCaseCaseDetailsApplicationReviewAffirmationsType = {
  isIdDocumentAcceptable: { type: Boolean, required: false},
isIdDocumentDetailsAcceptable: { type: Boolean, required: false},
isPhotoAcceptable: { type: Boolean, required: false},
audit: {type: IdentityVerificationCaseCaseDetailsApplicationReviewAffirmationsAuditType,required: false, ...NestedPathOptions,},
};

export const IdentityVerificationCaseCaseDetailsApplicationReviewDecisionType = {
  completedAt: { type: Date, required: false},
completedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
result: { type: String, required: false},
rejectionReason: { type: String, required: false},
};

export const IdentityVerificationCaseCaseDetailsApplicationReviewType = {
  caseWorkerAssigned: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
affirmations: {type: IdentityVerificationCaseCaseDetailsApplicationReviewAffirmationsType,required: false, ...NestedPathOptions,},
notaryAffirmations: {type: IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmationsType,required: false, ...NestedPathOptions,},
decision: {type: IdentityVerificationCaseCaseDetailsApplicationReviewDecisionType,required: false, ...NestedPathOptions,},
};

export const IdentityVerificationCaseCaseDetailsType = {
  application: {type: IdentityVerificationCaseCaseDetailsApplicationType,required: false, ...NestedPathOptions,},
applicationReview: {type: IdentityVerificationCaseCaseDetailsApplicationReviewType,required: false, ...NestedPathOptions,},
createdAt: { type: Date, required: false},
};

export const IdentityVerificationCaseRevisionRequestRequestedChangesType = {
  requestUpdatedPassportDetails: { type: Boolean, required: false},
requestUploadPassport: { type: Boolean, required: false},
requestUploadExpirationPage: { type: Boolean, required: false},
requestUploadPassportTranslation: { type: Boolean, required: false},
requestUploadPhoto: { type: Boolean, required: false},
};

export const IdentityVerificationCaseRevisionRequestType = {
  requestedAt: { type: Date, required: false},
requestedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
revisionSummary: { type: String, required: false},
requestedChanges: {type: IdentityVerificationCaseRevisionRequestRequestedChangesType,required: false, ...NestedPathOptions,},
revisionSubmittedAt: { type: Date, required: false},
};

export const IdentityVerificationCaseAssetsPrivateType = {
  redactedNotarizedIdForm: { type: String, required: false},
redactedNotarizedIdFormHistory: { type: [IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistorySchema], required: false }
,
};

export const IdentityVerificationCaseAssetsSharedType = {
  idForm: { type: String, required: false},
idFormHistory: { type: [IdentityVerificationCaseAssetsSharedIdFormHistorySchema], required: false }
,
notarizedIdForm: { type: String, required: false},
notarizedIdFormHistory: { type: [IdentityVerificationCaseAssetsSharedNotarizedIdFormHistorySchema], required: false }
,
};

export const IdentityVerificationCaseAssetsType = {
  shared: {type: IdentityVerificationCaseAssetsSharedType,required: false, ...NestedPathOptions,},
private: {type: IdentityVerificationCaseAssetsPrivateType,required: false, ...NestedPathOptions,},
};

export const IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionFinanceReferenceType = {
  debitGlAccount: { type: String, required: false},
creditGlAccount: { type: String, required: false},
completedAt: { type: Date, required: false},
};

export const IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionTransactionReferenceType = {
  vendor: { type: String, required: false},
referenceId: { type: String, required: false},
completedAt: { type: Date, required: false},
};

export const IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionApprovalType = {
  isApplicantApprovalRequired: { type: Boolean, required: false},
isApplicantApproved: { type: Boolean, required: false},
applicantRespondedAt: { type: Date, required: false},
};

export const IdentityVerificationCaseFinanceDetailsTransactionsSubmissionTransactionReferenceType = {
  vendor: { type: String, required: false},
referenceId: { type: String, required: false},
completedAt: { type: Date, required: false},
};

export const IdentityVerificationCaseFinanceDetailsTransactionsSubmissionType = {
  amount: { type: Number, required: false},
transactionReference: {type: IdentityVerificationCaseFinanceDetailsTransactionsSubmissionTransactionReferenceType,required: false, ...NestedPathOptions,},
};

export const IdentityVerificationCaseFinanceDetailsTransactionsType = {
  submission: {type: IdentityVerificationCaseFinanceDetailsTransactionsSubmissionType,required: false, ...NestedPathOptions,},
adhocTransactions: { type: [IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionSchema], required: false }
,
};

export const IdentityVerificationCaseFinanceDetailsRevenueRecognitionSubmissionType = {
  debitGlAccount: { type: String, required: false},
creditGlAccount: { type: String, required: false},
amount: { type: Number, required: false},
recognizedAt: { type: Date, required: false},
completedAt: { type: Date, required: false},
};

export const IdentityVerificationCaseFinanceDetailsRevenueRecognitionRecognitionType = {
  debitGlAccount: { type: String, required: false},
creditGlAccount: { type: String, required: false},
amount: { type: Number, required: false},
recognizedAt: { type: Date, required: false},
completedAt: { type: Date, required: false},
};

export const IdentityVerificationCaseFinanceDetailsRevenueRecognitionType = {
  submission: {type: IdentityVerificationCaseFinanceDetailsRevenueRecognitionSubmissionType,required: false, ...NestedPathOptions,},
recognition: {type: IdentityVerificationCaseFinanceDetailsRevenueRecognitionRecognitionType,required: false, ...NestedPathOptions,},
};

export const IdentityVerificationCaseFinanceDetailsType = {
  serviceFee: { type: Number, required: false},
revenueRecognition: {type: IdentityVerificationCaseFinanceDetailsRevenueRecognitionType,required: false, ...NestedPathOptions,},
transactions: {type: IdentityVerificationCaseFinanceDetailsTransactionsType,required: false, ...NestedPathOptions,},
};

export const IdentityVerificationCaseSearchType = {
  hash: { type: String, required: false},
indexedAt: { type: Date, required: false},
indexingFailedAt: { type: Date, required: false},
};



export const IdentityVerificationCaseCaseHistorySchema = new Schema<IdentityVerificationCaseCaseHistory, Model<IdentityVerificationCaseCaseHistory>, IdentityVerificationCaseCaseHistory>({
  caseDetails: {type: IdentityVerificationCaseCaseDetailsType,required: false, ...NestedPathOptions,},
revisionRequest: {type: IdentityVerificationCaseRevisionRequestType,required: false, ...NestedPathOptions,},
});

export const IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistorySchema = new Schema<IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistory, Model<IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistory>, IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistory>({
  assetVersion: { type: String, required: false},
assetUploadedBy: { type: Schema.Types.ObjectId, ref: User.UserModel.modelName, required: false}
,
});

export const IdentityVerificationCaseAssetsSharedNotarizedIdFormHistorySchema = new Schema<IdentityVerificationCaseAssetsSharedNotarizedIdFormHistory, Model<IdentityVerificationCaseAssetsSharedNotarizedIdFormHistory>, IdentityVerificationCaseAssetsSharedNotarizedIdFormHistory>({
  assetVersion: { type: String, required: false},
assetUploadedBy: { type: Schema.Types.ObjectId, ref: User.UserModel.modelName, required: false}
,
});

export const IdentityVerificationCaseAssetsSharedIdFormHistorySchema = new Schema<IdentityVerificationCaseAssetsSharedIdFormHistory, Model<IdentityVerificationCaseAssetsSharedIdFormHistory>, IdentityVerificationCaseAssetsSharedIdFormHistory>({
  assetVersion: { type: String, required: false},
assetUploadedBy: { type: Schema.Types.ObjectId, ref: User.UserModel.modelName, required: false}
,
});

export const IdentityVerificationCaseMessageSchema = new Schema<IdentityVerificationCaseMessage, Model<IdentityVerificationCaseMessage>, IdentityVerificationCaseMessage>({
  sentBy: { type: String, required: false},
initiatedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
message: { type: String, required: false},
embedding: { type: String, required: false},
isHiddenFromApplicant: { type: Boolean, required: false},
});

export const IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionSchema = new Schema<IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransaction, Model<IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransaction>, IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransaction>({
  amount: { type: Number, required: false},
requestedAt: { type: Date, required: false},
requestedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
reason: { type: String, required: false},
approval: {type: IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionApprovalType,required: false, ...NestedPathOptions,},
transactionReference: {type: IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionTransactionReferenceType,required: false, ...NestedPathOptions,},
financeReference: {type: IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionFinanceReferenceType,required: false, ...NestedPathOptions,},
});

export const IdentityVerificationCaseActivityLogSchema = new Schema<IdentityVerificationCaseActivityLog, Model<IdentityVerificationCaseActivityLog>, IdentityVerificationCaseActivityLog>({
  activityType: { type: String, required: false},
activityBy: { type: Schema.Types.ObjectId, ref: User.UserModel.modelName, required: false}
,
description: { type: String, required: false},
metaData: { type: String, required: false},
tags: { type: [String], required: false},
});

export const IdentityVerificationCaseCaseFlaggedSchema = new Schema<IdentityVerificationCaseCaseFlagged, Model<IdentityVerificationCaseCaseFlagged>, IdentityVerificationCaseCaseFlagged>({
  flagType: { type: String, required: false},
reason: { type: String, required: false},
});



export const IdentityVerificationCaseSchema = new Schema<IdentityVerificationCase, Model<IdentityVerificationCase>, IdentityVerificationCase>({
  caseDetails: {type: IdentityVerificationCaseCaseDetailsType,required: false, ...NestedPathOptions,},
revisionRequest: {type: IdentityVerificationCaseRevisionRequestType,required: false, ...NestedPathOptions,},
caseHistory: { type: [IdentityVerificationCaseCaseHistorySchema], required: false }
,
assets: {type: IdentityVerificationCaseAssetsType,required: false, ...NestedPathOptions,},
messages: { type: [IdentityVerificationCaseMessageSchema], required: false }
,
financeDetails: {type: IdentityVerificationCaseFinanceDetailsType,required: false, ...NestedPathOptions,},
activityLog: { type: [IdentityVerificationCaseActivityLogSchema], required: false }
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
caseFlagged: { type: [IdentityVerificationCaseCaseFlaggedSchema], required: false }
,
search: {type: IdentityVerificationCaseSearchType,required: false, ...NestedPathOptions,},
  schemaVersion: { type: String, required: false, default: "1.0.0" },
});

export const IdentityVerificationCaseModel = model<IdentityVerificationCase>("IdentityVerificationCase", IdentityVerificationCaseSchema);
