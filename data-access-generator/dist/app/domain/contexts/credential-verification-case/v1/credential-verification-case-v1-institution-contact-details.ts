export interface CredentialVerificationCaseV1InstitutionContactDetailsProps extends ValueObjectProps {
  // Primitive Fields
  institutionEmail?: string;
  institutionPhone?: string;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1InstitutionContactDetailsEntityReference extends Readonly<CredentialVerificationCaseV1InstitutionContactDetailsProps>{



}

export class CredentialVerificationCaseV1InstitutionContactDetails extends ValueObject<CredentialVerificationCaseV1InstitutionContactDetailsProps> implements CredentialVerificationCaseV1InstitutionContactDetailsEntityReference {
  constructor(props: CredentialVerificationCaseV1InstitutionContactDetailsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get institutionEmail() {
    return this.props.institutionEmail;
    }
  get institutionPhone() {
    return this.props.institutionPhone;
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
    newProps: CredentialVerificationCaseV1InstitutionContactDetailsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1InstitutionContactDetails {
      return new CredentialVerificationCaseV1InstitutionContactDetails(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set InstitutionEmail(value: string) {
    this.props.institutionEmail = value;
  }
  set InstitutionPhone(value: string) {
    this.props.institutionPhone = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
