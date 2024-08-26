export interface CredentialVerificationCaseV1CaseDetailsProps extends ValueObjectProps {
  // Primitive Fields
  createdAt?: Date;

  // NestedPath Fields
  readonly application: CredentialVerificationCaseV1ApplicationProps;
  readonly applicationReview: CredentialVerificationCaseV1ApplicationReviewProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1CaseDetailsEntityReference extends Readonly<Omit<CredentialVerificationCaseV1CaseDetailsProps, 'application' | 'applicationReview'>> {
  readonly application: CredentialVerificationCaseV1ApplicationEntityReference;
  readonly applicationReview: CredentialVerificationCaseV1ApplicationReviewEntityReference;



}

export class CredentialVerificationCaseV1CaseDetails extends ValueObject<CredentialVerificationCaseV1CaseDetailsProps> implements CredentialVerificationCaseV1CaseDetailsEntityReference {
  constructor(props: CredentialVerificationCaseV1CaseDetailsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get createdAt() {
    return this.props.createdAt;
    }

  // NestedPath Field Getters
  get application() {
      return this.props.application ? new CredentialVerificationCaseV1Application(this.props.application, this.context) : undefined;
    }
  get applicationReview() {
      return this.props.applicationReview ? new CredentialVerificationCaseV1ApplicationReview(this.props.applicationReview, this.context) : undefined;
    }

  // PopulateDoc Field Getters

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: CredentialVerificationCaseV1CaseDetailsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1CaseDetails {
      return new CredentialVerificationCaseV1CaseDetails(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set CreatedAt(value: Date) {
    this.props.createdAt = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
