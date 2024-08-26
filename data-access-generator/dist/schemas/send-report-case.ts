//Nested Path Type definitions
export const SendReportCaseCaseDetailsApplicationType = {
  attestedAt: { type: Date, required: false},
credential: { type: Schema.Types.ObjectId, ref: CredentialVerificationCase.CredentialVerificationCaseModel.modelName, required: false}
,
destination: { type: Schema.Types.ObjectId, ref: Entity.EntityModel.modelName, required: false}
,
};

export const SendReportCaseAuditTypeType = {
  completedAt: { type: Date, required: false},
completedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
result: { type: String, required: false},
};

export const SendReportCaseCaseDetailsApplicationReviewAffirmationType = {
  isDestinationAcceptable: { type: Boolean, required: false},
isReportCompiled: { type: Boolean, required: false},
isReportSent: { type: Boolean, required: false},
audit: {type: SendReportCaseAuditTypeType,required: false, ...NestedPathOptions,},
};

export const SendReportCaseCaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetailsType = {
  institutionEmail: { type: String, required: false},
institutionPhone: { type: String, required: false},
};

export const SendReportCaseCaseDetailsApplicationReviewPrivateCaseDetailsType = {
  institutionContactDetails: {type: SendReportCaseCaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetailsType,required: false, ...NestedPathOptions,},
};

export const SendReportCaseCaseDetailsApplicationReviewDecisionType = {
  completedAt: { type: Date, required: false},
completedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
result: { type: String, required: false},
rejectionReason: { type: String, required: false},
};

export const SendReportCaseCaseDetailsApplicationReviewType = {
  caseWorkerAssigned: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
affirmations: {type: SendReportCaseCaseDetailsApplicationReviewAffirmationType,required: false, ...NestedPathOptions,},
privateCaseDetails: {type: SendReportCaseCaseDetailsApplicationReviewPrivateCaseDetailsType,required: false, ...NestedPathOptions,},
decision: {type: SendReportCaseCaseDetailsApplicationReviewDecisionType,required: false, ...NestedPathOptions,},
};

export const SendReportCaseCaseDetailsType = {
  initiatedByApplicant: { type: Boolean, required: false},
application: {type: SendReportCaseCaseDetailsApplicationType,required: false, ...NestedPathOptions,},
applicationReview: {type: SendReportCaseCaseDetailsApplicationReviewType,required: false, ...NestedPathOptions,},
createdAt: { type: Date, required: false},
};

export const SendReportCaseRevisionRequestRequestChangesType = {
  requestUpdatedDestination: { type: Boolean, required: false},
};

export const SendReportCaseRevisionRequestType = {
  requestedAt: { type: Date, required: false},
requestedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
revisionSummary: { type: String, required: false},
requestedChanges: {type: SendReportCaseRevisionRequestRequestChangesType,required: false, ...NestedPathOptions,},
revisionSubmittedAt: { type: Date, required: false},
};

export const SendReportCaseAssetPrivateType = {
  statusReportCoverLetter: { type: String, required: false},
statusReportCoverLetterHistory: { type: [SendReportCaseAssetPrivateStatusReportCoverLetterHistorySchema], required: false }
,
verificationStatusReport: { type: String, required: false},
verificationStatusReportHistory: { type: [SendReportCaseAssetPrivateVerificationStatusReportHistorySchema], required: false }
,
};

export const SendReportCaseAssetType = {
  private: {type: SendReportCaseAssetPrivateType,required: false, ...NestedPathOptions,},
};

export const SendReportCaseFinanceDetailsRevenueRecognitionSubmissionType = {
  debitGlAccount: { type: String, required: false},
creditGlAccount: { type: String, required: false},
amount: { type: Number, required: false},
recognizedAt: { type: Date, required: false},
completedAt: { type: Date, required: false},
};

export const SendReportCaseFinanceDetailsRevenueRecognitionRecognitionType = {
  debitGlAccount: { type: String, required: false},
creditGlAccount: { type: String, required: false},
amount: { type: Number, required: false},
recognizedAt: { type: Date, required: false},
completedAt: { type: Date, required: false},
};

export const SendReportCaseFinanceDetailsRevenueRecognitionType = {
  submission: {type: SendReportCaseFinanceDetailsRevenueRecognitionSubmissionType,required: false, ...NestedPathOptions,},
recognition: {type: SendReportCaseFinanceDetailsRevenueRecognitionRecognitionType,required: false, ...NestedPathOptions,},
};

export const SendReportCaseFinanceDetailsTransactionSubmissionTransactionReferenceType = {
  vendor: { type: String, required: false},
referenceId: { type: String, required: false},
completedAt: { type: Date, required: false},
};

export const SendReportCaseFinanceDetailsTransactionSubmissionType = {
  amount: { type: Number, required: false},
transactionReference: {type: SendReportCaseFinanceDetailsTransactionSubmissionTransactionReferenceType,required: false, ...NestedPathOptions,},
};

export const SendReportCaseFinanceDetailsTransactionAdhocTransactionApprovalType = {
  isApplicantApprovalRequired: { type: Boolean, required: false},
isApplicantApproved: { type: Boolean, required: false},
applicantRespondedAt: { type: Date, required: false},
};

export const SendReportCaseFinanceDetailsTransactionAdhocTransactionTransactionReferenceType = {
  vendor: { type: String, required: false},
referenceId: { type: String, required: false},
completedAt: { type: Date, required: false},
};

export const SendReportCaseFinanceDetailsTransactionAdhocTransactionFinanceReferenceType = {
  debitGlAccount: { type: String, required: false},
creditGlAccount: { type: String, required: false},
completedAt: { type: Date, required: false},
};

export const SendReportCaseFinanceDetailsTransactionsType = {
  submission: {type: SendReportCaseFinanceDetailsTransactionSubmissionType,required: false, ...NestedPathOptions,},
adhocTransactions: { type: [SendReportCaseFinanceDetailsTransactionAdhocTransactionSchema], required: false }
,
};

export const SendReportCaseFinanceDetailsType = {
  serviceFee: { type: Number, required: false},
revenueRecognition: {type: SendReportCaseFinanceDetailsRevenueRecognitionType,required: false, ...NestedPathOptions,},
transactions: {type: SendReportCaseFinanceDetailsTransactionsType,required: false, ...NestedPathOptions,},
};

export const SendReportCaseSearchType = {
  hash: { type: String, required: false},
indexedAt: { type: Date, required: false},
indexingFailedAt: { type: Date, required: false},
};



//SubdocumentBase Definitions
export const SendReportCaseCaseHistorySchema = new Schema<SendReportCaseCaseHistory, Model<SendReportCaseCaseHistory>, SendReportCaseCaseHistory>({
  caseDetails: {type: SendReportCaseCaseDetailsType,required: false, ...NestedPathOptions,},
revisionRequest: {type: SendReportCaseRevisionRequestType,required: false, ...NestedPathOptions,},
});

export const SendReportCaseAssetPrivateStatusReportCoverLetterHistorySchema = new Schema<SendReportCaseAssetPrivateStatusReportCoverLetterHistory, Model<SendReportCaseAssetPrivateStatusReportCoverLetterHistory>, SendReportCaseAssetPrivateStatusReportCoverLetterHistory>({
  assetVersion: { type: String, required: false},
assetUploadedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
});

export const SendReportCaseAssetPrivateVerificationStatusReportHistorySchema = new Schema<SendReportCaseAssetPrivateVerificationStatusReportHistory, Model<SendReportCaseAssetPrivateVerificationStatusReportHistory>, SendReportCaseAssetPrivateVerificationStatusReportHistory>({
  assetVersion: { type: String, required: false},
assetUploadedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
});

export const SendReportCaseMessageSchema = new Schema<SendReportCaseMessage, Model<SendReportCaseMessage>, SendReportCaseMessage>({
  sentBy: { type: String, required: false},
initiatedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
message: { type: String, required: false},
embedding: { type: String, required: false},
isHiddenFromApplicant: { type: Boolean, required: false},
});

export const SendReportCaseFinanceDetailsTransactionAdhocTransactionSchema = new Schema<SendReportCaseFinanceDetailsTransactionAdhocTransaction, Model<SendReportCaseFinanceDetailsTransactionAdhocTransaction>, SendReportCaseFinanceDetailsTransactionAdhocTransaction>({
  amount: { type: Number, required: false},
requestedAt: { type: Date, required: false},
requestedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false}
,
reason: { type: String, required: false},
approval: {type: SendReportCaseFinanceDetailsTransactionAdhocTransactionApprovalType,required: false, ...NestedPathOptions,},
transactionReference: {type: SendReportCaseFinanceDetailsTransactionAdhocTransactionTransactionReferenceType,required: false, ...NestedPathOptions,},
financeReference: {type: SendReportCaseFinanceDetailsTransactionAdhocTransactionFinanceReferenceType,required: false, ...NestedPathOptions,},
});

export const SendReportCaseActivityLogSchema = new Schema<SendReportCaseActivityLog, Model<SendReportCaseActivityLog>, SendReportCaseActivityLog>({
  activityType: { type: String, required: false},
activityBy: { type: Schema.Types.ObjectId, ref: User.UserModel.modelName, required: false}
,
description: { type: String, required: false},
metaData: { type: String, required: false},
tags: { type: [String], required: false},
});

export const SendReportCaseCaseFlaggedSchema = new Schema<SendReportCaseCaseFlagged, Model<SendReportCaseCaseFlagged>, SendReportCaseCaseFlagged>({
  flagType: { type: String, required: false},
reason: { type: String, required: false},
});



export const SendReportCaseSchema = new Schema<SendReportCase, Model<SendReportCase>, SendReportCase>({
  caseDetails: {type: SendReportCaseCaseDetailsType,required: false, ...NestedPathOptions,},
revisionRequest: {type: SendReportCaseRevisionRequestType,required: false, ...NestedPathOptions,},
caseHistory: { type: [SendReportCaseCaseHistorySchema], required: false }
,
assets: {type: SendReportCaseAssetType,required: false, ...NestedPathOptions,},
messages: { type: [SendReportCaseMessageSchema], required: false }
,
financeDetails: {type: SendReportCaseFinanceDetailsType,required: false, ...NestedPathOptions,},
activityLog: { type: [SendReportCaseActivityLogSchema], required: false }
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
caseFlagged: { type: [SendReportCaseCaseFlaggedSchema], required: false }
,
search: {type: SendReportCaseSearchType,required: false, ...NestedPathOptions,},
  schemaVersion: { type: String, required: false, default: "1.0.0" },
});

export const SendReportCaseModel = model<SendReportCase>("SendReportCase", SendReportCaseSchema);

// Be sure to:
// 1. Remove unnecessary fields in the model schema
// 2. Add enum constraints to fields (if any)
// 3. Fix export Model clause (last line) for model containing discriminator key