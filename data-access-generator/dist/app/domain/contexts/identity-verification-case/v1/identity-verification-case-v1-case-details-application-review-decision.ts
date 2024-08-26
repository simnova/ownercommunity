export interface IdentityVerificationCaseV1CaseDetailsApplicationReviewDecisionProps extends ValueObjectProps {
  // Primitive Fields
  completedAt: Date;
  result: string;
  rejectionReason?: string;

  // NestedPath Fields

  // PopulateDoc Fields
  readonly completedBy: StaffUserProps;
  setCompletedByRef(completedBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1CaseDetailsApplicationReviewDecisionEntityReference extends Readonly<Omit<IdentityVerificationCaseV1CaseDetailsApplicationReviewDecisionProps, 'completedBy' | 'setCompletedByRef'>> {

  readonly completedBy: StaffUserEntityReference;


}

export class IdentityVerificationCaseV1CaseDetailsApplicationReviewDecision extends ValueObject<IdentityVerificationCaseV1CaseDetailsApplicationReviewDecisionProps> implements IdentityVerificationCaseV1CaseDetailsApplicationReviewDecisionEntityReference {
  constructor(props: IdentityVerificationCaseV1CaseDetailsApplicationReviewDecisionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get completedAt() {
    return this.props.completedAt;
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
          return new StaffUser(this.props.completedBy, this.context);
        }

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: IdentityVerificationCaseV1CaseDetailsApplicationReviewDecisionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1CaseDetailsApplicationReviewDecision {
      return new IdentityVerificationCaseV1CaseDetailsApplicationReviewDecision(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set CompletedAt(value: Date) {
    this.props.completedAt = value;
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
