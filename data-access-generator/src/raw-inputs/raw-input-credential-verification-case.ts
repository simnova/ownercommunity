import { RawInputFromModel } from "../common";

export const rawInputCredentialVerificationCase: RawInputFromModel = {
  version: "1",
  aggregateRootDefinition: `
export interface CredentialVerificationCase extends Case {
  caseDetails?: CredentialVerificationCaseCaseDetails;
  assets: CredentialVerificationCaseAssets;
  revisionRequest: CredentialVerificationCaseRevisionRequest;
  caseHistory: Types.DocumentArray<CredentialVerificationCaseCaseHistory>;
  messages: Types.DocumentArray<CredentialVerificationCaseMessage>;
  financeDetails: CredentialVerificationCaseFinanceDetails;
  activityLog?: Types.DocumentArray<CredentialVerificationCaseActivityLog>;

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
  caseFlagged?: Types.DocumentArray<CredentialVerificationCaseCaseFlagged>;
  search?: CredentialVerificationCaseSearch;
}
`, 
  complexSchemaTypeDefinitions: `

 export interface CredentialVerificationCaseOtherIssuingInstitution extends NestedPath {
  institutionName?: string;
  addressLine1?: string;
  city?: string;
  stateOrProvince?: string;
  zipOrPostalCode?: string;
  country?: string;
}

export interface CredentialVerificationCaseCredentialAssets extends NestedPath {
  credential?: string; // assetReference, id form asset reference uploaded by applicant
  credentialUploadedAt?: Date;
  credentialVersion?: string;
  translation?: string; // assetReference, id form asset reference uploaded by applicant
  translationUploadedAt?: Date;
  translationVersion?: string;
}

export interface CredentialVerificationCaseEntitySuppliedCredential extends NestedPath {
  credential?: string; // assetReference, id form asset reference uploaded by applicant
  credentialUploadedAt?: Date;
  credentialVersion?: string;
  translation?: string; // assetReference, id form asset reference uploaded by applicant
  translationUploadedAt?: Date;
  translationVersion?: string;
}

export interface CredentialVerificationCaseAudit extends NestedPath {
  completedAt?: Date;
  completedBy: PopulatedDoc<StaffUser.StaffUser>;
  result?: string;
}

export interface CredentialVerificationCaseAffirmations extends NestedPath {
  isNameAcceptable?: boolean;
  isTranslationAcceptable?: boolean;
  isCredentialAcceptable?: boolean;
  isCredentialDetailsAcceptable?: boolean;
  isDateOfBirthAcceptable?: boolean;
  isEntityAcceptable?: boolean;
  isCredentialSentForVerification?: boolean;
  audit?: CredentialVerificationCaseAudit;
}

export interface CredentialVerificationCaseVerificationAffirmations extends NestedPath {
  isReturnedFromCorrectEntity?: boolean;
  isVerificationMethodAcceptable?: boolean;
  isVerificationComplete?: boolean;
  isVerificationInEnglishOrWithTranslation?: boolean;
  isEntityDetailCorrect?: boolean;
  isCredentialReturnedFromEntity?: boolean;
  isVerificationStatusComplete?: boolean;
  isVerificationComponentPacketCompiled?: boolean;
  audit?: CredentialVerificationCaseAudit;
}

export interface CredentialVerificationCaseInstitutionContactDetails extends NestedPath {
  institutionEmail?: string;
  institutionPhone?: string;
}

export interface CredentialVerificationCaseAlternateVerifyingEntity extends NestedPath {
  isVerifiedWithOther?: boolean;
  otherDetails?: string;
}

export interface CredentialVerificationCaseVerificationStatus extends NestedPath {
  verificationResponse?: string;
}

export interface CredentialVerificationCasePrivateCaseDetails extends NestedPath {
  institutionContactDetails?: CredentialVerificationCaseInstitutionContactDetails;
  alternateVerifyingEntity?: CredentialVerificationCaseAlternateVerifyingEntity;
  verificationStatus?: CredentialVerificationCaseVerificationStatus;
  entitySuppliedCredential?: CredentialVerificationCaseEntitySuppliedCredential;
}

export interface CredentialVerificationCaseApplicationReviewDecision extends NestedPath {
  completedAt?: Date;
  completedBy?: PopulatedDoc<StaffUser.StaffUser>;
  result?: string;
  rejectionReason?: string;
}

export interface CredentialVerificationCaseApplicationReview extends NestedPath {
  caseWorkerAssigned?: PopulatedDoc<StaffUser.StaffUser>;
  affirmations?: CredentialVerificationCaseAffirmations;
  verificationAffirmations?: CredentialVerificationCaseVerificationAffirmations;
  privateCaseDetails?: CredentialVerificationCasePrivateCaseDetails;
  decision?: CredentialVerificationCaseApplicationReviewDecision;
}

export interface CredentialVerificationCaseAssetsPrivate extends NestedPath {
  verificationForm?: string;
  verificationFormHistory?: Types.DocumentArray<CredentialVerificationCaseAssetHistory>;
  verificationPacket?: string;
  verificationPacketHistory?: Types.DocumentArray<CredentialVerificationCaseAssetHistory>;
  verificationPacketResponse?: string;
  verificationPacketResponseHistory?: Types.DocumentArray<CredentialVerificationCaseAssetHistory>;
  verificationComponentPacket?: string;
  verificationComponentPacketHistory?: Types.DocumentArray<CredentialVerificationCaseAssetHistory>;
}
export interface CredentialVerificationCaseAssets extends NestedPath {
  private?: CredentialVerificationCaseAssetsPrivate;
}

export interface CredentialVerificationCaseAssetHistory extends SubdocumentBase {
  assetVersion?: string;
  assetUploadedBy?: PopulatedDoc<StaffUser.StaffUser>;
}

export interface CredentialVerificationCaseRequestedChanges extends NestedPath {
  requestUpdatedCredentialDetails?: boolean;
  requestUploadCredential?: boolean;
  requestUploadTranslation?: boolean;
  requestUpdatedIssuingInstitution?: boolean;
}

export interface CredentialVerificationCaseRevisionRequest extends NestedPath {
  requestedAt?: Date;
  requestedBy?: PopulatedDoc<StaffUser.StaffUser>;
  revisionSummary?: string;
  requestedChanges?: CredentialVerificationCaseRequestedChanges;
  revisionSubmittedAt?: Date;
}

export interface CredentialVerificationCaseCaseHistory extends SubdocumentBase {
  caseDetails?: CredentialVerificationCaseCaseDetails;
  revisionRequest?: CredentialVerificationCaseRevisionRequest;
}

export interface CredentialVerificationCaseMessage extends SubdocumentBase {
  sentBy?: string; // enum external,internal
  initiatedBy?: PopulatedDoc<StaffUser.StaffUser>;
  message?: string;
  embedding?: string;
  isHiddenFromApplicant?: boolean;
}

export interface CredentialVerificationCaseRevenueRecognitionSubmission extends NestedPath {
  debitGlAccount?: string;
  creditGlAccount?: string;
  amount?: number;
  recognizedAt?: Date;
  completedAt?: Date;
}

export interface CredentialVerificationCaseRevenueRecognitionRecognition extends NestedPath {
  debitGlAccount?: string;
  creditGlAccount?: string;
  amount?: number;
  recognizedAt?: Date;
  completedAt?: Date;
}

export interface CredentialVerificationCaseRevenueRecognition extends NestedPath {
  submission?: CredentialVerificationCaseRevenueRecognitionSubmission;
  recognition?: CredentialVerificationCaseRevenueRecognitionRecognition;
}

export interface CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigSubmission extends NestedPath {
  amount: number;
  debitGlAccount: string;
  creditGlAccount: string;
}

export interface CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigAdditionalCharge extends SubdocumentBase {
  type: string;
  debitGlAccount: string;
  creditGlAccount: string;
}

export interface CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigRefunds extends NestedPath {
  creditGlAccount: string;
  debitGlAccount: string;
}

export interface CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigRecognition extends NestedPath {
  creditGlAccount: string;
  debitGlAccount: string;
}

export interface CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfig extends NestedPath {
  submission?: CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigSubmission;
  additionalCharges: Types.DocumentArray<CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigAdditionalCharge>;
  refunds: CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigRefunds;
  recognition: CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfigRecognition;
}
export interface CredentialVerificationCaseFinanceDetailsFinanceConfig extends NestedPath {
  effectiveAt?: Date;
  glConfig?: CredentialVerificationCaseFinanceDetailsFinanceConfigGLConfig;
  createdAt?: Date;
  createdBy?: PopulatedDoc<StaffUser.StaffUser>;
  note?: string;
}
export interface CredentialVerificationCaseFinanceDetails extends NestedPath {
  financeConfig?: CredentialVerificationCaseFinanceDetailsFinanceConfig;
  serviceFee?: number;
  revenueRecognition?: CredentialVerificationCaseRevenueRecognition;
  transactions?: CredentialVerificationCaseFinanceDetailsTransactions;
}

export interface CredentialVerificationCaseTransactionReference extends NestedPath {
  vendor?: string;
  referenceId?: string;
  completedAt?: Date;
}

export interface CredentialVerificationCaseFinanceDetailsTransactionSubmission extends NestedPath {
  amount?: number;
  transactionReference: CredentialVerificationCaseTransactionReference;
}

export interface CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactionsApproval extends NestedPath {
  isApplicantApprovalRequired?: boolean;
  isApplicantApproved?: boolean;
  applicantRespondedAt?: Date;
}

export interface CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactionsFinanceReference extends NestedPath {
  debitGlAccount?: string;
  creditGlAccount?: string;
  completedAt?: Date;
}

export interface CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactions extends SubdocumentBase {
  amount?: number;
  requestedAt?: Date;
  requestedBy: PopulatedDoc<StaffUser.StaffUser>;
  reason?: string;
  approval?: CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactionsApproval;
  transactionReference?: CredentialVerificationCaseTransactionReference;
  financeReference?: CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactionsFinanceReference;
}

export interface CredentialVerificationCaseFinanceDetailsTransactions extends NestedPath {
  submission?: CredentialVerificationCaseFinanceDetailsTransactionSubmission;
  adhocTransactions?: Types.DocumentArray<CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactions>;
}

export interface CredentialVerificationCaseActivityLog extends SubdocumentBase {
  activityType?: string;
  activityBy?: PopulatedDoc<User.User>;
  description?: string;
  metaData?: string;
  tags?: string[];
}

export interface CredentialVerificationCaseCaseFlagged extends SubdocumentBase {
  flagType?: string;
  reason?: string;
}

export interface CredentialVerificationCaseSearch extends NestedPath {
  hash: string;
  indexedAt: Date;
  indexingFailedAt?: Date;
}

export interface CredentialVerificationCaseApplication extends NestedPath {
  attestedAt?: Date;
  credentialTitle?: string;
  program?: string;
  nameOnCredential?: string;
  dateCredentialIssued?: Date;
  credentialType?: string;
  isCredentialInEnglish?: boolean;
  issuingInstitution?: PopulatedDoc<Entity.Entity>;
  otherIssuingInstitution?: CredentialVerificationCaseOtherIssuingInstitution;
  credentialAssets?: CredentialVerificationCaseCredentialAssets;
  sendDestination?: PopulatedDoc<Entity.Entity>;
}

export interface CredentialVerificationCaseCaseDetails extends NestedPath {
  application?: CredentialVerificationCaseApplication;
  applicationReview?: CredentialVerificationCaseApplicationReview;
  createdAt?: Date;
}`
}