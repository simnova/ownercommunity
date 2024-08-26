export interface IdentityVerificationCaseV1CaseDetailsApplicationPassportAssetsProps extends ValueObjectProps {
  // Primitive Fields
  passport?: string;
  passportUploadedAt?: Date;
  passportVersion?: string;
  passportExpiration?: string;
  passportExpirationUploadedAt?: Date;
  passportExpirationVersion?: string;
  passportTranslation?: string;
  passportTranslationUploadedAt?: Date;
  passportTranslationVersion?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1CaseDetailsApplicationPassportAssetsEntityReference extends Readonly<IdentityVerificationCaseV1CaseDetailsApplicationPassportAssetsProps>{



}

export class IdentityVerificationCaseV1CaseDetailsApplicationPassportAssets extends ValueObject<IdentityVerificationCaseV1CaseDetailsApplicationPassportAssetsProps> implements IdentityVerificationCaseV1CaseDetailsApplicationPassportAssetsEntityReference {
  constructor(props: IdentityVerificationCaseV1CaseDetailsApplicationPassportAssetsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get passport() {
    return this.props.passport;
    }
  get passportUploadedAt() {
    return this.props.passportUploadedAt;
    }
  get passportVersion() {
    return this.props.passportVersion;
    }
  get passportExpiration() {
    return this.props.passportExpiration;
    }
  get passportExpirationUploadedAt() {
    return this.props.passportExpirationUploadedAt;
    }
  get passportExpirationVersion() {
    return this.props.passportExpirationVersion;
    }
  get passportTranslation() {
    return this.props.passportTranslation;
    }
  get passportTranslationUploadedAt() {
    return this.props.passportTranslationUploadedAt;
    }
  get passportTranslationVersion() {
    return this.props.passportTranslationVersion;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: IdentityVerificationCaseV1CaseDetailsApplicationPassportAssetsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1CaseDetailsApplicationPassportAssets {
      return new IdentityVerificationCaseV1CaseDetailsApplicationPassportAssets(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set Passport(value: string) {
    this.props.passport = value;
  }
  set PassportUploadedAt(value: Date) {
    this.props.passportUploadedAt = value;
  }
  set PassportVersion(value: string) {
    this.props.passportVersion = value;
  }
  set PassportExpiration(value: string) {
    this.props.passportExpiration = value;
  }
  set PassportExpirationUploadedAt(value: Date) {
    this.props.passportExpirationUploadedAt = value;
  }
  set PassportExpirationVersion(value: string) {
    this.props.passportExpirationVersion = value;
  }
  set PassportTranslation(value: string) {
    this.props.passportTranslation = value;
  }
  set PassportTranslationUploadedAt(value: Date) {
    this.props.passportTranslationUploadedAt = value;
  }
  set PassportTranslationVersion(value: string) {
    this.props.passportTranslationVersion = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
