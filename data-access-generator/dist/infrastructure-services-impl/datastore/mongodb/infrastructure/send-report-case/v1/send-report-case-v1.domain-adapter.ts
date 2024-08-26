
export class SendReportCaseV1Converter extends MongoTypeConverter<DomainExecutionContext, SendReportCase, SendReportCaseV1DomainAdapter, SendReportCaseV1DO<SendReportCaseV1DomainAdapter>> {
  constructor() {
    super(SendReportCaseV1DomainAdapter, SendReportCaseV1DO);
  }
}

export class SendReportCaseV1DomainAdapter extends MongooseDomainAdapter<SendReportCase> implements SendReportCaseV1Props {
  // Primitive Fields Getters and Setters
  get submittedAt() {
    return this.doc.submittedAt;
  }
  set submittedAt(value: Date) {
    this.doc.submittedAt = value;
  }
  get purgeEligibleAt() {
    return this.doc.purgeEligibleAt;
  }
  set purgeEligibleAt(value: Date) {
    this.doc.purgeEligibleAt = value;
  }
  get expirationEligibleAt() {
    return this.doc.expirationEligibleAt;
  }
  set expirationEligibleAt(value: Date) {
    this.doc.expirationEligibleAt = value;
  }
  get caseType() {
    return this.doc.caseType;
  }
  set caseType(value: string) {
    this.doc.caseType = value;
  }
  get state() {
    return this.doc.state;
  }
  set state(value: string) {
    this.doc.state = value;
  }
  get caseName() {
    return this.doc.caseName;
  }
  set caseName(value: string) {
    this.doc.caseName = value;
  }
  get systemTags() {
    return this.doc.systemTags;
  }
  set systemTags(value: string[]) {
    this.doc.systemTags = value;
  }
  get tags() {
    return this.doc.tags;
  }
  set tags(value: string[]) {
    this.doc.tags = value;
  }

  // Nested Path Fields Getters
  get caseDetails() {
    if (!this.doc.caseDetails) {
      this.doc.set('caseDetails', {});
    }
    return new SendReportCaseV1CaseDetailsDomainAdapter(this.doc.caseDetails);
  }
  get revisionRequest() {
    if (!this.doc.revisionRequest) {
      this.doc.set('revisionRequest', {});
    }
    return new SendReportCaseV1RevisionRequestDomainAdapter(this.doc.revisionRequest);
  }
  get assets() {
    if (!this.doc.assets) {
      this.doc.set('assets', {});
    }
    return new SendReportCaseV1AssetDomainAdapter(this.doc.assets);
  }
  get financeDetails() {
    if (!this.doc.financeDetails) {
      this.doc.set('financeDetails', {});
    }
    return new SendReportCaseV1FinanceDetailsDomainAdapter(this.doc.financeDetails);
  }
  get search() {
    if (!this.doc.search) {
      this.doc.set('search', {});
    }
    return new SendReportCaseV1SearchDomainAdapter(this.doc.search);
  }

  // Populated Doc Fields Getters and Setters
  get applicant() {
    if (this.doc.applicant) {
      return new ApplicantUserDomainAdapter(this.doc.applicant);
    }
    return undefined;
  }
  setApplicantRef(applicant: ApplicantUserEntityReference) {
          this.doc.set('applicant', applicant ? applicant['props']['doc'] : null);
        }

  // Document Array Fields Getters
  get caseHistory() {
    return new MongoosePropArray(this.doc.caseHistory, SendReportCaseV1CaseHistoryDomainAdapter);
  }
  get messages() {
    return new MongoosePropArray(this.doc.messages, SendReportCaseV1MessageDomainAdapter);
  }
  get activityLog() {
    return new MongoosePropArray(this.doc.activityLog, SendReportCaseV1ActivityLogDomainAdapter);
  }
  get caseFlagged() {
    return new MongoosePropArray(this.doc.caseFlagged, SendReportCaseV1CaseFlaggedDomainAdapter);
  }

}

// Nested Path Domain Adapters
export class SendReportCaseV1CaseDetailsApplicationDomainAdapter implements SendReportCaseV1CaseDetailsApplicationProps {
  constructor(public readonly doc: SendReportCaseCaseDetailsApplication) {}
  //Primitive Field Getters and Setters
  get attestedAt() {
    return this.doc.attestedAt;
  }
  set attestedAt(value: Date) {
    this.doc.attestedAt = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters
  get credential() {
    if (this.doc.credential) {
      return new CredentialVerificationCaseDomainAdapter(this.doc.credential);
    }
    return undefined;
  }
  setCredentialRef(credential: CredentialVerificationCaseEntityReference) {
          this.doc.set('credential', credential ? credential['props']['doc'] : null);
        }
  get destination() {
    if (this.doc.destination) {
      return new EntityDomainAdapter(this.doc.destination);
    }
    return undefined;
  }
  setDestinationRef(destination: EntityEntityReference) {
    this.doc.set('destination', destination['props']['doc']);
  }

  // Document Array Getters

  
}export class SendReportCaseV1AuditTypeDomainAdapter implements SendReportCaseV1AuditTypeProps {
  constructor(public readonly doc: SendReportCaseAuditType) {}
  //Primitive Field Getters and Setters
  get completedAt() {
    return this.doc.completedAt;
  }
  set completedAt(value: Date) {
    this.doc.completedAt = value;
  }
  get result() {
    return this.doc.result;
  }
  set result(value: string) {
    this.doc.result = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters
  get completedBy() {
    if (this.doc.completedBy) {
      return new StaffUserDomainAdapter(this.doc.completedBy);
    }
    return undefined;
  }
  setCompletedByRef(completedBy: StaffUserEntityReference) {
          this.doc.set('completedBy', completedBy ? completedBy['props']['doc'] : null);
        }

  // Document Array Getters

  
}export class SendReportCaseV1CaseDetailsApplicationReviewAffirmationDomainAdapter implements SendReportCaseV1CaseDetailsApplicationReviewAffirmationProps {
  constructor(public readonly doc: SendReportCaseCaseDetailsApplicationReviewAffirmation) {}
  //Primitive Field Getters and Setters
  get isDestinationAcceptable() {
    return this.doc.isDestinationAcceptable;
  }
  set isDestinationAcceptable(value: boolean) {
    this.doc.isDestinationAcceptable = value;
  }
  get isReportCompiled() {
    return this.doc.isReportCompiled;
  }
  set isReportCompiled(value: boolean) {
    this.doc.isReportCompiled = value;
  }
  get isReportSent() {
    return this.doc.isReportSent;
  }
  set isReportSent(value: boolean) {
    this.doc.isReportSent = value;
  }

  // Nested Path Getters
  get audit() {
    if (!this.doc.audit) {
      this.doc.set('audit', {});
    }
    return new SendReportCaseV1AuditTypeDomainAdapter(this.doc.audit);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetailsDomainAdapter implements SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetailsProps {
  constructor(public readonly doc: SendReportCaseCaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetails) {}
  //Primitive Field Getters and Setters
  get institutionEmail() {
    return this.doc.institutionEmail;
  }
  set institutionEmail(value: string) {
    this.doc.institutionEmail = value;
  }
  get institutionPhone() {
    return this.doc.institutionPhone;
  }
  set institutionPhone(value: string) {
    this.doc.institutionPhone = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsDomainAdapter implements SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsProps {
  constructor(public readonly doc: SendReportCaseCaseDetailsApplicationReviewPrivateCaseDetails) {}
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get institutionContactDetails() {
    if (!this.doc.institutionContactDetails) {
      this.doc.set('institutionContactDetails', {});
    }
    return new SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsInstitutionContactDetailsDomainAdapter(this.doc.institutionContactDetails);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class SendReportCaseV1CaseDetailsApplicationReviewDecisionDomainAdapter implements SendReportCaseV1CaseDetailsApplicationReviewDecisionProps {
  constructor(public readonly doc: SendReportCaseCaseDetailsApplicationReviewDecision) {}
  //Primitive Field Getters and Setters
  get completedAt() {
    return this.doc.completedAt;
  }
  set completedAt(value: Date) {
    this.doc.completedAt = value;
  }
  get result() {
    return this.doc.result;
  }
  set result(value: string) {
    this.doc.result = value;
  }
  get rejectionReason() {
    return this.doc.rejectionReason;
  }
  set rejectionReason(value: string) {
    this.doc.rejectionReason = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters
  get completedBy() {
    if (this.doc.completedBy) {
      return new StaffUserDomainAdapter(this.doc.completedBy);
    }
    return undefined;
  }
  setCompletedByRef(completedBy: StaffUserEntityReference) {
          this.doc.set('completedBy', completedBy ? completedBy['props']['doc'] : null);
        }

  // Document Array Getters

  
}export class SendReportCaseV1CaseDetailsApplicationReviewDomainAdapter implements SendReportCaseV1CaseDetailsApplicationReviewProps {
  constructor(public readonly doc: SendReportCaseCaseDetailsApplicationReview) {}
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get affirmations() {
    if (!this.doc.affirmations) {
      this.doc.set('affirmations', {});
    }
    return new SendReportCaseV1CaseDetailsApplicationReviewAffirmationDomainAdapter(this.doc.affirmations);
  }
  get privateCaseDetails() {
    if (!this.doc.privateCaseDetails) {
      this.doc.set('privateCaseDetails', {});
    }
    return new SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsDomainAdapter(this.doc.privateCaseDetails);
  }
  get decision() {
    if (!this.doc.decision) {
      this.doc.set('decision', {});
    }
    return new SendReportCaseV1CaseDetailsApplicationReviewDecisionDomainAdapter(this.doc.decision);
  }

  // Populated Doc Getters and Setters
  get caseWorkerAssigned() {
    if (this.doc.caseWorkerAssigned) {
      return new StaffUserDomainAdapter(this.doc.caseWorkerAssigned);
    }
    return undefined;
  }
  setCaseWorkerAssignedRef(caseWorkerAssigned: StaffUserEntityReference) {
    this.doc.set('caseWorkerAssigned', caseWorkerAssigned['props']['doc']);
  }

  // Document Array Getters

  
}export class SendReportCaseV1CaseDetailsDomainAdapter implements SendReportCaseV1CaseDetailsProps {
  constructor(public readonly doc: SendReportCaseCaseDetails) {}
  //Primitive Field Getters and Setters
  get initiatedByApplicant() {
    return this.doc.initiatedByApplicant;
  }
  set initiatedByApplicant(value: boolean) {
    this.doc.initiatedByApplicant = value;
  }
  get createdAt() {
    return this.doc.createdAt;
  }
  set createdAt(value: Date) {
    this.doc.createdAt = value;
  }

  // Nested Path Getters
  get application() {
    if (!this.doc.application) {
      this.doc.set('application', {});
    }
    return new SendReportCaseV1CaseDetailsApplicationDomainAdapter(this.doc.application);
  }
  get applicationReview() {
    if (!this.doc.applicationReview) {
      this.doc.set('applicationReview', {});
    }
    return new SendReportCaseV1CaseDetailsApplicationReviewDomainAdapter(this.doc.applicationReview);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class SendReportCaseV1RevisionRequestRequestChangesDomainAdapter implements SendReportCaseV1RevisionRequestRequestChangesProps {
  constructor(public readonly doc: SendReportCaseRevisionRequestRequestChanges) {}
  //Primitive Field Getters and Setters
  get requestUpdatedDestination() {
    return this.doc.requestUpdatedDestination;
  }
  set requestUpdatedDestination(value: boolean) {
    this.doc.requestUpdatedDestination = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class SendReportCaseV1RevisionRequestDomainAdapter implements SendReportCaseV1RevisionRequestProps {
  constructor(public readonly doc: SendReportCaseRevisionRequest) {}
  //Primitive Field Getters and Setters
  get requestedAt() {
    return this.doc.requestedAt;
  }
  set requestedAt(value: Date) {
    this.doc.requestedAt = value;
  }
  get revisionSummary() {
    return this.doc.revisionSummary;
  }
  set revisionSummary(value: string) {
    this.doc.revisionSummary = value;
  }
  get revisionSubmittedAt() {
    return this.doc.revisionSubmittedAt;
  }
  set revisionSubmittedAt(value: Date) {
    this.doc.revisionSubmittedAt = value;
  }

  // Nested Path Getters
  get requestedChanges() {
    if (!this.doc.requestedChanges) {
      this.doc.set('requestedChanges', {});
    }
    return new SendReportCaseV1RevisionRequestRequestChangesDomainAdapter(this.doc.requestedChanges);
  }

  // Populated Doc Getters and Setters
  get requestedBy() {
    if (this.doc.requestedBy) {
      return new StaffUserDomainAdapter(this.doc.requestedBy);
    }
    return undefined;
  }
  setRequestedByRef(requestedBy: StaffUserEntityReference) {
          this.doc.set('requestedBy', requestedBy ? requestedBy['props']['doc'] : null);
        }

  // Document Array Getters

  
}export class SendReportCaseV1AssetPrivateDomainAdapter implements SendReportCaseV1AssetPrivateProps {
  constructor(public readonly doc: SendReportCaseAssetPrivate) {}
  //Primitive Field Getters and Setters
  get statusReportCoverLetter() {
    return this.doc.statusReportCoverLetter;
  }
  set statusReportCoverLetter(value: string) {
    this.doc.statusReportCoverLetter = value;
  }
  get verificationStatusReport() {
    return this.doc.verificationStatusReport;
  }
  set verificationStatusReport(value: string) {
    this.doc.verificationStatusReport = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters
  get statusReportCoverLetterHistory() {
    return new MongoosePropArray(this.doc.statusReportCoverLetterHistory, SendReportCaseV1AssetPrivateStatusReportCoverLetterHistoryDomainAdapter);
  }
  get verificationStatusReportHistory() {
    return new MongoosePropArray(this.doc.verificationStatusReportHistory, SendReportCaseV1AssetPrivateVerificationStatusReportHistoryDomainAdapter);
  }

  
}export class SendReportCaseV1AssetDomainAdapter implements SendReportCaseV1AssetProps {
  constructor(public readonly doc: SendReportCaseAsset) {}
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get private() {
    if (!this.doc.private) {
      this.doc.set('private', {});
    }
    return new SendReportCaseV1AssetPrivateDomainAdapter(this.doc.private);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class SendReportCaseV1FinanceDetailsRevenueRecognitionSubmissionDomainAdapter implements SendReportCaseV1FinanceDetailsRevenueRecognitionSubmissionProps {
  constructor(public readonly doc: SendReportCaseFinanceDetailsRevenueRecognitionSubmission) {}
  //Primitive Field Getters and Setters
  get debitGlAccount() {
    return this.doc.debitGlAccount;
  }
  set debitGlAccount(value: string) {
    this.doc.debitGlAccount = value;
  }
  get creditGlAccount() {
    return this.doc.creditGlAccount;
  }
  set creditGlAccount(value: string) {
    this.doc.creditGlAccount = value;
  }
  get amount() {
    return this.doc.amount;
  }
  set amount(value: number) {
    this.doc.amount = value;
  }
  get recognizedAt() {
    return this.doc.recognizedAt;
  }
  set recognizedAt(value: Date) {
    this.doc.recognizedAt = value;
  }
  get completedAt() {
    return this.doc.completedAt;
  }
  set completedAt(value: Date) {
    this.doc.completedAt = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class SendReportCaseV1FinanceDetailsRevenueRecognitionRecognitionDomainAdapter implements SendReportCaseV1FinanceDetailsRevenueRecognitionRecognitionProps {
  constructor(public readonly doc: SendReportCaseFinanceDetailsRevenueRecognitionRecognition) {}
  //Primitive Field Getters and Setters
  get debitGlAccount() {
    return this.doc.debitGlAccount;
  }
  set debitGlAccount(value: string) {
    this.doc.debitGlAccount = value;
  }
  get creditGlAccount() {
    return this.doc.creditGlAccount;
  }
  set creditGlAccount(value: string) {
    this.doc.creditGlAccount = value;
  }
  get amount() {
    return this.doc.amount;
  }
  set amount(value: number) {
    this.doc.amount = value;
  }
  get recognizedAt() {
    return this.doc.recognizedAt;
  }
  set recognizedAt(value: Date) {
    this.doc.recognizedAt = value;
  }
  get completedAt() {
    return this.doc.completedAt;
  }
  set completedAt(value: Date) {
    this.doc.completedAt = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class SendReportCaseV1FinanceDetailsRevenueRecognitionDomainAdapter implements SendReportCaseV1FinanceDetailsRevenueRecognitionProps {
  constructor(public readonly doc: SendReportCaseFinanceDetailsRevenueRecognition) {}
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get submission() {
    if (!this.doc.submission) {
      this.doc.set('submission', {});
    }
    return new SendReportCaseV1FinanceDetailsRevenueRecognitionSubmissionDomainAdapter(this.doc.submission);
  }
  get recognition() {
    if (!this.doc.recognition) {
      this.doc.set('recognition', {});
    }
    return new SendReportCaseV1FinanceDetailsRevenueRecognitionRecognitionDomainAdapter(this.doc.recognition);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReferenceDomainAdapter implements SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReferenceProps {
  constructor(public readonly doc: SendReportCaseFinanceDetailsTransactionSubmissionTransactionReference) {}
  //Primitive Field Getters and Setters
  get vendor() {
    return this.doc.vendor;
  }
  set vendor(value: string) {
    this.doc.vendor = value;
  }
  get referenceId() {
    return this.doc.referenceId;
  }
  set referenceId(value: string) {
    this.doc.referenceId = value;
  }
  get completedAt() {
    return this.doc.completedAt;
  }
  set completedAt(value: Date) {
    this.doc.completedAt = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class SendReportCaseV1FinanceDetailsTransactionSubmissionDomainAdapter implements SendReportCaseV1FinanceDetailsTransactionSubmissionProps {
  constructor(public readonly doc: SendReportCaseFinanceDetailsTransactionSubmission) {}
  //Primitive Field Getters and Setters
  get amount() {
    return this.doc.amount;
  }
  set amount(value: number) {
    this.doc.amount = value;
  }

  // Nested Path Getters
  get transactionReference() {
    if (!this.doc.transactionReference) {
      this.doc.set('transactionReference', {});
    }
    return new SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReferenceDomainAdapter(this.doc.transactionReference);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApprovalDomainAdapter implements SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApprovalProps {
  constructor(public readonly doc: SendReportCaseFinanceDetailsTransactionAdhocTransactionApproval) {}
  //Primitive Field Getters and Setters
  get isApplicantApprovalRequired() {
    return this.doc.isApplicantApprovalRequired;
  }
  set isApplicantApprovalRequired(value: boolean) {
    this.doc.isApplicantApprovalRequired = value;
  }
  get isApplicantApproved() {
    return this.doc.isApplicantApproved;
  }
  set isApplicantApproved(value: boolean) {
    this.doc.isApplicantApproved = value;
  }
  get applicantRespondedAt() {
    return this.doc.applicantRespondedAt;
  }
  set applicantRespondedAt(value: Date) {
    this.doc.applicantRespondedAt = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReferenceDomainAdapter implements SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReferenceProps {
  constructor(public readonly doc: SendReportCaseFinanceDetailsTransactionAdhocTransactionTransactionReference) {}
  //Primitive Field Getters and Setters
  get vendor() {
    return this.doc.vendor;
  }
  set vendor(value: string) {
    this.doc.vendor = value;
  }
  get referenceId() {
    return this.doc.referenceId;
  }
  set referenceId(value: string) {
    this.doc.referenceId = value;
  }
  get completedAt() {
    return this.doc.completedAt;
  }
  set completedAt(value: Date) {
    this.doc.completedAt = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReferenceDomainAdapter implements SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReferenceProps {
  constructor(public readonly doc: SendReportCaseFinanceDetailsTransactionAdhocTransactionFinanceReference) {}
  //Primitive Field Getters and Setters
  get debitGlAccount() {
    return this.doc.debitGlAccount;
  }
  set debitGlAccount(value: string) {
    this.doc.debitGlAccount = value;
  }
  get creditGlAccount() {
    return this.doc.creditGlAccount;
  }
  set creditGlAccount(value: string) {
    this.doc.creditGlAccount = value;
  }
  get completedAt() {
    return this.doc.completedAt;
  }
  set completedAt(value: Date) {
    this.doc.completedAt = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class SendReportCaseV1FinanceDetailsTransactionsDomainAdapter implements SendReportCaseV1FinanceDetailsTransactionsProps {
  constructor(public readonly doc: SendReportCaseFinanceDetailsTransactions) {}
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get submission() {
    if (!this.doc.submission) {
      this.doc.set('submission', {});
    }
    return new SendReportCaseV1FinanceDetailsTransactionSubmissionDomainAdapter(this.doc.submission);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters
  get adhocTransactions() {
    return new MongoosePropArray(this.doc.adhocTransactions, SendReportCaseV1FinanceDetailsTransactionAdhocTransactionDomainAdapter);
  }

  
}export class SendReportCaseV1FinanceDetailsDomainAdapter implements SendReportCaseV1FinanceDetailsProps {
  constructor(public readonly doc: SendReportCaseFinanceDetails) {}
  //Primitive Field Getters and Setters
  get serviceFee() {
    return this.doc.serviceFee;
  }
  set serviceFee(value: number) {
    this.doc.serviceFee = value;
  }

  // Nested Path Getters
  get revenueRecognition() {
    if (!this.doc.revenueRecognition) {
      this.doc.set('revenueRecognition', {});
    }
    return new SendReportCaseV1FinanceDetailsRevenueRecognitionDomainAdapter(this.doc.revenueRecognition);
  }
  get transactions() {
    if (!this.doc.transactions) {
      this.doc.set('transactions', {});
    }
    return new SendReportCaseV1FinanceDetailsTransactionsDomainAdapter(this.doc.transactions);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class SendReportCaseV1SearchDomainAdapter implements SendReportCaseV1SearchProps {
  constructor(public readonly doc: SendReportCaseSearch) {}
  //Primitive Field Getters and Setters
  get hash() {
    return this.doc.hash;
  }
  set hash(value: string) {
    this.doc.hash = value;
  }
  get indexedAt() {
    return this.doc.indexedAt;
  }
  set indexedAt(value: Date) {
    this.doc.indexedAt = value;
  }
  get indexingFailedAt() {
    return this.doc.indexingFailedAt;
  }
  set indexingFailedAt(value: Date) {
    this.doc.indexingFailedAt = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}

// Document Array Domain Adapters
export class SendReportCaseV1CaseHistoryDomainAdapter implements SendReportCaseV1CaseHistoryProps {
  constructor(public readonly props: SendReportCaseCaseHistory) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get caseDetails() {
    if (!this.props.caseDetails) {
      this.props.set('caseDetails', {});
    }
    return new SendReportCaseV1CaseDetailsDomainAdapter(this.props.caseDetails);
  }
  get revisionRequest() {
    if (!this.props.revisionRequest) {
      this.props.set('revisionRequest', {});
    }
    return new SendReportCaseV1RevisionRequestDomainAdapter(this.props.revisionRequest);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

}export class SendReportCaseV1AssetPrivateStatusReportCoverLetterHistoryDomainAdapter implements SendReportCaseV1AssetPrivateStatusReportCoverLetterHistoryProps {
  constructor(public readonly props: SendReportCaseAssetPrivateStatusReportCoverLetterHistory) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }
  //Primitive Field Getters and Setters
  get assetVersion() {
    return this.props.assetVersion;
  }
  set assetVersion(value: string) {
    this.props.assetVersion = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters
  get assetUploadedBy() {
    if (this.props.assetUploadedBy) {
      return new StaffUserDomainAdapter(this.props.assetUploadedBy);
    }
    return undefined;
  }
  setAssetUploadedByRef(assetUploadedBy: StaffUserEntityReference) {
          this.props.set('assetUploadedBy', assetUploadedBy ? assetUploadedBy['props']['doc'] : null);
        }

  // Document Array Getters

}export class SendReportCaseV1AssetPrivateVerificationStatusReportHistoryDomainAdapter implements SendReportCaseV1AssetPrivateVerificationStatusReportHistoryProps {
  constructor(public readonly props: SendReportCaseAssetPrivateVerificationStatusReportHistory) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }
  //Primitive Field Getters and Setters
  get assetVersion() {
    return this.props.assetVersion;
  }
  set assetVersion(value: string) {
    this.props.assetVersion = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters
  get assetUploadedBy() {
    if (this.props.assetUploadedBy) {
      return new StaffUserDomainAdapter(this.props.assetUploadedBy);
    }
    return undefined;
  }
  setAssetUploadedByRef(assetUploadedBy: StaffUserEntityReference) {
          this.props.set('assetUploadedBy', assetUploadedBy ? assetUploadedBy['props']['doc'] : null);
        }

  // Document Array Getters

}export class SendReportCaseV1MessageDomainAdapter implements SendReportCaseV1MessageProps {
  constructor(public readonly props: SendReportCaseMessage) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }
  //Primitive Field Getters and Setters
  get sentBy() {
    return this.props.sentBy;
  }
  set sentBy(value: string) {
    this.props.sentBy = value;
  }
  get message() {
    return this.props.message;
  }
  set message(value: string) {
    this.props.message = value;
  }
  get embedding() {
    return this.props.embedding;
  }
  set embedding(value: string) {
    this.props.embedding = value;
  }
  get isHiddenFromApplicant() {
    return this.props.isHiddenFromApplicant;
  }
  set isHiddenFromApplicant(value: boolean) {
    this.props.isHiddenFromApplicant = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters
  get initiatedBy() {
    if (this.props.initiatedBy) {
      return new StaffUserDomainAdapter(this.props.initiatedBy);
    }
    return undefined;
  }
  setInitiatedByRef(initiatedBy: StaffUserEntityReference) {
          this.props.set('initiatedBy', initiatedBy ? initiatedBy['props']['doc'] : null);
        }

  // Document Array Getters

}export class SendReportCaseV1FinanceDetailsTransactionAdhocTransactionDomainAdapter implements SendReportCaseV1FinanceDetailsTransactionAdhocTransactionProps {
  constructor(public readonly props: SendReportCaseFinanceDetailsTransactionAdhocTransaction) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }
  //Primitive Field Getters and Setters
  get amount() {
    return this.props.amount;
  }
  set amount(value: number) {
    this.props.amount = value;
  }
  get requestedAt() {
    return this.props.requestedAt;
  }
  set requestedAt(value: Date) {
    this.props.requestedAt = value;
  }
  get reason() {
    return this.props.reason;
  }
  set reason(value: string) {
    this.props.reason = value;
  }

  // Nested Path Getters
  get approval() {
    if (!this.props.approval) {
      this.props.set('approval', {});
    }
    return new SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApprovalDomainAdapter(this.props.approval);
  }
  get transactionReference() {
    if (!this.props.transactionReference) {
      this.props.set('transactionReference', {});
    }
    return new SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReferenceDomainAdapter(this.props.transactionReference);
  }
  get financeReference() {
    if (!this.props.financeReference) {
      this.props.set('financeReference', {});
    }
    return new SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReferenceDomainAdapter(this.props.financeReference);
  }

  // Populated Doc Getters and Setters
  get requestedBy() {
    if (this.props.requestedBy) {
      return new StaffUserDomainAdapter(this.props.requestedBy);
    }
    return undefined;
  }
  setRequestedByRef(requestedBy: StaffUserEntityReference) {
    this.props.set('requestedBy', requestedBy['props']['doc']);
  }

  // Document Array Getters

}export class SendReportCaseV1ActivityLogDomainAdapter implements SendReportCaseV1ActivityLogProps {
  constructor(public readonly props: SendReportCaseActivityLog) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }
  //Primitive Field Getters and Setters
  get activityType() {
    return this.props.activityType;
  }
  set activityType(value: string) {
    this.props.activityType = value;
  }
  get description() {
    return this.props.description;
  }
  set description(value: string) {
    this.props.description = value;
  }
  get metaData() {
    return this.props.metaData;
  }
  set metaData(value: string) {
    this.props.metaData = value;
  }
  get tags() {
    return this.props.tags;
  }
  set tags(value: string[]) {
    this.props.tags = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters
  get activityBy() {
    if (this.props.activityBy) {
      return new UserDomainAdapter(this.props.activityBy);
    }
    return undefined;
  }
  setActivityByRef(activityBy: UserEntityReference) {
          this.props.set('activityBy', activityBy ? activityBy['props']['doc'] : null);
        }

  // Document Array Getters

}export class SendReportCaseV1CaseFlaggedDomainAdapter implements SendReportCaseV1CaseFlaggedProps {
  constructor(public readonly props: SendReportCaseCaseFlagged) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }
  //Primitive Field Getters and Setters
  get flagType() {
    return this.props.flagType;
  }
  set flagType(value: string) {
    this.props.flagType = value;
  }
  get reason() {
    return this.props.reason;
  }
  set reason(value: string) {
    this.props.reason = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

}

