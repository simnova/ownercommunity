export interface SendReportCaseV1CaseDetailsApplicationReviewProps extends ValueObjectProps {
  // Primitive Fields

  // NestedPath Fields
  readonly affirmations: SendReportCaseV1CaseDetailsApplicationReviewAffirmationProps;
  readonly privateCaseDetails: SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsProps;
  readonly decision: SendReportCaseV1CaseDetailsApplicationReviewDecisionProps;

  // PopulateDoc Fields
  readonly caseWorkerAssigned: StaffUserProps;
  setCaseWorkerAssignedRef(caseWorkerAssigned: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface SendReportCaseV1CaseDetailsApplicationReviewEntityReference extends Readonly<Omit<SendReportCaseV1CaseDetailsApplicationReviewProps, 'caseWorkerAssigned' | 'setCaseWorkerAssignedRef' | 'affirmations' | 'privateCaseDetails' | 'decision'>> {
  readonly affirmations: SendReportCaseV1CaseDetailsApplicationReviewAffirmationEntityReference;
  readonly privateCaseDetails: SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetailsEntityReference;
  readonly decision: SendReportCaseV1CaseDetailsApplicationReviewDecisionEntityReference;

  readonly caseWorkerAssigned: StaffUserEntityReference;


}

export class SendReportCaseV1CaseDetailsApplicationReview extends ValueObject<SendReportCaseV1CaseDetailsApplicationReviewProps> implements SendReportCaseV1CaseDetailsApplicationReviewEntityReference {
  constructor(props: SendReportCaseV1CaseDetailsApplicationReviewProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get affirmations() {
      return this.props.affirmations ? new SendReportCaseV1CaseDetailsApplicationReviewAffirmation(this.props.affirmations, this.context) : undefined;
    }
  get privateCaseDetails() {
      return this.props.privateCaseDetails ? new SendReportCaseV1CaseDetailsApplicationReviewPrivateCaseDetails(this.props.privateCaseDetails, this.context) : undefined;
    }
  get decision() {
      return this.props.decision ? new SendReportCaseV1CaseDetailsApplicationReviewDecision(this.props.decision, this.context) : undefined;
    }

  // PopulateDoc Field Getters
  get caseWorkerAssigned(): StaffUserEntityReference {
          return new StaffUser(this.props.caseWorkerAssigned, this.context);
        }

  // DocumentArray Field Getters


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: SendReportCaseV1CaseDetailsApplicationReviewProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1CaseDetailsApplicationReview {
      return new SendReportCaseV1CaseDetailsApplicationReview(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters

  // PopulatedDoc Field Setters
  set CaseWorkerAssigned(caseWorkerAssigned: StaffUserEntityReference) {
    this.props.setCaseWorkerAssignedRef(caseWorkerAssigned);
  }

//DocumentArrayFieldSetters: added as needed
}
