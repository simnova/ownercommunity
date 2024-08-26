
export class IdentityVerificationCaseV1Converter extends MongoTypeConverter<DomainExecutionContext, IdentityVerificationCase, IdentityVerificationCaseV1DomainAdapter, IdentityVerificationCaseV1DO<IdentityVerificationCaseV1DomainAdapter>> {
  constructor() {
    super(IdentityVerificationCaseV1DomainAdapter, IdentityVerificationCaseV1DO);
  }
}

export class IdentityVerificationCaseV1DomainAdapter extends MongooseDomainAdapter<IdentityVerificationCase> implements IdentityVerificationCaseV1Props {
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
    return new IdentityVerificationCaseV1CaseDetailsDomainAdapter(this.doc.caseDetails);
  }
  get revisionRequest() {
    if (!this.doc.revisionRequest) {
      this.doc.set('revisionRequest', {});
    }
    return new IdentityVerificationCaseV1RevisionRequestDomainAdapter(this.doc.revisionRequest);
  }
  get assets() {
    if (!this.doc.assets) {
      this.doc.set('assets', {});
    }
    return new IdentityVerificationCaseV1AssetsDomainAdapter(this.doc.assets);
  }
  get financeDetails() {
    if (!this.doc.financeDetails) {
      this.doc.set('financeDetails', {});
    }
    return new IdentityVerificationCaseV1FinanceDetailsDomainAdapter(this.doc.financeDetails);
  }
  get search() {
    if (!this.doc.search) {
      this.doc.set('search', {});
    }
    return new IdentityVerificationCaseV1SearchDomainAdapter(this.doc.search);
  }

  // Populated Doc Fields Getters and Setters
  get applicant() {
    if (this.doc.applicant) {
      return new ApplicantUserDomainAdapter(this.doc.applicant);
    }
    return undefined;
  }
  setApplicantRef(applicant: ApplicantUserEntityReference) {
    this.doc.set('applicant', applicant['props']['doc']);
  }

  // Document Array Fields Getters
  get caseHistory() {
    return new MongoosePropArray(this.doc.caseHistory, IdentityVerificationCaseV1CaseHistoryDomainAdapter);
  }
  get messages() {
    return new MongoosePropArray(this.doc.messages, IdentityVerificationCaseV1MessageDomainAdapter);
  }
  get activityLog() {
    return new MongoosePropArray(this.doc.activityLog, IdentityVerificationCaseV1ActivityLogDomainAdapter);
  }
  get caseFlagged() {
    return new MongoosePropArray(this.doc.caseFlagged, IdentityVerificationCaseV1CaseFlaggedDomainAdapter);
  }

}

// Nested Path Domain Adapters
export class IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssetsDomainAdapter implements IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssetsProps {
  constructor(public readonly doc: IdentityVerificationCaseCaseDetailsApplicationPhotoAssets) {}
  //Primitive Field Getters and Setters
  get photo() {
    return this.doc.photo;
  }
  set photo(value: string) {
    this.doc.photo = value;
  }
  get photoUploadedAt() {
    return this.doc.photoUploadedAt;
  }
  set photoUploadedAt(value: Date) {
    this.doc.photoUploadedAt = value;
  }
  get photoVersion() {
    return this.doc.photoVersion;
  }
  set photoVersion(value: string) {
    this.doc.photoVersion = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class IdentityVerificationCaseV1CaseDetailsApplicationPassportDetailsDomainAdapter implements IdentityVerificationCaseV1CaseDetailsApplicationPassportDetailsProps {
  constructor(public readonly doc: IdentityVerificationCaseCaseDetailsApplicationPassportDetails) {}
  //Primitive Field Getters and Setters
  get passportCountry() {
    return this.doc.passportCountry;
  }
  set passportCountry(value: string) {
    this.doc.passportCountry = value;
  }
  get passportNumber() {
    return this.doc.passportNumber;
  }
  set passportNumber(value: string) {
    this.doc.passportNumber = value;
  }
  get passportIssuedAt() {
    return this.doc.passportIssuedAt;
  }
  set passportIssuedAt(value: Date) {
    this.doc.passportIssuedAt = value;
  }
  get passportExpiresAt() {
    return this.doc.passportExpiresAt;
  }
  set passportExpiresAt(value: Date) {
    this.doc.passportExpiresAt = value;
  }
  get isPassportExpirationDateVisible() {
    return this.doc.isPassportExpirationDateVisible;
  }
  set isPassportExpirationDateVisible(value: boolean) {
    this.doc.isPassportExpirationDateVisible = value;
  }
  get isPassportInLatinCharacters() {
    return this.doc.isPassportInLatinCharacters;
  }
  set isPassportInLatinCharacters(value: boolean) {
    this.doc.isPassportInLatinCharacters = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class IdentityVerificationCaseV1CaseDetailsApplicationPassportAssetsDomainAdapter implements IdentityVerificationCaseV1CaseDetailsApplicationPassportAssetsProps {
  constructor(public readonly doc: IdentityVerificationCaseCaseDetailsApplicationPassportAssets) {}
  //Primitive Field Getters and Setters
  get passport() {
    return this.doc.passport;
  }
  set passport(value: string) {
    this.doc.passport = value;
  }
  get passportUploadedAt() {
    return this.doc.passportUploadedAt;
  }
  set passportUploadedAt(value: Date) {
    this.doc.passportUploadedAt = value;
  }
  get passportVersion() {
    return this.doc.passportVersion;
  }
  set passportVersion(value: string) {
    this.doc.passportVersion = value;
  }
  get passportExpiration() {
    return this.doc.passportExpiration;
  }
  set passportExpiration(value: string) {
    this.doc.passportExpiration = value;
  }
  get passportExpirationUploadedAt() {
    return this.doc.passportExpirationUploadedAt;
  }
  set passportExpirationUploadedAt(value: Date) {
    this.doc.passportExpirationUploadedAt = value;
  }
  get passportExpirationVersion() {
    return this.doc.passportExpirationVersion;
  }
  set passportExpirationVersion(value: string) {
    this.doc.passportExpirationVersion = value;
  }
  get passportTranslation() {
    return this.doc.passportTranslation;
  }
  set passportTranslation(value: string) {
    this.doc.passportTranslation = value;
  }
  get passportTranslationUploadedAt() {
    return this.doc.passportTranslationUploadedAt;
  }
  set passportTranslationUploadedAt(value: Date) {
    this.doc.passportTranslationUploadedAt = value;
  }
  get passportTranslationVersion() {
    return this.doc.passportTranslationVersion;
  }
  set passportTranslationVersion(value: string) {
    this.doc.passportTranslationVersion = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetailsDomainAdapter implements IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetailsProps {
  constructor(public readonly doc: IdentityVerificationCaseCaseDetailsApplicationNotarizationDetails) {}
  //Primitive Field Getters and Setters
  get isNotarizationComplete() {
    return this.doc.isNotarizationComplete;
  }
  set isNotarizationComplete(value: boolean) {
    this.doc.isNotarizationComplete = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class IdentityVerificationCaseV1CaseDetailsApplicationDomainAdapter implements IdentityVerificationCaseV1CaseDetailsApplicationProps {
  constructor(public readonly doc: IdentityVerificationCaseCaseDetailsApplication) {}
  //Primitive Field Getters and Setters
  get attestedAt() {
    return this.doc.attestedAt;
  }
  set attestedAt(value: Date) {
    this.doc.attestedAt = value;
  }
  get caseWorkerModifiedPassportDetails() {
    return this.doc.caseWorkerModifiedPassportDetails;
  }
  set caseWorkerModifiedPassportDetails(value: boolean) {
    this.doc.caseWorkerModifiedPassportDetails = value;
  }

  // Nested Path Getters
  get photoAssets() {
    if (!this.doc.photoAssets) {
      this.doc.set('photoAssets', {});
    }
    return new IdentityVerificationCaseV1CaseDetailsApplicationPhotoAssetsDomainAdapter(this.doc.photoAssets);
  }
  get passportDetails() {
    if (!this.doc.passportDetails) {
      this.doc.set('passportDetails', {});
    }
    return new IdentityVerificationCaseV1CaseDetailsApplicationPassportDetailsDomainAdapter(this.doc.passportDetails);
  }
  get passportAssets() {
    if (!this.doc.passportAssets) {
      this.doc.set('passportAssets', {});
    }
    return new IdentityVerificationCaseV1CaseDetailsApplicationPassportAssetsDomainAdapter(this.doc.passportAssets);
  }
  get notarizationDetails() {
    if (!this.doc.notarizationDetails) {
      this.doc.set('notarizationDetails', {});
    }
    return new IdentityVerificationCaseV1CaseDetailsApplicationNotarizationDetailsDomainAdapter(this.doc.notarizationDetails);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAuditDomainAdapter implements IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAuditProps {
  constructor(public readonly doc: IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmationsAudit) {}
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
    this.doc.set('completedBy', completedBy['props']['doc']);
  }

  // Document Array Getters

  
}export class IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsDomainAdapter implements IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsProps {
  constructor(public readonly doc: IdentityVerificationCaseCaseDetailsApplicationReviewNotaryAffirmations) {}
  //Primitive Field Getters and Setters
  get isNotaryAcceptable() {
    return this.doc.isNotaryAcceptable;
  }
  set isNotaryAcceptable(value: boolean) {
    this.doc.isNotaryAcceptable = value;
  }
  get isNotarizedIdAcceptable() {
    return this.doc.isNotarizedIdAcceptable;
  }
  set isNotarizedIdAcceptable(value: boolean) {
    this.doc.isNotarizedIdAcceptable = value;
  }

  // Nested Path Getters
  get audit() {
    if (!this.doc.audit) {
      this.doc.set('audit', {});
    }
    return new IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsAuditDomainAdapter(this.doc.audit);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAuditDomainAdapter implements IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAuditProps {
  constructor(public readonly doc: IdentityVerificationCaseCaseDetailsApplicationReviewAffirmationsAudit) {}
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
    this.doc.set('completedBy', completedBy['props']['doc']);
  }

  // Document Array Getters

  
}export class IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsDomainAdapter implements IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsProps {
  constructor(public readonly doc: IdentityVerificationCaseCaseDetailsApplicationReviewAffirmations) {}
  //Primitive Field Getters and Setters
  get isIdDocumentAcceptable() {
    return this.doc.isIdDocumentAcceptable;
  }
  set isIdDocumentAcceptable(value: boolean) {
    this.doc.isIdDocumentAcceptable = value;
  }
  get isIdDocumentDetailsAcceptable() {
    return this.doc.isIdDocumentDetailsAcceptable;
  }
  set isIdDocumentDetailsAcceptable(value: boolean) {
    this.doc.isIdDocumentDetailsAcceptable = value;
  }
  get isPhotoAcceptable() {
    return this.doc.isPhotoAcceptable;
  }
  set isPhotoAcceptable(value: boolean) {
    this.doc.isPhotoAcceptable = value;
  }

  // Nested Path Getters
  get audit() {
    if (!this.doc.audit) {
      this.doc.set('audit', {});
    }
    return new IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsAuditDomainAdapter(this.doc.audit);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class IdentityVerificationCaseV1CaseDetailsApplicationReviewDecisionDomainAdapter implements IdentityVerificationCaseV1CaseDetailsApplicationReviewDecisionProps {
  constructor(public readonly doc: IdentityVerificationCaseCaseDetailsApplicationReviewDecision) {}
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
    this.doc.set('completedBy', completedBy['props']['doc']);
  }

  // Document Array Getters

  
}export class IdentityVerificationCaseV1CaseDetailsApplicationReviewDomainAdapter implements IdentityVerificationCaseV1CaseDetailsApplicationReviewProps {
  constructor(public readonly doc: IdentityVerificationCaseCaseDetailsApplicationReview) {}
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get affirmations() {
    if (!this.doc.affirmations) {
      this.doc.set('affirmations', {});
    }
    return new IdentityVerificationCaseV1CaseDetailsApplicationReviewAffirmationsDomainAdapter(this.doc.affirmations);
  }
  get notaryAffirmations() {
    if (!this.doc.notaryAffirmations) {
      this.doc.set('notaryAffirmations', {});
    }
    return new IdentityVerificationCaseV1CaseDetailsApplicationReviewNotaryAffirmationsDomainAdapter(this.doc.notaryAffirmations);
  }
  get decision() {
    if (!this.doc.decision) {
      this.doc.set('decision', {});
    }
    return new IdentityVerificationCaseV1CaseDetailsApplicationReviewDecisionDomainAdapter(this.doc.decision);
  }

  // Populated Doc Getters and Setters
  get caseWorkerAssigned() {
    if (this.doc.caseWorkerAssigned) {
      return new StaffUserDomainAdapter(this.doc.caseWorkerAssigned);
    }
    return undefined;
  }
  setCaseWorkerAssignedRef(caseWorkerAssigned: StaffUserEntityReference) {
          this.doc.set('caseWorkerAssigned', caseWorkerAssigned ? caseWorkerAssigned['props']['doc'] : null);
        }

  // Document Array Getters

  
}export class IdentityVerificationCaseV1CaseDetailsDomainAdapter implements IdentityVerificationCaseV1CaseDetailsProps {
  constructor(public readonly doc: IdentityVerificationCaseCaseDetails) {}
  //Primitive Field Getters and Setters
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
    return new IdentityVerificationCaseV1CaseDetailsApplicationDomainAdapter(this.doc.application);
  }
  get applicationReview() {
    if (!this.doc.applicationReview) {
      this.doc.set('applicationReview', {});
    }
    return new IdentityVerificationCaseV1CaseDetailsApplicationReviewDomainAdapter(this.doc.applicationReview);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class IdentityVerificationCaseV1RevisionRequestRequestedChangesDomainAdapter implements IdentityVerificationCaseV1RevisionRequestRequestedChangesProps {
  constructor(public readonly doc: IdentityVerificationCaseRevisionRequestRequestedChanges) {}
  //Primitive Field Getters and Setters
  get requestUpdatedPassportDetails() {
    return this.doc.requestUpdatedPassportDetails;
  }
  set requestUpdatedPassportDetails(value: boolean) {
    this.doc.requestUpdatedPassportDetails = value;
  }
  get requestUploadPassport() {
    return this.doc.requestUploadPassport;
  }
  set requestUploadPassport(value: boolean) {
    this.doc.requestUploadPassport = value;
  }
  get requestUploadExpirationPage() {
    return this.doc.requestUploadExpirationPage;
  }
  set requestUploadExpirationPage(value: boolean) {
    this.doc.requestUploadExpirationPage = value;
  }
  get requestUploadPassportTranslation() {
    return this.doc.requestUploadPassportTranslation;
  }
  set requestUploadPassportTranslation(value: boolean) {
    this.doc.requestUploadPassportTranslation = value;
  }
  get requestUploadPhoto() {
    return this.doc.requestUploadPhoto;
  }
  set requestUploadPhoto(value: boolean) {
    this.doc.requestUploadPhoto = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class IdentityVerificationCaseV1RevisionRequestDomainAdapter implements IdentityVerificationCaseV1RevisionRequestProps {
  constructor(public readonly doc: IdentityVerificationCaseRevisionRequest) {}
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
    return new IdentityVerificationCaseV1RevisionRequestRequestedChangesDomainAdapter(this.doc.requestedChanges);
  }

  // Populated Doc Getters and Setters
  get requestedBy() {
    if (this.doc.requestedBy) {
      return new StaffUserDomainAdapter(this.doc.requestedBy);
    }
    return undefined;
  }
  setRequestedByRef(requestedBy: StaffUserEntityReference) {
    this.doc.set('requestedBy', requestedBy['props']['doc']);
  }

  // Document Array Getters

  
}export class IdentityVerificationCaseV1AssetsPrivateDomainAdapter implements IdentityVerificationCaseV1AssetsPrivateProps {
  constructor(public readonly doc: IdentityVerificationCaseAssetsPrivate) {}
  //Primitive Field Getters and Setters
  get redactedNotarizedIdForm() {
    return this.doc.redactedNotarizedIdForm;
  }
  set redactedNotarizedIdForm(value: string) {
    this.doc.redactedNotarizedIdForm = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters
  get redactedNotarizedIdFormHistory() {
    return new MongoosePropArray(this.doc.redactedNotarizedIdFormHistory, IdentityVerificationCaseV1AssetsPrivateRedactedNotarizedIdFormHistoryDomainAdapter);
  }

  
}export class IdentityVerificationCaseV1AssetsSharedDomainAdapter implements IdentityVerificationCaseV1AssetsSharedProps {
  constructor(public readonly doc: IdentityVerificationCaseAssetsShared) {}
  //Primitive Field Getters and Setters
  get idForm() {
    return this.doc.idForm;
  }
  set idForm(value: string) {
    this.doc.idForm = value;
  }
  get notarizedIdForm() {
    return this.doc.notarizedIdForm;
  }
  set notarizedIdForm(value: string) {
    this.doc.notarizedIdForm = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters
  get idFormHistory() {
    return new MongoosePropArray(this.doc.idFormHistory, IdentityVerificationCaseV1AssetsSharedIdFormHistoryDomainAdapter);
  }
  get notarizedIdFormHistory() {
    return new MongoosePropArray(this.doc.notarizedIdFormHistory, IdentityVerificationCaseV1AssetsSharedNotarizedIdFormHistoryDomainAdapter);
  }

  
}export class IdentityVerificationCaseV1AssetsDomainAdapter implements IdentityVerificationCaseV1AssetsProps {
  constructor(public readonly doc: IdentityVerificationCaseAssets) {}
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get shared() {
    if (!this.doc.shared) {
      this.doc.set('shared', {});
    }
    return new IdentityVerificationCaseV1AssetsSharedDomainAdapter(this.doc.shared);
  }
  get private() {
    if (!this.doc.private) {
      this.doc.set('private', {});
    }
    return new IdentityVerificationCaseV1AssetsPrivateDomainAdapter(this.doc.private);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReferenceDomainAdapter implements IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReferenceProps {
  constructor(public readonly doc: IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionFinanceReference) {}
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

  
}export class IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReferenceDomainAdapter implements IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReferenceProps {
  constructor(public readonly doc: IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionTransactionReference) {}
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

  
}export class IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionApprovalDomainAdapter implements IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionApprovalProps {
  constructor(public readonly doc: IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransactionApproval) {}
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

  
}export class IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReferenceDomainAdapter implements IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReferenceProps {
  constructor(public readonly doc: IdentityVerificationCaseFinanceDetailsTransactionsSubmissionTransactionReference) {}
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

  
}export class IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionDomainAdapter implements IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionProps {
  constructor(public readonly doc: IdentityVerificationCaseFinanceDetailsTransactionsSubmission) {}
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
    return new IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReferenceDomainAdapter(this.doc.transactionReference);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class IdentityVerificationCaseV1FinanceDetailsTransactionsDomainAdapter implements IdentityVerificationCaseV1FinanceDetailsTransactionsProps {
  constructor(public readonly doc: IdentityVerificationCaseFinanceDetailsTransactions) {}
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get submission() {
    if (!this.doc.submission) {
      this.doc.set('submission', {});
    }
    return new IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionDomainAdapter(this.doc.submission);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters
  get adhocTransactions() {
    return new MongoosePropArray(this.doc.adhocTransactions, IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionDomainAdapter);
  }

  
}export class IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmissionDomainAdapter implements IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmissionProps {
  constructor(public readonly doc: IdentityVerificationCaseFinanceDetailsRevenueRecognitionSubmission) {}
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

  
}export class IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionRecognitionDomainAdapter implements IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionRecognitionProps {
  constructor(public readonly doc: IdentityVerificationCaseFinanceDetailsRevenueRecognitionRecognition) {}
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

  
}export class IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionDomainAdapter implements IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionProps {
  constructor(public readonly doc: IdentityVerificationCaseFinanceDetailsRevenueRecognition) {}
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get submission() {
    if (!this.doc.submission) {
      this.doc.set('submission', {});
    }
    return new IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionSubmissionDomainAdapter(this.doc.submission);
  }
  get recognition() {
    if (!this.doc.recognition) {
      this.doc.set('recognition', {});
    }
    return new IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionRecognitionDomainAdapter(this.doc.recognition);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class IdentityVerificationCaseV1FinanceDetailsDomainAdapter implements IdentityVerificationCaseV1FinanceDetailsProps {
  constructor(public readonly doc: IdentityVerificationCaseFinanceDetails) {}
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
    return new IdentityVerificationCaseV1FinanceDetailsRevenueRecognitionDomainAdapter(this.doc.revenueRecognition);
  }
  get transactions() {
    if (!this.doc.transactions) {
      this.doc.set('transactions', {});
    }
    return new IdentityVerificationCaseV1FinanceDetailsTransactionsDomainAdapter(this.doc.transactions);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class IdentityVerificationCaseV1SearchDomainAdapter implements IdentityVerificationCaseV1SearchProps {
  constructor(public readonly doc: IdentityVerificationCaseSearch) {}
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
export class IdentityVerificationCaseV1CaseHistoryDomainAdapter implements IdentityVerificationCaseV1CaseHistoryProps {
  constructor(public readonly props: IdentityVerificationCaseCaseHistory) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get caseDetails() {
    if (!this.props.caseDetails) {
      this.props.set('caseDetails', {});
    }
    return new IdentityVerificationCaseV1CaseDetailsDomainAdapter(this.props.caseDetails);
  }
  get revisionRequest() {
    if (!this.props.revisionRequest) {
      this.props.set('revisionRequest', {});
    }
    return new IdentityVerificationCaseV1RevisionRequestDomainAdapter(this.props.revisionRequest);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

}export class IdentityVerificationCaseV1AssetsPrivateRedactedNotarizedIdFormHistoryDomainAdapter implements IdentityVerificationCaseV1AssetsPrivateRedactedNotarizedIdFormHistoryProps {
  constructor(public readonly props: IdentityVerificationCaseAssetsPrivateRedactedNotarizedIdFormHistory) {}
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
      return new UserDomainAdapter(this.props.assetUploadedBy);
    }
    return undefined;
  }
  setAssetUploadedByRef(assetUploadedBy: UserEntityReference) {
    this.props.set('assetUploadedBy', assetUploadedBy['props']['doc']);
  }

  // Document Array Getters

}export class IdentityVerificationCaseV1AssetsSharedNotarizedIdFormHistoryDomainAdapter implements IdentityVerificationCaseV1AssetsSharedNotarizedIdFormHistoryProps {
  constructor(public readonly props: IdentityVerificationCaseAssetsSharedNotarizedIdFormHistory) {}
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
      return new UserDomainAdapter(this.props.assetUploadedBy);
    }
    return undefined;
  }
  setAssetUploadedByRef(assetUploadedBy: UserEntityReference) {
    this.props.set('assetUploadedBy', assetUploadedBy['props']['doc']);
  }

  // Document Array Getters

}export class IdentityVerificationCaseV1AssetsSharedIdFormHistoryDomainAdapter implements IdentityVerificationCaseV1AssetsSharedIdFormHistoryProps {
  constructor(public readonly props: IdentityVerificationCaseAssetsSharedIdFormHistory) {}
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
      return new UserDomainAdapter(this.props.assetUploadedBy);
    }
    return undefined;
  }
  setAssetUploadedByRef(assetUploadedBy: UserEntityReference) {
    this.props.set('assetUploadedBy', assetUploadedBy['props']['doc']);
  }

  // Document Array Getters

}export class IdentityVerificationCaseV1MessageDomainAdapter implements IdentityVerificationCaseV1MessageProps {
  constructor(public readonly props: IdentityVerificationCaseMessage) {}
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

}export class IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionDomainAdapter implements IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionProps {
  constructor(public readonly props: IdentityVerificationCaseFinanceDetailsTransactionsAdhocTransaction) {}
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
    return new IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionApprovalDomainAdapter(this.props.approval);
  }
  get transactionReference() {
    if (!this.props.transactionReference) {
      this.props.set('transactionReference', {});
    }
    return new IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReferenceDomainAdapter(this.props.transactionReference);
  }
  get financeReference() {
    if (!this.props.financeReference) {
      this.props.set('financeReference', {});
    }
    return new IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReferenceDomainAdapter(this.props.financeReference);
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

}export class IdentityVerificationCaseV1ActivityLogDomainAdapter implements IdentityVerificationCaseV1ActivityLogProps {
  constructor(public readonly props: IdentityVerificationCaseActivityLog) {}
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

}export class IdentityVerificationCaseV1CaseFlaggedDomainAdapter implements IdentityVerificationCaseV1CaseFlaggedProps {
  constructor(public readonly props: IdentityVerificationCaseCaseFlagged) {}
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

