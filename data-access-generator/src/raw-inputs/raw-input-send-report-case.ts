import { RawInputFromModel } from "../common";

export const rawInputSendReportCase: RawInputFromModel = {
  version: "1",
  aggregateRootDefinition:`export interface SendReportCase extends Case {
  caseDetails?: SendReportCaseCaseDetails;

  revisionRequest?: SendReportCaseRevisionRequest;

  caseHistory?: Types.DocumentArray<SendReportCaseCaseHistory>;

  assets?: SendReportCaseAsset;

  messages: Types.DocumentArray<SendReportCaseMessage>;

  financeDetails?: SendReportCaseFinanceDetails;

  activityLog?: Types.DocumentArray<SendReportCaseActivityLog>;

  applicant?: PopulatedDoc<ApplicantUser.ApplicantUser>;
  submittedAt?: Date;
  purgeEligibleAt?: Date;
  expirationEligibleAt?: Date;

  caseType?: string;
  discriminatorKey: string;
  state?: string;

  caseName?: string;
  systemTags?: string[];
  tags?: string[];
  caseFlagged?: Types.DocumentArray<SendReportCaseCaseFlagged>;
  search?: SendReportCaseSearch;
}`,
  complexSchemaTypeDefinitions: 
  `
  export interface SendReportCaseCaseDetailsApplication extends NestedPath {
  attestedAt?: Date;
  credential?: PopulatedDoc<CredentialVerificationCase.CredentialVerificationCase>;
  destination: PopulatedDoc<Entity.Entity>;
}

export interface SendReportCaseAuditType extends NestedPath {
  completedAt?: Date;
  completedBy?: PopulatedDoc<StaffUser.StaffUser>;
  result?: string;
}
export interface SendReportCaseCaseDetailsApplicationReviewAffirmation extends NestedPath {
  isDestinationAcceptable?: boolean;
  isReportCompiled?: boolean;
  isReportSent?: boolean;
  audit: SendReportCaseAuditType;
}

export interface SendReportCaseCaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetails extends NestedPath {
  institutionEmail?: string;
  institutionPhone?: string;
}
export interface SendReportCaseCaseDetailsApplicationReviewPrivateCaseDetails extends NestedPath {
  institutionContactDetails?: SendReportCaseCaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetails;
}

export interface SendReportCaseCaseDetailsApplicationReviewDecision extends NestedPath {
  completedAt?: Date;
  completedBy?: PopulatedDoc<StaffUser.StaffUser>;
  result?: string;
  rejectionReason?: string;
}
export interface SendReportCaseCaseDetailsApplicationReview extends NestedPath {
  caseWorkerAssigned: PopulatedDoc<StaffUser.StaffUser>;
  affirmations?: SendReportCaseCaseDetailsApplicationReviewAffirmation;
  privateCaseDetails?: SendReportCaseCaseDetailsApplicationReviewPrivateCaseDetails;
  decision?: SendReportCaseCaseDetailsApplicationReviewDecision;
}
export interface SendReportCaseCaseDetails extends NestedPath {
  initiatedByApplicant?: boolean;
  application?: SendReportCaseCaseDetailsApplication;
  applicationReview?: SendReportCaseCaseDetailsApplicationReview;
  createdAt?: Date;
}

export interface SendReportCaseRevisionRequestRequestChanges extends NestedPath {
  requestUpdatedDestination: boolean;
}
export interface SendReportCaseRevisionRequest extends NestedPath {
  requestedAt?: Date;
  requestedBy?: PopulatedDoc<StaffUser.StaffUser>;
  revisionSummary?: string;
  requestedChanges?: SendReportCaseRevisionRequestRequestChanges;
  revisionSubmittedAt?: Date;
}

export interface SendReportCaseCaseHistory extends SubdocumentBase {
  caseDetails?: SendReportCaseCaseDetails;
  revisionRequest?: SendReportCaseRevisionRequest;
}

export interface SendReportCaseAssetPrivateStatusReportCoverLetterHistory extends SubdocumentBase {
  assetVersion?: string;
  assetUploadedBy?: PopulatedDoc<StaffUser.StaffUser>;
}

export interface SendReportCaseAssetPrivateVerificationStatusReportHistory extends SubdocumentBase {
  assetVersion?: string;
  assetUploadedBy?: PopulatedDoc<StaffUser.StaffUser>;
}

export interface SendReportCaseAssetPrivate extends NestedPath {
  statusReportCoverLetter?: string;
  statusReportCoverLetterHistory?: Types.DocumentArray<SendReportCaseAssetPrivateStatusReportCoverLetterHistory>;
  verificationStatusReport?: string;
  verificationStatusReportHistory?: Types.DocumentArray<SendReportCaseAssetPrivateVerificationStatusReportHistory>;
}
export interface SendReportCaseAsset extends NestedPath {
  private: SendReportCaseAssetPrivate;
}

export interface SendReportCaseMessage extends SubdocumentBase {
  sentBy: string;
  initiatedBy?: PopulatedDoc<StaffUser.StaffUser>;
  message: string;
  embedding?: string;
  isHiddenFromApplicant: boolean;
}

export interface SendReportCaseFinanceDetailsRevenueRecognitionSubmission extends NestedPath {
  debitGlAccount?: string;
  creditGlAccount?: string;
  amount?: number;
  recognizedAt?: Date;
  completedAt?: Date;
}

export interface SendReportCaseFinanceDetailsRevenueRecognitionRecognition extends NestedPath {
  debitGlAccount?: string;
  creditGlAccount?: string;
  amount?: number;
  recognizedAt?: Date;
  completedAt?: Date;
}
export interface SendReportCaseFinanceDetailsRevenueRecognition extends NestedPath {
  submission?: SendReportCaseFinanceDetailsRevenueRecognitionSubmission;
  recognition?: SendReportCaseFinanceDetailsRevenueRecognitionRecognition;
}

export interface SendReportCaseFinanceDetailsTransactionSubmissionTransactionReference extends NestedPath {
  vendor?: string;
  referenceId?: string;
  completedAt?: Date;
}
export interface SendReportCaseFinanceDetailsTransactionSubmission extends NestedPath {
  amount?: number;
  transactionReference?: SendReportCaseFinanceDetailsTransactionSubmissionTransactionReference;
}

export interface SendReportCaseFinanceDetailsTransactionAdhocTransactionApproval extends NestedPath {
  isApplicantApprovalRequired?: boolean;
  isApplicantApproved?: boolean;
  applicantRespondedAt?: Date;
}

export interface SendReportCaseFinanceDetailsTransactionAdhocTransactionTransactionReference extends NestedPath {
  vendor?: string;
  referenceId?: string;
  completedAt?: Date;
}

export interface SendReportCaseFinanceDetailsTransactionAdhocTransactionFinanceReference extends NestedPath {
  debitGlAccount: string;
  creditGlAccount: string;
  completedAt: Date;
}
export interface SendReportCaseFinanceDetailsTransactionAdhocTransaction extends SubdocumentBase {
  amount: number;
  requestedAt: Date;
  requestedBy: PopulatedDoc<StaffUser.StaffUser>;
  reason: string;
  approval?: SendReportCaseFinanceDetailsTransactionAdhocTransactionApproval;
  transactionReference?: SendReportCaseFinanceDetailsTransactionAdhocTransactionTransactionReference;
  financeReference: SendReportCaseFinanceDetailsTransactionAdhocTransactionFinanceReference;
}

export interface SendReportCaseFinanceDetailsTransactions extends NestedPath {
  submission: SendReportCaseFinanceDetailsTransactionSubmission;
  adhocTransactions: Types.DocumentArray<SendReportCaseFinanceDetailsTransactionAdhocTransaction>;
}

export interface SendReportCaseFinanceDetailsFinanceConfigGLConfigSubmission extends NestedPath {
  amount: number;
  debitGlAccount: string;
  creditGlAccount: string;
}

export interface SendReportCaseFinanceDetailsFinanceConfigGLConfigAdditionalCharge extends SubdocumentBase {
  type: string;
  debitGlAccount: string;
  creditGlAccount: string;
}

export interface SendReportCaseFinanceDetailsFinanceConfigGLConfigRefunds extends NestedPath {
  creditGlAccount: string;
  debitGlAccount: string;
}

export interface SendReportCaseFinanceDetailsFinanceConfigGLConfigRecognition extends NestedPath {
  creditGlAccount: string;
  debitGlAccount: string;
}
export interface SendReportCaseFinanceDetailsFinanceConfigGLConfig extends NestedPath {
  submission?: SendReportCaseFinanceDetailsFinanceConfigGLConfigSubmission;
  additionalCharges: Types.DocumentArray<SendReportCaseFinanceDetailsFinanceConfigGLConfigAdditionalCharge>;
  refunds: SendReportCaseFinanceDetailsFinanceConfigGLConfigRefunds;
  recognition: SendReportCaseFinanceDetailsFinanceConfigGLConfigRecognition;
}
export interface SendReportCaseFinanceDetailsFinanceConfig extends NestedPath {
  effectiveAt?: Date;
  glConfig?: SendReportCaseFinanceDetailsFinanceConfigGLConfig;
  createdAt?: Date;
  createdBy?: PopulatedDoc<StaffUser.StaffUser>;
  note?: string;
}
export interface SendReportCaseFinanceDetails extends NestedPath {
  financeConfig?: SendReportCaseFinanceDetailsFinanceConfig;
  serviceFee?: number;
  revenueRecognition: SendReportCaseFinanceDetailsRevenueRecognition;
  transactions: SendReportCaseFinanceDetailsTransactions;
}

export interface SendReportCaseActivityLog extends SubdocumentBase {
  activityType?: string;
  activityBy?: PopulatedDoc<User.User>;
  description?: string;
  metaData?: string;
  tags?: string[];
}

export interface SendReportCaseCaseFlagged extends SubdocumentBase {
  flagType?: string;
  reason: string;
}

export interface SendReportCaseSearch extends NestedPath {
  hash?: string;
  indexedAt?: Date;
  indexingFailedAt?: Date;
}
  `
}