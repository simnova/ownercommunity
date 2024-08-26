export interface SendReportCaseV1CaseDetailsApplicationReviewAffirmationProps extends ValueObjectProps {
  // Primitive Fields
  isDestinationAcceptable?: boolean;
  isReportCompiled?: boolean;
  isReportSent?: boolean;

  // NestedPath Fields
  readonly audit: SendReportCaseV1AuditTypeProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1CaseDetailsApplicationReviewAffirmationEntityReference extends Readonly<Omit<SendReportCaseV1CaseDetailsApplicationReviewAffirmationProps, 'audit'>> {
  readonly audit: SendReportCaseV1AuditTypeEntityReference;



}

export class SendReportCaseV1CaseDetailsApplicationReviewAffirmation extends ValueObject<SendReportCaseV1CaseDetailsApplicationReviewAffirmationProps> implements SendReportCaseV1CaseDetailsApplicationReviewAffirmationEntityReference {
  constructor(props: SendReportCaseV1CaseDetailsApplicationReviewAffirmationProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get isDestinationAcceptable() {
    return this.props.isDestinationAcceptable;
    }
  get isReportCompiled() {
    return this.props.isReportCompiled;
    }
  get isReportSent() {
    return this.props.isReportSent;
    }

  // NestedPath Field Getters
  get audit() {
      return new SendReportCaseV1AuditType(this.props.audit, this.context
      //, this.visa
      );
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
    newProps: SendReportCaseV1CaseDetailsApplicationReviewAffirmationProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1CaseDetailsApplicationReviewAffirmation {
      return new SendReportCaseV1CaseDetailsApplicationReviewAffirmation(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set IsDestinationAcceptable(value: boolean) {
    this.props.isDestinationAcceptable = value;
  }
  set IsReportCompiled(value: boolean) {
    this.props.isReportCompiled = value;
  }
  set IsReportSent(value: boolean) {
    this.props.isReportSent = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
