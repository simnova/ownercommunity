
export class CredentialVerificationCaseV1Converter extends MongoTypeConverter<DomainExecutionContext, CredentialVerificationCase, CredentialVerificationCaseV1DomainAdapter, CredentialVerificationCaseV1DO<CredentialVerificationCaseV1DomainAdapter>> {
  constructor() {
    super(CredentialVerificationCaseV1DomainAdapter, CredentialVerificationCaseV1DO);
  }
}

export class CredentialVerificationCaseV1DomainAdapter extends MongooseDomainAdapter<CredentialVerificationCase> implements CredentialVerificationCaseV1Props {
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
    return new CredentialVerificationCaseV1CaseDetailsDomainAdapter(this.doc.caseDetails);
  }
  get assets() {
    if (!this.doc.assets) {
      this.doc.set('assets', {});
    }
    return new CredentialVerificationCaseV1AssetsDomainAdapter(this.doc.assets);
  }
  get revisionRequest() {
    if (!this.doc.revisionRequest) {
      this.doc.set('revisionRequest', {});
    }
    return new CredentialVerificationCaseV1RevisionRequestDomainAdapter(this.doc.revisionRequest);
  }
  get financeDetails() {
    if (!this.doc.financeDetails) {
      this.doc.set('financeDetails', {});
    }
    return new CredentialVerificationCaseV1FinanceDetailsDomainAdapter(this.doc.financeDetails);
  }
  get search() {
    if (!this.doc.search) {
      this.doc.set('search', {});
    }
    return new CredentialVerificationCaseV1SearchDomainAdapter(this.doc.search);
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
    return new MongoosePropArray(this.doc.caseHistory, CredentialVerificationCaseV1CaseHistoryDomainAdapter);
  }
  get messages() {
    return new MongoosePropArray(this.doc.messages, CredentialVerificationCaseV1MessageDomainAdapter);
  }
  get activityLog() {
    return new MongoosePropArray(this.doc.activityLog, CredentialVerificationCaseV1ActivityLogDomainAdapter);
  }
  get caseFlagged() {
    return new MongoosePropArray(this.doc.caseFlagged, CredentialVerificationCaseV1CaseFlaggedDomainAdapter);
  }

}

// Nested Path Domain Adapters
export class CredentialVerificationCaseV1OtherIssuingInstitutionDomainAdapter implements CredentialVerificationCaseV1OtherIssuingInstitutionProps {
  constructor(public readonly doc: CredentialVerificationCaseOtherIssuingInstitution) {}
  //Primitive Field Getters and Setters
  get institutionName() {
    return this.doc.institutionName;
  }
  set institutionName(value: string) {
    this.doc.institutionName = value;
  }
  get addressLine1() {
    return this.doc.addressLine1;
  }
  set addressLine1(value: string) {
    this.doc.addressLine1 = value;
  }
  get city() {
    return this.doc.city;
  }
  set city(value: string) {
    this.doc.city = value;
  }
  get stateOrProvince() {
    return this.doc.stateOrProvince;
  }
  set stateOrProvince(value: string) {
    this.doc.stateOrProvince = value;
  }
  get zipOrPostalCode() {
    return this.doc.zipOrPostalCode;
  }
  set zipOrPostalCode(value: string) {
    this.doc.zipOrPostalCode = value;
  }
  get country() {
    return this.doc.country;
  }
  set country(value: string) {
    this.doc.country = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1CredentialAssetsDomainAdapter implements CredentialVerificationCaseV1CredentialAssetsProps {
  constructor(public readonly doc: CredentialVerificationCaseCredentialAssets) {}
  //Primitive Field Getters and Setters
  get credential() {
    return this.doc.credential;
  }
  set credential(value: string) {
    this.doc.credential = value;
  }
  get credentialUploadedAt() {
    return this.doc.credentialUploadedAt;
  }
  set credentialUploadedAt(value: Date) {
    this.doc.credentialUploadedAt = value;
  }
  get credentialVersion() {
    return this.doc.credentialVersion;
  }
  set credentialVersion(value: string) {
    this.doc.credentialVersion = value;
  }
  get translation() {
    return this.doc.translation;
  }
  set translation(value: string) {
    this.doc.translation = value;
  }
  get translationUploadedAt() {
    return this.doc.translationUploadedAt;
  }
  set translationUploadedAt(value: Date) {
    this.doc.translationUploadedAt = value;
  }
  get translationVersion() {
    return this.doc.translationVersion;
  }
  set translationVersion(value: string) {
    this.doc.translationVersion = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1EntitySuppliedCredentialDomainAdapter implements CredentialVerificationCaseV1EntitySuppliedCredentialProps {
  constructor(public readonly doc: CredentialVerificationCaseEntitySuppliedCredential) {}
  //Primitive Field Getters and Setters
  get credential() {
    return this.doc.credential;
  }
  set credential(value: string) {
    this.doc.credential = value;
  }
  get credentialUploadedAt() {
    return this.doc.credentialUploadedAt;
  }
  set credentialUploadedAt(value: Date) {
    this.doc.credentialUploadedAt = value;
  }
  get credentialVersion() {
    return this.doc.credentialVersion;
  }
  set credentialVersion(value: string) {
    this.doc.credentialVersion = value;
  }
  get translation() {
    return this.doc.translation;
  }
  set translation(value: string) {
    this.doc.translation = value;
  }
  get translationUploadedAt() {
    return this.doc.translationUploadedAt;
  }
  set translationUploadedAt(value: Date) {
    this.doc.translationUploadedAt = value;
  }
  get translationVersion() {
    return this.doc.translationVersion;
  }
  set translationVersion(value: string) {
    this.doc.translationVersion = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1AuditDomainAdapter implements CredentialVerificationCaseV1AuditProps {
  constructor(public readonly doc: CredentialVerificationCaseAudit) {}
  //Primitive Field Getters and Setters
  get completedOn() {
    return this.doc.completedOn;
  }
  set completedOn(value: Date) {
    this.doc.completedOn = value;
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

  
}export class CredentialVerificationCaseV1AffirmationsDomainAdapter implements CredentialVerificationCaseV1AffirmationsProps {
  constructor(public readonly doc: CredentialVerificationCaseAffirmations) {}
  //Primitive Field Getters and Setters
  get isNameAcceptable() {
    return this.doc.isNameAcceptable;
  }
  set isNameAcceptable(value: boolean) {
    this.doc.isNameAcceptable = value;
  }
  get isTranslationAcceptable() {
    return this.doc.isTranslationAcceptable;
  }
  set isTranslationAcceptable(value: boolean) {
    this.doc.isTranslationAcceptable = value;
  }
  get isCredentialAcceptable() {
    return this.doc.isCredentialAcceptable;
  }
  set isCredentialAcceptable(value: boolean) {
    this.doc.isCredentialAcceptable = value;
  }
  get isCredentialDetailsAcceptable() {
    return this.doc.isCredentialDetailsAcceptable;
  }
  set isCredentialDetailsAcceptable(value: boolean) {
    this.doc.isCredentialDetailsAcceptable = value;
  }
  get isDateOfBirthAcceptable() {
    return this.doc.isDateOfBirthAcceptable;
  }
  set isDateOfBirthAcceptable(value: boolean) {
    this.doc.isDateOfBirthAcceptable = value;
  }
  get isEntityAcceptable() {
    return this.doc.isEntityAcceptable;
  }
  set isEntityAcceptable(value: boolean) {
    this.doc.isEntityAcceptable = value;
  }
  get isCredentialSentForVerification() {
    return this.doc.isCredentialSentForVerification;
  }
  set isCredentialSentForVerification(value: boolean) {
    this.doc.isCredentialSentForVerification = value;
  }

  // Nested Path Getters
  get audit() {
    if (!this.doc.audit) {
      this.doc.set('audit', {});
    }
    return new CredentialVerificationCaseV1AuditDomainAdapter(this.doc.audit);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1VerificationAffirmationsDomainAdapter implements CredentialVerificationCaseV1VerificationAffirmationsProps {
  constructor(public readonly doc: CredentialVerificationCaseVerificationAffirmations) {}
  //Primitive Field Getters and Setters
  get isReturnedFromCorrectEntity() {
    return this.doc.isReturnedFromCorrectEntity;
  }
  set isReturnedFromCorrectEntity(value: boolean) {
    this.doc.isReturnedFromCorrectEntity = value;
  }
  get isVerificationMethodAcceptable() {
    return this.doc.isVerificationMethodAcceptable;
  }
  set isVerificationMethodAcceptable(value: boolean) {
    this.doc.isVerificationMethodAcceptable = value;
  }
  get isVerificationComplete() {
    return this.doc.isVerificationComplete;
  }
  set isVerificationComplete(value: boolean) {
    this.doc.isVerificationComplete = value;
  }
  get isVerificationInEnglishOrWithTranslation() {
    return this.doc.isVerificationInEnglishOrWithTranslation;
  }
  set isVerificationInEnglishOrWithTranslation(value: boolean) {
    this.doc.isVerificationInEnglishOrWithTranslation = value;
  }
  get isEntityDetailCorrect() {
    return this.doc.isEntityDetailCorrect;
  }
  set isEntityDetailCorrect(value: boolean) {
    this.doc.isEntityDetailCorrect = value;
  }
  get isCredentialReturnedFromEntity() {
    return this.doc.isCredentialReturnedFromEntity;
  }
  set isCredentialReturnedFromEntity(value: boolean) {
    this.doc.isCredentialReturnedFromEntity = value;
  }
  get isVerificationStatusComplete() {
    return this.doc.isVerificationStatusComplete;
  }
  set isVerificationStatusComplete(value: boolean) {
    this.doc.isVerificationStatusComplete = value;
  }
  get isVerificationComponentPacketCompiled() {
    return this.doc.isVerificationComponentPacketCompiled;
  }
  set isVerificationComponentPacketCompiled(value: boolean) {
    this.doc.isVerificationComponentPacketCompiled = value;
  }

  // Nested Path Getters
  get audit() {
    if (!this.doc.audit) {
      this.doc.set('audit', {});
    }
    return new CredentialVerificationCaseV1AuditDomainAdapter(this.doc.audit);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1InstitutionContactDetailsDomainAdapter implements CredentialVerificationCaseV1InstitutionContactDetailsProps {
  constructor(public readonly doc: CredentialVerificationCaseInstitutionContactDetails) {}
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

  
}export class CredentialVerificationCaseV1AlternateVerifyingEntityDomainAdapter implements CredentialVerificationCaseV1AlternateVerifyingEntityProps {
  constructor(public readonly doc: CredentialVerificationCaseAlternateVerifyingEntity) {}
  //Primitive Field Getters and Setters
  get isVerifiedWithOther() {
    return this.doc.isVerifiedWithOther;
  }
  set isVerifiedWithOther(value: boolean) {
    this.doc.isVerifiedWithOther = value;
  }
  get otherDetails() {
    return this.doc.otherDetails;
  }
  set otherDetails(value: string) {
    this.doc.otherDetails = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1VerificationStatusDomainAdapter implements CredentialVerificationCaseV1VerificationStatusProps {
  constructor(public readonly doc: CredentialVerificationCaseVerificationStatus) {}
  //Primitive Field Getters and Setters
  get verificationResponse() {
    return this.doc.verificationResponse;
  }
  set verificationResponse(value: string) {
    this.doc.verificationResponse = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1PrivateCaseDetailsDomainAdapter implements CredentialVerificationCaseV1PrivateCaseDetailsProps {
  constructor(public readonly doc: CredentialVerificationCasePrivateCaseDetails) {}
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get institutionContactDetails() {
    if (!this.doc.institutionContactDetails) {
      this.doc.set('institutionContactDetails', {});
    }
    return new CredentialVerificationCaseV1InstitutionContactDetailsDomainAdapter(this.doc.institutionContactDetails);
  }
  get alternateVerifyingEntity() {
    if (!this.doc.alternateVerifyingEntity) {
      this.doc.set('alternateVerifyingEntity', {});
    }
    return new CredentialVerificationCaseV1AlternateVerifyingEntityDomainAdapter(this.doc.alternateVerifyingEntity);
  }
  get verificationStatus() {
    if (!this.doc.verificationStatus) {
      this.doc.set('verificationStatus', {});
    }
    return new CredentialVerificationCaseV1VerificationStatusDomainAdapter(this.doc.verificationStatus);
  }
  get entitySuppliedCredential() {
    if (!this.doc.entitySuppliedCredential) {
      this.doc.set('entitySuppliedCredential', {});
    }
    return new CredentialVerificationCaseV1EntitySuppliedCredentialDomainAdapter(this.doc.entitySuppliedCredential);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1ApplicationReviewDecisionDomainAdapter implements CredentialVerificationCaseV1ApplicationReviewDecisionProps {
  constructor(public readonly doc: CredentialVerificationCaseApplicationReviewDecision) {}
  //Primitive Field Getters and Setters
  get completedOn() {
    return this.doc.completedOn;
  }
  set completedOn(value: Date) {
    this.doc.completedOn = value;
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

  
}export class CredentialVerificationCaseV1ApplicationReviewDomainAdapter implements CredentialVerificationCaseV1ApplicationReviewProps {
  constructor(public readonly doc: CredentialVerificationCaseApplicationReview) {}
  //Primitive Field Getters and Setters
  get createdAt() {
    return this.doc.createdAt;
  }
  set createdAt(value: Date) {
    this.doc.createdAt = value;
  }

  // Nested Path Getters
  get affirmations() {
    if (!this.doc.affirmations) {
      this.doc.set('affirmations', {});
    }
    return new CredentialVerificationCaseV1AffirmationsDomainAdapter(this.doc.affirmations);
  }
  get verificationAffirmations() {
    if (!this.doc.verificationAffirmations) {
      this.doc.set('verificationAffirmations', {});
    }
    return new CredentialVerificationCaseV1VerificationAffirmationsDomainAdapter(this.doc.verificationAffirmations);
  }
  get privateCaseDetails() {
    if (!this.doc.privateCaseDetails) {
      this.doc.set('privateCaseDetails', {});
    }
    return new CredentialVerificationCaseV1PrivateCaseDetailsDomainAdapter(this.doc.privateCaseDetails);
  }
  get decision() {
    if (!this.doc.decision) {
      this.doc.set('decision', {});
    }
    return new CredentialVerificationCaseV1ApplicationReviewDecisionDomainAdapter(this.doc.decision);
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

  
}export class CredentialVerificationCaseV1AssetsPrivateDomainAdapter implements CredentialVerificationCaseV1AssetsPrivateProps {
  constructor(public readonly doc: CredentialVerificationCaseAssetsPrivate) {}
  //Primitive Field Getters and Setters
  get verificationForm() {
    return this.doc.verificationForm;
  }
  set verificationForm(value: string) {
    this.doc.verificationForm = value;
  }
  get verificationPacket() {
    return this.doc.verificationPacket;
  }
  set verificationPacket(value: string) {
    this.doc.verificationPacket = value;
  }
  get verificationPacketResponse() {
    return this.doc.verificationPacketResponse;
  }
  set verificationPacketResponse(value: string) {
    this.doc.verificationPacketResponse = value;
  }
  get verificationComponentPacket() {
    return this.doc.verificationComponentPacket;
  }
  set verificationComponentPacket(value: string) {
    this.doc.verificationComponentPacket = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters
  get verificationFormHistory() {
    return new MongoosePropArray(this.doc.verificationFormHistory, CredentialVerificationCaseV1AssetHistoryDomainAdapter);
  }
  get verificationPacketHistory() {
    return new MongoosePropArray(this.doc.verificationPacketHistory, CredentialVerificationCaseV1AssetHistoryDomainAdapter);
  }
  get verificationPacketResponseHistory() {
    return new MongoosePropArray(this.doc.verificationPacketResponseHistory, CredentialVerificationCaseV1AssetHistoryDomainAdapter);
  }
  get verificationComponentPacketHistory() {
    return new MongoosePropArray(this.doc.verificationComponentPacketHistory, CredentialVerificationCaseV1AssetHistoryDomainAdapter);
  }

  
}export class CredentialVerificationCaseV1AssetsDomainAdapter implements CredentialVerificationCaseV1AssetsProps {
  constructor(public readonly doc: CredentialVerificationCaseAssets) {}
  //Primitive Field Getters and Setters
  get arbitrary() {
    return this.doc.arbitrary;
  }
  set arbitrary(value: string) {
    this.doc.arbitrary = value;
  }

  // Nested Path Getters
  get private() {
    if (!this.doc.private) {
      this.doc.set('private', {});
    }
    return new CredentialVerificationCaseV1AssetsPrivateDomainAdapter(this.doc.private);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1RequestedChangesDomainAdapter implements CredentialVerificationCaseV1RequestedChangesProps {
  constructor(public readonly doc: CredentialVerificationCaseRequestedChanges) {}
  //Primitive Field Getters and Setters
  get requestUpdatedCredentialDetails() {
    return this.doc.requestUpdatedCredentialDetails;
  }
  set requestUpdatedCredentialDetails(value: boolean) {
    this.doc.requestUpdatedCredentialDetails = value;
  }
  get requestUploadCredential() {
    return this.doc.requestUploadCredential;
  }
  set requestUploadCredential(value: boolean) {
    this.doc.requestUploadCredential = value;
  }
  get requestUploadTranslation() {
    return this.doc.requestUploadTranslation;
  }
  set requestUploadTranslation(value: boolean) {
    this.doc.requestUploadTranslation = value;
  }
  get requestUpdatedIssuingInstitution() {
    return this.doc.requestUpdatedIssuingInstitution;
  }
  set requestUpdatedIssuingInstitution(value: boolean) {
    this.doc.requestUpdatedIssuingInstitution = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1RevisionRequestDomainAdapter implements CredentialVerificationCaseV1RevisionRequestProps {
  constructor(public readonly doc: CredentialVerificationCaseRevisionRequest) {}
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
    return new CredentialVerificationCaseV1RequestedChangesDomainAdapter(this.doc.requestedChanges);
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

  
}export class CredentialVerificationCaseV1RevenueRecognitionSubmissionDomainAdapter implements CredentialVerificationCaseV1RevenueRecognitionSubmissionProps {
  constructor(public readonly doc: CredentialVerificationCaseRevenueRecognitionSubmission) {}
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
  get recognitionDate() {
    return this.doc.recognitionDate;
  }
  set recognitionDate(value: Date) {
    this.doc.recognitionDate = value;
  }
  get completedOn() {
    return this.doc.completedOn;
  }
  set completedOn(value: Date) {
    this.doc.completedOn = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1RevenueRecognitionRecognitionDomainAdapter implements CredentialVerificationCaseV1RevenueRecognitionRecognitionProps {
  constructor(public readonly doc: CredentialVerificationCaseRevenueRecognitionRecognition) {}
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
  get recognitionDate() {
    return this.doc.recognitionDate;
  }
  set recognitionDate(value: Date) {
    this.doc.recognitionDate = value;
  }
  get completedOn() {
    return this.doc.completedOn;
  }
  set completedOn(value: Date) {
    this.doc.completedOn = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1RevenueRecognitionDomainAdapter implements CredentialVerificationCaseV1RevenueRecognitionProps {
  constructor(public readonly doc: CredentialVerificationCaseRevenueRecognition) {}
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get submission() {
    if (!this.doc.submission) {
      this.doc.set('submission', {});
    }
    return new CredentialVerificationCaseV1RevenueRecognitionSubmissionDomainAdapter(this.doc.submission);
  }
  get recognition() {
    if (!this.doc.recognition) {
      this.doc.set('recognition', {});
    }
    return new CredentialVerificationCaseV1RevenueRecognitionRecognitionDomainAdapter(this.doc.recognition);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1FinanceDetailsDomainAdapter implements CredentialVerificationCaseV1FinanceDetailsProps {
  constructor(public readonly doc: CredentialVerificationCaseFinanceDetails) {}
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
    return new CredentialVerificationCaseV1RevenueRecognitionDomainAdapter(this.doc.revenueRecognition);
  }
  get transactions() {
    if (!this.doc.transactions) {
      this.doc.set('transactions', {});
    }
    return new CredentialVerificationCaseV1FinanceDetailsTransactionsDomainAdapter(this.doc.transactions);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1TransactionReferenceDomainAdapter implements CredentialVerificationCaseV1TransactionReferenceProps {
  constructor(public readonly doc: CredentialVerificationCaseTransactionReference) {}
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
  get completedOn() {
    return this.doc.completedOn;
  }
  set completedOn(value: Date) {
    this.doc.completedOn = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1FinanceDetailsTransactionSubmissionDomainAdapter implements CredentialVerificationCaseV1FinanceDetailsTransactionSubmissionProps {
  constructor(public readonly doc: CredentialVerificationCaseFinanceDetailsTransactionSubmission) {}
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
    return new CredentialVerificationCaseV1TransactionReferenceDomainAdapter(this.doc.transactionReference);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApprovalDomainAdapter implements CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApprovalProps {
  constructor(public readonly doc: CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactionsApproval) {}
  //Primitive Field Getters and Setters
  get isApplicantApprovalRequired() {
    return this.doc.isApplicantApprovalRequired;
  }
  set isApplicantApprovalRequired(value: boolean) {
    this.doc.isApplicantApprovalRequired = value;
  }
  get isAppplantApproved() {
    return this.doc.isAppplantApproved;
  }
  set isAppplantApproved(value: boolean) {
    this.doc.isAppplantApproved = value;
  }
  get applicantRepondedAt() {
    return this.doc.applicantRepondedAt;
  }
  set applicantRepondedAt(value: Date) {
    this.doc.applicantRepondedAt = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReferenceDomainAdapter implements CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReferenceProps {
  constructor(public readonly doc: CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactionsFinanceReference) {}
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
  get completedOn() {
    return this.doc.completedOn;
  }
  set completedOn(value: Date) {
    this.doc.completedOn = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class CredentialVerificationCaseV1FinanceDetailsTransactionsDomainAdapter implements CredentialVerificationCaseV1FinanceDetailsTransactionsProps {
  constructor(public readonly doc: CredentialVerificationCaseFinanceDetailsTransactions) {}
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get submission() {
    if (!this.doc.submission) {
      this.doc.set('submission', {});
    }
    return new CredentialVerificationCaseV1FinanceDetailsTransactionSubmissionDomainAdapter(this.doc.submission);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters
  get adhocTransactions() {
    return new MongoosePropArray(this.doc.adhocTransactions, CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsDomainAdapter);
  }

  
}export class CredentialVerificationCaseV1SearchDomainAdapter implements CredentialVerificationCaseV1SearchProps {
  constructor(public readonly doc: CredentialVerificationCaseSearch) {}
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

  
}export class CredentialVerificationCaseV1ApplicationDomainAdapter implements CredentialVerificationCaseV1ApplicationProps {
  constructor(public readonly doc: CredentialVerificationCaseApplication) {}
  //Primitive Field Getters and Setters
  get attestedAt() {
    return this.doc.attestedAt;
  }
  set attestedAt(value: Date) {
    this.doc.attestedAt = value;
  }
  get credentialTitle() {
    return this.doc.credentialTitle;
  }
  set credentialTitle(value: string) {
    this.doc.credentialTitle = value;
  }
  get program() {
    return this.doc.program;
  }
  set program(value: string) {
    this.doc.program = value;
  }
  get nameOnCredential() {
    return this.doc.nameOnCredential;
  }
  set nameOnCredential(value: string) {
    this.doc.nameOnCredential = value;
  }
  get dateCredentialIssued() {
    return this.doc.dateCredentialIssued;
  }
  set dateCredentialIssued(value: Date) {
    this.doc.dateCredentialIssued = value;
  }
  get credentialType() {
    return this.doc.credentialType;
  }
  set credentialType(value: string) {
    this.doc.credentialType = value;
  }
  get isCredentialInEnglish() {
    return this.doc.isCredentialInEnglish;
  }
  set isCredentialInEnglish(value: boolean) {
    this.doc.isCredentialInEnglish = value;
  }
  get sendDestination() {
    return this.doc.sendDestination;
  }
  set sendDestination(value: string) {
    this.doc.sendDestination = value;
  }

  // Nested Path Getters
  get otherIssuingInstitution() {
    if (!this.doc.otherIssuingInstitution) {
      this.doc.set('otherIssuingInstitution', {});
    }
    return new CredentialVerificationCaseV1OtherIssuingInstitutionDomainAdapter(this.doc.otherIssuingInstitution);
  }
  get credentialAssets() {
    if (!this.doc.credentialAssets) {
      this.doc.set('credentialAssets', {});
    }
    return new CredentialVerificationCaseV1CredentialAssetsDomainAdapter(this.doc.credentialAssets);
  }

  // Populated Doc Getters and Setters
  get issuingInstitution() {
    if (this.doc.issuingInstitution) {
      return new EntityDomainAdapter(this.doc.issuingInstitution);
    }
    return undefined;
  }
  setIssuingInstitutionRef(issuingInstitution: EntityEntityReference) {
          this.doc.set('issuingInstitution', issuingInstitution ? issuingInstitution['props']['doc'] : null);
        }

  // Document Array Getters

  
}export class CredentialVerificationCaseV1CaseDetailsDomainAdapter implements CredentialVerificationCaseV1CaseDetailsProps {
  constructor(public readonly doc: CredentialVerificationCaseCaseDetails) {}
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get application() {
    if (!this.doc.application) {
      this.doc.set('application', {});
    }
    return new CredentialVerificationCaseV1ApplicationDomainAdapter(this.doc.application);
  }
  get applicationReview() {
    if (!this.doc.applicationReview) {
      this.doc.set('applicationReview', {});
    }
    return new CredentialVerificationCaseV1ApplicationReviewDomainAdapter(this.doc.applicationReview);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}

// Document Array Domain Adapters
export class CredentialVerificationCaseV1AssetHistoryDomainAdapter implements CredentialVerificationCaseV1AssetHistoryProps {
  constructor(public readonly props: CredentialVerificationCaseAssetHistory) {}
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

}export class CredentialVerificationCaseV1CaseHistoryDomainAdapter implements CredentialVerificationCaseV1CaseHistoryProps {
  constructor(public readonly props: CredentialVerificationCaseCaseHistory) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }
  //Primitive Field Getters and Setters

  // Nested Path Getters
  get caseDetails() {
    if (!this.props.caseDetails) {
      this.props.set('caseDetails', {});
    }
    return new CredentialVerificationCaseV1CaseDetailsDomainAdapter(this.props.caseDetails);
  }
  get revisionRequest() {
    if (!this.props.revisionRequest) {
      this.props.set('revisionRequest', {});
    }
    return new CredentialVerificationCaseV1RevisionRequestDomainAdapter(this.props.revisionRequest);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

}export class CredentialVerificationCaseV1MessageDomainAdapter implements CredentialVerificationCaseV1MessageProps {
  constructor(public readonly props: CredentialVerificationCaseMessage) {}
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

}export class CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsDomainAdapter implements CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsProps {
  constructor(public readonly props: CredentialVerificationCaseFinanceDetailsTransactionAdhocTransactions) {}
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
  get requestedOn() {
    return this.props.requestedOn;
  }
  set requestedOn(value: Date) {
    this.props.requestedOn = value;
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
    return new CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApprovalDomainAdapter(this.props.approval);
  }
  get transactionReference() {
    if (!this.props.transactionReference) {
      this.props.set('transactionReference', {});
    }
    return new CredentialVerificationCaseV1TransactionReferenceDomainAdapter(this.props.transactionReference);
  }
  get financeReference() {
    if (!this.props.financeReference) {
      this.props.set('financeReference', {});
    }
    return new CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReferenceDomainAdapter(this.props.financeReference);
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

}export class CredentialVerificationCaseV1ActivityLogDomainAdapter implements CredentialVerificationCaseV1ActivityLogProps {
  constructor(public readonly props: CredentialVerificationCaseActivityLog) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }
  //Primitive Field Getters and Setters
  get activity() {
    return this.props.activity;
  }
  set activity(value: string) {
    this.props.activity = value;
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

}export class CredentialVerificationCaseV1CaseFlaggedDomainAdapter implements CredentialVerificationCaseV1CaseFlaggedProps {
  constructor(public readonly props: CredentialVerificationCaseCaseFlagged) {}
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

