export interface IdentityVerificationCaseV1CaseDetailsApplicationPassportDetailsProps extends ValueObjectProps {
  // Primitive Fields
  passportCountry: string;
  passportNumber: string;
  passportIssuedAt: Date;
  passportExpiresAt: Date;
  isPassportExpirationDateVisible: boolean;
  isPassportInLatinCharacters: boolean;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1CaseDetailsApplicationPassportDetailsEntityReference extends Readonly<IdentityVerificationCaseV1CaseDetailsApplicationPassportDetailsProps>{



}

export class IdentityVerificationCaseV1CaseDetailsApplicationPassportDetails extends ValueObject<IdentityVerificationCaseV1CaseDetailsApplicationPassportDetailsProps> implements IdentityVerificationCaseV1CaseDetailsApplicationPassportDetailsEntityReference {
  constructor(props: IdentityVerificationCaseV1CaseDetailsApplicationPassportDetailsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get passportCountry() {
    return this.props.passportCountry;
    }
  get passportNumber() {
    return this.props.passportNumber;
    }
  get passportIssuedAt() {
    return this.props.passportIssuedAt;
    }
  get passportExpiresAt() {
    return this.props.passportExpiresAt;
    }
  get isPassportExpirationDateVisible() {
    return this.props.isPassportExpirationDateVisible;
    }
  get isPassportInLatinCharacters() {
    return this.props.isPassportInLatinCharacters;
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
    newProps: IdentityVerificationCaseV1CaseDetailsApplicationPassportDetailsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1CaseDetailsApplicationPassportDetails {
      return new IdentityVerificationCaseV1CaseDetailsApplicationPassportDetails(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set PassportCountry(value: string) {
    this.props.passportCountry = value;
  }
  set PassportNumber(value: string) {
    this.props.passportNumber = value;
  }
  set PassportIssuedAt(value: Date) {
    this.props.passportIssuedAt = value;
  }
  set PassportExpiresAt(value: Date) {
    this.props.passportExpiresAt = value;
  }
  set IsPassportExpirationDateVisible(value: boolean) {
    this.props.isPassportExpirationDateVisible = value;
  }
  set IsPassportInLatinCharacters(value: boolean) {
    this.props.isPassportInLatinCharacters = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
