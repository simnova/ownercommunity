export interface SendReportCaseV1CaseDetailsApplicationReviewDecisionProps extends ValueObjectProps {
  // Primitive Fields
  completedAt?: Date;
  result?: string;
  rejectionReason?: string;

  // NestedPath Fields

  // PopulateDoc Fields
  readonly completedBy: StaffUserProps;
  setCompletedByRef(completedBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface SendReportCaseV1CaseDetailsApplicationReviewDecisionEntityReference extends Readonly<Omit<SendReportCaseV1CaseDetailsApplicationReviewDecisionProps, 'completedBy' | 'setCompletedByRef'>> {

  readonly completedBy: StaffUserEntityReference;


}

export class SendReportCaseV1CaseDetailsApplicationReviewDecision extends ValueObject<SendReportCaseV1CaseDetailsApplicationReviewDecisionProps> implements SendReportCaseV1CaseDetailsApplicationReviewDecisionEntityReference {
  constructor(props: SendReportCaseV1CaseDetailsApplicationReviewDecisionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
    newProps: SendReportCaseV1CaseDetailsApplicationReviewDecisionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1CaseDetailsApplicationReviewDecision {
      return new SendReportCaseV1CaseDetailsApplicationReviewDecision(newProps, context
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
