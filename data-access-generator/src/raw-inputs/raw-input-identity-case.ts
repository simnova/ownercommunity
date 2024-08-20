import { RawInputFromModel } from "../common";

export const rawInputIdentityCase: RawInputFromModel = {
  version: "1",
  aggregateRootDefinition: `
export interface IdentityVerificationCase extends Case {
  caseDetails?: IdentityVerificationCaseCaseDetails;
  revisionRequest?: IdentityVerificationCaseRevisionRequest;
  caseHistory?: Types.DocumentArray<IdentityVerificationCaseCaseHistory>;
  assets?: IdentityVerificationCaseAssets;
  messages?: Types.DocumentArray<IdentityVerificationCaseMessage>;
  financeDetails?: IdentityVerificationCaseFinanceDetails;
  activityLog?: Types.DocumentArray<IdentityVerificationCaseActivityLog>;

  applicant: PopulatedDoc<ApplicantUser.ApplicantUser>;
  submittedAt?: Date;
  purgeEligibleAt?: Date;
  expirationEligibleAt?: Date;

  caseType?: string;
  discriminatorKey: string;
  state: string;

  caseName: string;
  systemTags?: string[];
  tags?: string[];
  caseFlagged?: Types.DocumentArray<IdentityVerificationCaseCaseFlagged>;
  search?: IdentityVerificationCaseSearch;
}
`, 
  complexSchemaTypeDefinitions: `export interface IdentityVerificationCaseCaseDetailsApplicationPhotoAssets extends NestedPath {
  photo?: string;
  photoUploadedAt?: Date;
  photoVersion?: string;
}

export const IdentityVerificationCaseCaseDetailsApplicationPhotoAssetsType = {
  photo: { type: String, required: false },
  photoUploadedAt: { type: Date, required: false },
  photoVersion: { type: String, required: false },
}

export interface IdentityVerificationCaseCaseDetailsApplicationPassportDetails extends NestedPath {
  passportCountry: string;
  passportNumber: string;
  passportIssuedAt: Date;
  passportExpiresAt: Date;
  isPassportExpirationDateVisible: boolean;
  isPassportInLatinCharacters: boolean;
}

export const IdentityVerificationCaseCaseDetailsApplicationPassportDetailsType = {
  passportCountry: { type: String, required: true, minLength: 2, maxLength: 2 },
  passportNumber: { type: String, required: true, maxLength: 9, pattern: '^[A-Z0-9]+$' }, 
  passportIssuedAt: { type: Date, required: true },
  passportExpiresAt: { type: Date, required: true },
  isPassportExpirationDateVisible: { type: Boolean, required: true },
  isPassportInLatinCharacters: { type: Boolean, required: true },
}

export interface IdentityVerificationCaseCaseDetailsApplicationPassportAssets extends NestedPath {
  passport?: string;
  passportUploadedAt?: Date;
  passportVersion?: string;
  passportExpiration?: string;
  passportExpirationUploadedAt?: Date;
  passportExpirationVersion?: string;
  passportTranslation?: string;
  passportTranslationUploadedAt?: Date;
  passportTranslationVersion?: string;
}

export const IdentityVerificationCaseCaseDetailsApplicationPassportAssetsType = {
  passport: { type: String, required: false },
  passportUploadedAt: { type: Date, required: false },
  passportVersion: { type: String, required: false },
  passportExpiration: { type: String, required: false },
  passportExpirationUploadedAt: { type: Date, required: false },
  passportExpirationVersion: { type: String, required: false },
  passportTranslation: { type: String, required: false },
  passportTranslationUploadedAt: { type: Date, required: false },
  passportTranslationVersion: { type: String, required: false },
}

export interface IdentityVerificationCaseCaseDetailsApplicationNotarizationDetails extends NestedPath {
  isNotarizationComplete?: boolean;
}

export const IdentityVerificationCaseCaseDetailsApplicationNotarizationDetailsType = {
  isNotarizationComplete: { type: Boolean, required: false },
}

export interface IdentityVerificationCaseCaseDetailsApplication extends NestedPath {
  attestedAt?: Date;
  photoAssets?: IdentityVerificationCaseCaseDetailsApplicationPhotoAssets;
  caseWorkerModifiedPassportDetails?: boolean;
  passportDetails?: IdentityVerificationCaseCaseDetailsApplicationPassportDetails;
  passportAssets?: IdentityVerificationCaseCaseDetailsApplicationPassportAssets;
  notarizationDetails?: IdentityVerificationCaseCaseDetailsApplicationNotarizationDetails;
}

export const IdentityVerificationCaseCaseDetailsApplicationType = {
  attestedAt: { type: Date, required: false },
  photoAssets: { type: IdentityVerificationCaseCaseDetailsApplicationPhotoAssetsType, required: false, ...NestedPathOptions },
  caseWorkerModifiedPassportDetails: { type: Boolean, required: false },
  passportDetails: { type: IdentityVerificationCaseCaseDetailsApplicationPassportDetailsType, required: false, ...NestedPathOptions },
  passportAssets: { type: IdentityVerificationCaseCaseDetailsApplicationPassportAssetsType, required: false, ...NestedPathOptions },
  notarizationDetails: { type: IdentityVerificationCaseCaseDetailsApplicationNotarizationDetailsType, required: false, ...NestedPathOptions },
}

export interface IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmationsAudit extends NestedPath {
  completedAt: Date;
  completedBy: PopulatedDoc<StaffUser.StaffUser>;
  result: string;
}

export const IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmationsAuditType = {
  completedAt: { type: Date, required: true },
  completedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: true },
  result: { type: String, required: true, enum: ['pass', 'fail'] },
}

export interface IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmations extends NestedPath {
  isNotaryAcceptable?: boolean;
  isNotarizedIdAcceptable?: boolean;
  audit?: IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmationsAudit;
}

export const IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmationsType = {
  isNotaryAcceptable: { type: Boolean, required: false },
  isNotarizedIdAcceptable: { type: Boolean, required: false },
  audit: { type: IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmationsAuditType, required: false, ...NestedPathOptions },
}

export interface IdentityVerificationCaseCaseDetailsApplicationReviewAffirmationsAudit extends NestedPath {
  completedAt: Date;
  completedBy: PopulatedDoc<StaffUser.StaffUser>;
  result: string;
}

export const IdentityVerificationCaseCaseDetailsApplicationReviewAffirmationsAuditType = {
  completedAt: { type: Date, required: true },
  completedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: true },
  result: { type: String, required: true, enum: ['pass', 'fail'] },
}

export interface IdentityVerificationCaseCaseDetailsApplicationReviewAffirmations extends NestedPath {
  isIdDocumentAcceptable?: boolean;
  isIdDocumentDetailsAcceptable?: boolean;
  isPhotoAcceptable?: boolean;
  audit?: IdentityVerificationCaseCaseDetailsApplicationReviewAffirmationsAudit;
}

export const IdentityVerificationCaseCaseDetailsApplicationReviewAffirmationsType = {
  isIdDocumentAcceptable: { type: Boolean, required: false },
  isIdDocumentDetailsAcceptable: { type: Boolean, required: false },
  isPhotoAcceptable: { type: Boolean, required: false },
  audit: { type: IdentityVerificationCaseCaseDetailsApplicationReviewAffirmationsAuditType, required: false, ...NestedPathOptions },
}

export interface IdentityVerificationCaseCaseDetailsApplicationReviewDecision extends NestedPath {
  completedAt: Date;
  completedBy: PopulatedDoc<StaffUser.StaffUser>;
  result: string;
  rejectionReason?: string;
}

export const IdentityVerificationCaseCaseDetailsApplicationReviewDecisionType = {
  completedAt: { type: Date, required: true },
  completedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: true },
  result: { type: String, required: true, enum: ['completed', 'rejected'] },
  rejectionReason: { type: String, required: false },
}

export interface IdentityVerificationCaseCaseDetailsApplicationReview extends NestedPath {
  caseWorkerAssigned?: PopulatedDoc<StaffUser.StaffUser>;
  affirmations?: IdentityVerificationCaseCaseDetailsApplicationReviewAffirmations;
  notaryAffirmations?: IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmations;
  decision?: IdentityVerificationCaseCaseDetailsApplicationReviewDecision;
}

export const IdentityVerificationCaseCaseDetailsApplicationReviewType = {
  caseWorkerAssigned: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false },
  affirmations: { type: IdentityVerificationCaseCaseDetailsApplicationReviewAffirmationsType, required: false, ...NestedPathOptions },
  notaryAffirmations: { type: IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmationsType, required: false, ...NestedPathOptions },
  decision: { type: IdentityVerificationCaseCaseDetailsApplicationReviewDecisionType, required: false, ...NestedPathOptions },
}

export interface IdentityVerificationCaseCaseDetails extends NestedPath {
  application?: IdentityVerificationCaseCaseDetailsApplication;
  applicationReview?: IdentityVerificationCaseCaseDetailsApplicationReview;
  createdAt: Date;
}

export const IdentityVerificationCaseCaseDetailsType = {
  application: { type: IdentityVerificationCaseCaseDetailsApplicationType, required: false, ...NestedPathOptions },
  applicationReview: { type: IdentityVerificationCaseCaseDetailsApplicationReviewType, required: false, ...NestedPathOptions },
  createdAt: { type: Date, required: true },
}

export interface IdentityVerificationCaseRevisionRequestRequestedChanges extends NestedPath {
  requestUpdatedPassportDetails: boolean;
  requestUploadPassport: boolean;
  requestUploadExpirationPage: boolean;
  requestUploadPassportTranslation: boolean;
  requestUploadPhoto: boolean;
}

export const IdentityVerificationCaseRevisionRequestRequestedChangesType = {
  requestUpdatedPassportDetails: { type: Boolean, required: true },
  requestUploadPassport: { type: Boolean, required: true },
  requestUploadExpirationPage: { type: Boolean, required: true },
  requestUploadPassportTranslation: { type: Boolean, required: true },
  requestUploadPhoto: { type: Boolean, required: true },
}

export interface IdentityVerificationCaseRevisionRequest extends NestedPath {
  requestedAt: Date;
  requestedBy: PopulatedDoc<StaffUser.StaffUser>;
  revisionSummary: string;
  requestedChanges: IdentityVerificationCaseRevisionRequestRequestedChanges;
  revisionSubmittedAt?: Date;
}

export const IdentityVerificationCaseRevisionRequestType = {
  requestedAt: { type: Date, required: true },
  requestedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: true },
  revisionSummary: { type: String, required: true },
  requestedChanges: { type: IdentityVerificationCaseRevisionRequestRequestedChangesType, required: true, ...NestedPathOptions },
  revisionSubmittedAt: { type: Date, required: false },
}

export interface IdentityVerificationCaseCaseHistory extends SubdocumentBase {
  caseDetails: IdentityVerificationCaseCaseDetails;
  revisionRequest?: IdentityVerificationCaseRevisionRequest;
}

export const IdentityVerificationCaseCaseHistorySchema = new Schema<IdentityVerificationCaseCaseHistory, Model<IdentityVerificationCaseCaseHistory>, IdentityVerificationCaseCaseHistory>(
  {
    caseDetails: { type: IdentityVerificationCaseCaseDetailsType, required: true, ...NestedPathOptions },
    revisionRequest: { type: IdentityVerificationCaseRevisionRequestType, required: false, ...NestedPathOptions },
  }, 
  { timestamps: true }
);

export interface IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistory extends SubdocumentBase {
  assetVersion: string;
  assetUploadedBy: PopulatedDoc<User.User>;
}

export const IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistorySchema = new Schema<IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistory, Model<IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistory>, IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistory>(
  {
    assetVersion: { type: String, required: true },
    assetUploadedBy: { type: Schema.Types.ObjectId, ref: User.UserModel.modelName, required: true },
  }, 
  { timestamps: true }
)

export interface IdentityVerificationCaseAssetsPrivate extends NestedPath {
  redactedNotarizedIdForm?: string;
  redactedNotarizedIdFormHistory?: Types.DocumentArray<IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistory>;
}

export const IdentityVerificationCaseAssetsPrivateType = {
  redactedNotarizedIdForm: { type: String, required: false },
  redactedNotarizedIdFormHistory: { type: [IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistorySchema], required: false },
}

export interface IdentityVerificationCaseAssetsSharedNotarizedIdFormHistory extends SubdocumentBase {
  assetVersion: string;
  assetUploadedBy: PopulatedDoc<User.User>;
}

export const IdentityVerificationCaseAssetsSharedNotarizedIdFormHistorySchema = new Schema<IdentityVerificationCaseAssetsSharedNotarizedIdFormHistory, Model<IdentityVerificationCaseAssetsSharedNotarizedIdFormHistory>, IdentityVerificationCaseAssetsSharedNotarizedIdFormHistory>(
  {
    assetVersion: { type: String, required: true },
    assetUploadedBy: { type: Schema.Types.ObjectId, ref: User.UserModel.modelName, required: true },
  }, 
  { timestamps: true }
)

export interface IdentityVerificationCaseAssetsSharedIdFormHistory extends SubdocumentBase {
  assetVersion: string;
  assetUploadedBy: PopulatedDoc<User.User>;
}

export const IdentityVerificationCaseAssetsSharedIdFormHistorySchema = new Schema<IdentityVerificationCaseAssetsSharedIdFormHistory, Model<IdentityVerificationCaseAssetsSharedIdFormHistory>, IdentityVerificationCaseAssetsSharedIdFormHistory>(
  {
    assetVersion: { type: String, required: true },
    assetUploadedBy: { type: Schema.Types.ObjectId, ref: User.UserModel.modelName, required: true },
  }, 
  { timestamps: true }
)

export interface IdentityVerificationCaseAssetsShared extends NestedPath {
  idForm?: string;
  idFormHistory?: Types.DocumentArray<IdentityVerificationCaseAssetsSharedIdFormHistory>;
  notarizedIdForm?: string;
  notarizedIdFormHistory?: Types.DocumentArray<IdentityVerificationCaseAssetsSharedNotarizedIdFormHistory>;
}

export const IdentityVerificationCaseAssetsSharedType = {
  idForm: { type: String, required: false },
  idFormHistory: { type: [IdentityVerificationCaseAssetsSharedIdFormHistorySchema], required: false },
  notarizedIdForm: { type: String, required: false },
  notarizedIdFormHistory: { type: [IdentityVerificationCaseAssetsSharedNotarizedIdFormHistorySchema], required: false },
}

export interface IdentityVerificationCaseAssets extends NestedPath {
  shared?: IdentityVerificationCaseAssetsShared;
  private?: IdentityVerificationCaseAssetsPrivate;

}

export const IdentityVerificationCaseAssetsType = {
  shared: { type: IdentityVerificationCaseAssetsSharedType, required: false, ...NestedPathOptions },
  private: { type: IdentityVerificationCaseAssetsPrivateType, required: false, ...NestedPathOptions },
}

export interface IdentityVerificationCaseMessage extends SubdocumentBase {
  sentBy: string;
  initiatedBy?: PopulatedDoc<StaffUser.StaffUser>;
  message: string;
  embedding?: string;
  isHiddenFromApplicant: boolean;
}

export const IdentityVerificationCaseMessageSchema = new Schema<IdentityVerificationCaseMessage, Model<IdentityVerificationCaseMessage>, IdentityVerificationCaseMessage>(
  {
    sentBy: { type: String, required: true, enum: ["internal", "external"] },
    initiatedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: false },
    message: { type: String, required: true, maxlength: 2000 },
    embedding: { type: String, required: false },
    isHiddenFromApplicant: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export interface IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionFinanceReference extends NestedPath {
  debitGlAccount: string;
  creditGlAccount: string;
  completedAt: Date;
}

export const IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionFinanceReferenceType = {
  debitGlAccount: { type: String, required: true },
  creditGlAccount: { type: String, required: true },
  completedAt: { type: Date, required: true },
}

export interface IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionTransactionReference extends NestedPath {
  vendor: string;
  referenceId: string;
  completedAt?: Date;
}

export const IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionTransactionReferenceType = {
  vendor: { type: String, required: true },
  referenceId: { type: String, required: true },
  completedAt: { type: Date, required: false },
}

export interface IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionApproval extends NestedPath {
  isApplicantApprovalRequired: boolean;
  isApplicantApproved?: boolean;
  applicantRespondedAt?: Date;
}

export const IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionApprovalType = {
  isApplicantApprovalRequired: { type: Boolean, required: true },
  isApplicantApproved: { type: Boolean, required: false },
  applicantRespondedAt: { type: Date, required: false },
}

export interface IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransaction extends SubdocumentBase {
  amount: number;
  requestedAt: Date;
  requestedBy: PopulatedDoc<StaffUser.StaffUser>;
  reason: string;
  approval?: IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionApproval;
  transactionReference?: IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionTransactionReference;
  financeReference: IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionFinanceReference;
}

export const IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionSchema = new Schema<IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransaction, Model<IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransaction>, IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransaction>(
  {
    amount: { type: Number, required: true },
    requestedAt: { type: Date, required: true },
    requestedBy: { type: Schema.Types.ObjectId, ref: StaffUser.StaffUserModel.modelName, required: true },
    reason: { type: String, required: true },
    approval: { type: IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionApprovalType, required: false, ...NestedPathOptions },
    transactionReference: { type: IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionTransactionReferenceType, required: false, ...NestedPathOptions },
    financeReference: { type: IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionFinanceReferenceType, required: true, ...NestedPathOptions },
  },
  { timestamps: true }
);

export interface IdentityVerificationCaseFinanceDetailsTransactionsSubmissionTransactionReference extends NestedPath {
  vendor: string;
  referenceId: string;
  completedAt: Date;
}

export const IdentityVerificationCaseFinanceDetailsTransactionsSubmissionTransactionReferenceType = {
  vendor: { type: String, required: true },
  referenceId: { type: String, required: true },
  completedAt: { type: Date, required: true },
}

export interface IdentityVerificationCaseFinanceDetailsTransactionsSubmission extends NestedPath {
  amount: number;
  transactionReference: IdentityVerificationCaseFinanceDetailsTransactionsSubmissionTransactionReference;
}

export const IdentityVerificationCaseFinanceDetailsTransactionsSubmissionType = {
  amount: { type: Number, required: true },
  transactionReference: { type: IdentityVerificationCaseFinanceDetailsTransactionsSubmissionTransactionReferenceType, required: true, ...NestedPathOptions },
}

export interface IdentityVerificationCaseFinanceDetailsTransactions extends NestedPath {
  submission?: IdentityVerificationCaseFinanceDetailsTransactionsSubmission;
  adhocTransactions?: Types.DocumentArray<IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransaction>;
}

export const IdentityVerificationCaseFinanceDetailsTransactionsType = {
  submission: { type: IdentityVerificationCaseFinanceDetailsTransactionsSubmissionType, required: false, ...NestedPathOptions },
  adhocTransactions: { type: [IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionSchema], required: false },
}

export interface IdentityVerificationCaseFinanceDetailsRevenueRecognitionSubmission extends NestedPath {
  debitGlAccount: string;
  creditGlAccount: string;
  amount: number;
  recognizedAt?: Date;
  completedAt: Date;
}

export const IdentityVerificationCaseFinanceDetailsRevenueRecognitionSubmissionType = {
  debitGlAccount: { type: String, required: true },
  creditGlAccount: { type: String, required: true },
  amount: { type: Number, required: true },
  recognizedAt: { type: Date, required: false },
  completedAt: { type: Date, required: true },
}

export interface IdentityVerificationCaseFinanceDetailsRevenueRecognitionRecognition extends NestedPath {
  debitGlAccount: string;
  creditGlAccount: string;
  amount: number;
  recognizedAt?: Date;
  completedAt: Date;
}

export const IdentityVerificationCaseFinanceDetailsRevenueRecognitionRecognitionType = {
  debitGlAccount: { type: String, required: true },
  creditGlAccount: { type: String, required: true },
  amount: { type: Number, required: true },
  recognizedAt: { type: Date, required: false },
  completedAt: { type: Date, required: true },
}

export interface IdentityVerificationCaseFinanceDetailsRevenueRecognition extends NestedPath {
  submission?: IdentityVerificationCaseFinanceDetailsRevenueRecognitionSubmission;
  recognition?: IdentityVerificationCaseFinanceDetailsRevenueRecognitionRecognition;
}

export const IdentityVerificationCaseFinanceDetailsRevenueRecognitionType = {
  submission: { type: IdentityVerificationCaseFinanceDetailsRevenueRecognitionSubmissionType, required: false, ...NestedPathOptions },
  recognition: { type: IdentityVerificationCaseFinanceDetailsRevenueRecognitionRecognitionType, required: false, ...NestedPathOptions },
}

export interface IdentityVerificationCaseFinanceDetails extends NestedPath {
  serviceFee: number;
  revenueRecognition: IdentityVerificationCaseFinanceDetailsRevenueRecognition;
  transactions?: IdentityVerificationCaseFinanceDetailsTransactions;
}

export const IdentityVerificationCaseFinanceDetailsType = {
  serviceFee: { type: Number, required: true },
  revenueRecognition: { type: IdentityVerificationCaseFinanceDetailsRevenueRecognitionType, required: false, ...NestedPathOptions },
  transactions: { type: IdentityVerificationCaseFinanceDetailsTransactionsType, required: false, ...NestedPathOptions },
}

export interface IdentityVerificationCaseActivityLog extends SubdocumentBase {
  activityType: string;
  activityBy?: PopulatedDoc<User.User>;
  description: string;
  metaData?: string;
  tags?: string[];
}

export const IdentityVerificationCaseActivityLogSchema = new Schema<IdentityVerificationCaseActivityLog, Model<IdentityVerificationCaseActivityLog>, IdentityVerificationCaseActivityLog>(
  {
    activityType: { type: String, required: true },
    activityBy: { type: Schema.Types.ObjectId, ref: User.UserModel.modelName, required: false },
    description: { type: String, required: true },
    metaData: { type: String, required: false },
    tags: { type: [String], required: false },
  }, 
  { timestamps: true }
);

export interface IdentityVerificationCaseCaseFlagged extends SubdocumentBase {
  flagType: string;
  reason: string;
}

export const IdentityVerificationCaseCaseFlaggedSchema = new Schema<IdentityVerificationCaseCaseFlagged, Model<IdentityVerificationCaseCaseFlagged>, IdentityVerificationCaseCaseFlagged>(
  {
    flagType: { type: String, required: true },
    reason: { type: String, required: true },
  }, 
  { timestamps: true }
);

export interface IdentityVerificationCaseSearch extends NestedPath {
  hash: string;
  indexedAt: Date;
  indexingFailedAt?: Date;
}

export const IdentityVerificationCaseSearchType = {
  hash: { type: String, required: true, maxLength: 44 },
  indexedAt: { type: Date, required: true },
  indexingFailedAt: { type: Date, required: false },
}`
}