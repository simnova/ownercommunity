
export class ApplicantUserConverter extends MongoTypeConverter<DomainExecutionContext, ApplicantUser, ApplicantUserDomainAdapter, ApplicantUserDO<ApplicantUserDomainAdapter>> {
  constructor() {
    super(ApplicantUserDomainAdapter, ApplicantUserDO);
  }
}

export class ApplicantUserDomainAdapter extends MongooseDomainAdapter<ApplicantUser> implements ApplicantUserProps {
  // Primitive Fields Getters and Setters
  get accessBlocked() {
    return this.doc.accessBlocked;
  }
  set accessBlocked(value: boolean) {
    this.doc.accessBlocked = value;
  }
  get tags() {
    return this.doc.tags;
  }
  set tags(value: string[]) {
    this.doc.tags = value;
  }
  get displayName() {
    return this.doc.displayName;
  }
  set displayName(value: string) {
    this.doc.displayName = value;
  }
  get userType() {
    return this.doc.userType;
  }
  set userType(value: string) {
    this.doc.userType = value;
  }
  get externalId() {
    return this.doc.externalId;
  }
  set externalId(value: string) {
    this.doc.externalId = value;
  }
  get isProfileSubmitted() {
    return this.doc.isProfileSubmitted;
  }
  set isProfileSubmitted(value: boolean) {
    this.doc.isProfileSubmitted = value;
  }

  // Nested Path Fields Getters
  get personalInformation() {
    if (!this.doc.personalInformation) {
      this.doc.set('personalInformation', {});
    }
    return new ApplicantUserPersonalInformationDomainAdapter(this.doc.personalInformation);
  }
  get search() {
    if (!this.doc.search) {
      this.doc.set('search', {});
    }
    return new ApplicantUserSearchDomainAdapter(this.doc.search);
  }
  get payment() {
    if (!this.doc.payment) {
      this.doc.set('payment', {});
    }
    return new ApplicantUserPaymentDomainAdapter(this.doc.payment);
  }

  // Populated Doc Fields Getters and Setters

  // Document Array Fields Getters
  get termsAndConditions() {
    return new MongoosePropArray(this.doc.termsAndConditions, ApplicantUserTermsAndConditionDomainAdapter);
  }

}

// Nested Path Domain Adapters
export class ApplicantUserSearchDomainAdapter implements ApplicantUserSearchProps {
  constructor(public readonly doc: ApplicantUserSearch) {}
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

  
}export class ApplicantUserPersonalInformationDomainAdapter implements ApplicantUserPersonalInformationProps {
  constructor(public readonly doc: ApplicantUserPersonalInformation) {}
  //Primitive Field Getters and Setters
  get applyingTo() {
    return this.doc.applyingTo;
  }
  set applyingTo(value: string[]) {
    this.doc.applyingTo = value;
  }

  // Nested Path Getters
  get identityDetails() {
    if (!this.doc.identityDetails) {
      this.doc.set('identityDetails', {});
    }
    return new ApplicantUserIdentityDetailsDomainAdapter(this.doc.identityDetails);
  }
  get contactInformation() {
    if (!this.doc.contactInformation) {
      this.doc.set('contactInformation', {});
    }
    return new ApplicantUserContactInformationDomainAdapter(this.doc.contactInformation);
  }
  get citizenship() {
    if (!this.doc.citizenship) {
      this.doc.set('citizenship', {});
    }
    return new ApplicantUserCitizenshipDomainAdapter(this.doc.citizenship);
  }
  get professional() {
    if (!this.doc.professional) {
      this.doc.set('professional', {});
    }
    return new ApplicantUserProfessionalDomainAdapter(this.doc.professional);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters
  get nameOnDocumentAssets() {
    return new MongoosePropArray(this.doc.nameOnDocumentAssets, ApplicantUserNameOnDocumentAssetDomainAdapter);
  }

  
}export class ApplicantUserProfessionalDomainAdapter implements ApplicantUserProfessionalProps {
  constructor(public readonly doc: ApplicantUserProfessional) {}
  //Primitive Field Getters and Setters
  get healthProfession() {
    return this.doc.healthProfession;
  }
  set healthProfession(value: string) {
    this.doc.healthProfession = value;
  }
  get citizenshipAtTimeEnteredMedicalInstitution() {
    return this.doc.citizenshipAtTimeEnteredMedicalInstitution;
  }
  set citizenshipAtTimeEnteredMedicalInstitution(value: string) {
    this.doc.citizenshipAtTimeEnteredMedicalInstitution = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters
  get primaryEducationalInformation() {
    return new MongoosePropArray(this.doc.primaryEducationalInformation, ApplicantUserPrimaryEducationalInformationDomainAdapter);
  }

  
}export class ApplicantUserOtherIssuingInstitutionDomainAdapter implements ApplicantUserOtherIssuingInstitutionProps {
  constructor(public readonly doc: ApplicantUserOtherIssuingInstitution) {}
  //Primitive Field Getters and Setters
  get name() {
    return this.doc.name;
  }
  set name(value: string) {
    this.doc.name = value;
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

  
}export class ApplicantUserCitizenshipDomainAdapter implements ApplicantUserCitizenshipProps {
  constructor(public readonly doc: ApplicantUserCitizenship) {}
  //Primitive Field Getters and Setters
  get currentCitizenOf() {
    return this.doc.currentCitizenOf;
  }
  set currentCitizenOf(value: string[]) {
    this.doc.currentCitizenOf = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}export class ApplicantUserContactInformationDomainAdapter implements ApplicantUserContactInformationProps {
  constructor(public readonly doc: ApplicantUserContactInformation) {}
  //Primitive Field Getters and Setters
  get emailAddress() {
    return this.doc.emailAddress;
  }
  set emailAddress(value: string) {
    this.doc.emailAddress = value;
  }
  get primaryPhone() {
    return this.doc.primaryPhone;
  }
  set primaryPhone(value: string) {
    this.doc.primaryPhone = value;
  }

  // Nested Path Getters
  get address() {
    if (!this.doc.address) {
      this.doc.set('address', {});
    }
    return new ApplicantUserAddressDomainAdapter(this.doc.address);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters
  get phone() {
    return new MongoosePropArray(this.doc.phone, ApplicantUserPhoneDomainAdapter);
  }

  
}export class ApplicantUserAddressDomainAdapter implements ApplicantUserAddressProps {
  constructor(public readonly doc: ApplicantUserAddress) {}
  //Primitive Field Getters and Setters
  get streetAddressLine1() {
    return this.doc.streetAddressLine1;
  }
  set streetAddressLine1(value: string) {
    this.doc.streetAddressLine1 = value;
  }
  get streetAddressLine2() {
    return this.doc.streetAddressLine2;
  }
  set streetAddressLine2(value: string) {
    this.doc.streetAddressLine2 = value;
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

  
}export class ApplicantUserIdentityDetailsDomainAdapter implements ApplicantUserIdentityDetailsProps {
  constructor(public readonly doc: ApplicantUserIdentityDetails) {}
  //Primitive Field Getters and Setters
  get lastName() {
    return this.doc.lastName;
  }
  set lastName(value: string) {
    this.doc.lastName = value;
  }
  get legalNameConsistsOfOneName() {
    return this.doc.legalNameConsistsOfOneName;
  }
  set legalNameConsistsOfOneName(value: boolean) {
    this.doc.legalNameConsistsOfOneName = value;
  }
  get restOfName() {
    return this.doc.restOfName;
  }
  set restOfName(value: string) {
    this.doc.restOfName = value;
  }
  get generationalSuffix() {
    return this.doc.generationalSuffix;
  }
  set generationalSuffix(value: string) {
    this.doc.generationalSuffix = value;
  }
  get gender() {
    return this.doc.gender;
  }
  set gender(value: string) {
    this.doc.gender = value;
  }
  get dateOfBirth() {
    return this.doc.dateOfBirth;
  }
  set dateOfBirth(value: Date) {
    this.doc.dateOfBirth = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

  
}

// Document Array Domain Adapters
export class ApplicantUserTermsAndConditionsDomainAdapter implements ApplicantUserTermsAndConditionsProps {
  constructor(public readonly props: ApplicantUserTermsAndConditions) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }
  //Primitive Field Getters and Setters
  get acceptanceOf() {
    return this.props.acceptanceOf;
  }
  set acceptanceOf(value: string) {
    this.props.acceptanceOf = value;
  }
  get version() {
    return this.props.version;
  }
  set version(value: number) {
    this.props.version = value;
  }
  get attestedOn() {
    return this.props.attestedOn;
  }
  set attestedOn(value: Date) {
    this.props.attestedOn = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

}export class ApplicantUserNameOnDocumentAssetDomainAdapter implements ApplicantUserNameOnDocumentAssetProps {
  constructor(public readonly props: ApplicantUserNameOnDocumentAsset) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }
  //Primitive Field Getters and Setters
  get documentName() {
    return this.props.documentName;
  }
  set documentName(value: string) {
    this.props.documentName = value;
  }
  get uploadedAt() {
    return this.props.uploadedAt;
  }
  set uploadedAt(value: Date) {
    this.props.uploadedAt = value;
  }
  get isDeleteRequested() {
    return this.props.isDeleteRequested;
  }
  set isDeleteRequested(value: boolean) {
    this.props.isDeleteRequested = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

}export class ApplicantUserPhoneDomainAdapter implements ApplicantUserPhoneProps {
  constructor(public readonly props: ApplicantUserPhone) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }
  //Primitive Field Getters and Setters
  get phoneNumber() {
    return this.props.phoneNumber;
  }
  set phoneNumber(value: string) {
    this.props.phoneNumber = value;
  }
  get phoneType() {
    return this.props.phoneType;
  }
  set phoneType(value: string) {
    this.props.phoneType = value;
  }

  // Nested Path Getters

  // Populated Doc Getters and Setters

  // Document Array Getters

}export class ApplicantUserPrimaryEducationalInformationDomainAdapter implements ApplicantUserPrimaryEducationalInformationProps {
  constructor(public readonly props: ApplicantUserPrimaryEducationalInformation) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }
  //Primitive Field Getters and Setters
  get degreeTitle() {
    return this.props.degreeTitle;
  }
  set degreeTitle(value: string) {
    this.props.degreeTitle = value;
  }
  get attendanceStartDate() {
    return this.props.attendanceStartDate;
  }
  set attendanceStartDate(value: Date) {
    this.props.attendanceStartDate = value;
  }
  get attendanceEndDate() {
    return this.props.attendanceEndDate;
  }
  set attendanceEndDate(value: Date) {
    this.props.attendanceEndDate = value;
  }
  get dateDegreeIssued() {
    return this.props.dateDegreeIssued;
  }
  set dateDegreeIssued(value: Date) {
    this.props.dateDegreeIssued = value;
  }
  get graduationYear() {
    return this.props.graduationYear;
  }
  set graduationYear(value: number) {
    this.props.graduationYear = value;
  }
  get issuingInstitution() {
    return this.props.issuingInstitution;
  }
  set issuingInstitution(value: string) {
    this.props.issuingInstitution = value;
  }

  // Nested Path Getters
  get otherIssuingInstitution() {
    if (!this.props.otherIssuingInstitution) {
      this.props.set('otherIssuingInstitution', {});
    }
    return new ApplicantUserOtherIssuingInstitutionDomainAdapter(this.props.otherIssuingInstitution);
  }

  // Populated Doc Getters and Setters

  // Document Array Getters

}

