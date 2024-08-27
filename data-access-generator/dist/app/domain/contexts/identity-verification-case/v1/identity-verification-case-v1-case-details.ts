export interface IdentityVerificationCaseV1CaseDetailsProps extends ValueObjectProps {
  // Primitive Fields
  createdAt: Date;

  // NestedPath Fields
  readonly application: IdentityVerificationCaseV1CaseDetailsApplicationProps;
  readonly applicationReview: IdentityVerificationCaseV1CaseDetailsApplicationReviewProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1CaseDetailsEntityReference extends Readonly<Omit<IdentityVerificationCaseV1CaseDetailsProps, 'application' | 'applicationReview'>> {
  readonly application: IdentityVerificationCaseV1CaseDetailsApplicationEntityReference;
  readonly applicationReview: IdentityVerificationCaseV1CaseDetailsApplicationReviewEntityReference;



}

export class IdentityVerificationCaseV1CaseDetails extends ValueObject<IdentityVerificationCaseV1CaseDetailsProps> implements IdentityVerificationCaseV1CaseDetailsEntityReference {
  constructor(props: IdentityVerificationCaseV1CaseDetailsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get createdAt() {
    return this.props.createdAt;
    }

  // NestedPath Field Getters
  get application() {
      return this.props.application ? new IdentityVerificationCaseV1CaseDetailsApplication(this.props.application, this.context) : undefined;
    }
  get applicationReview() {
      return this.props.applicationReview ? new IdentityVerificationCaseV1CaseDetailsApplicationReview(this.props.applicationReview, this.context) : undefined;
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
    newProps: IdentityVerificationCaseV1CaseDetailsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1CaseDetails {
      return new IdentityVerificationCaseV1CaseDetails(newProps, context
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
