export interface CredentialVerificationCaseV1ApplicationReviewDecisionProps extends ValueObjectProps {
  // Primitive Fields
  completedOn?: Date;
  result?: string;
  rejectionReason?: string;

  // NestedPath Fields

  // PopulateDoc Fields
  readonly completedBy: StaffUserProps;
  setCompletedByRef(completedBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1ApplicationReviewDecisionEntityReference extends Readonly<Omit<CredentialVerificationCaseV1ApplicationReviewDecisionProps, 'completedBy' | 'setCompletedByRef'>> {

  readonly completedBy: StaffUserEntityReference;


}

export class CredentialVerificationCaseV1ApplicationReviewDecision extends ValueObject<CredentialVerificationCaseV1ApplicationReviewDecisionProps> implements CredentialVerificationCaseV1ApplicationReviewDecisionEntityReference {
  constructor(props: CredentialVerificationCaseV1ApplicationReviewDecisionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get completedOn() {
    return this.props.completedOn;
    }
  get result() {
    return this.props.result;
    }
  get rejectionReason() {
    return this.props.rejectionReason;
    }

  // NestedPath Field Getters

  // PopulateDoc Field Getters
  get completedBy(): StaffUserEntityReference {
          return this.props.completedBy ? new StaffUser(this.props.completedBy, this.context) : undefined;
        }

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: CredentialVerificationCaseV1ApplicationReviewDecisionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1ApplicationReviewDecision {
      return new CredentialVerificationCaseV1ApplicationReviewDecision(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set CompletedOn(value: Date) {
    this.props.completedOn = value;
  }
  set Result(value: string) {
    this.props.result = value;
  }
  set RejectionReason(value: string) {
    this.props.rejectionReason = value;
  }

  // PopulatedDoc Field Setters
  set CompletedBy(completedBy: StaffUserEntityReference) {
    this.props.setCompletedByRef(completedBy);
  }

//DocumentArrayFieldSetters: added as needed
}
