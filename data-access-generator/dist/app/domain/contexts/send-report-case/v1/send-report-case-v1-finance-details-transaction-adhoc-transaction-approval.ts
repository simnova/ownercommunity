export interface SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApprovalProps extends ValueObjectProps {
  // Primitive Fields
  isApplicantApprovalRequired?: boolean;
  isApplicantApproved?: boolean;
  applicantRespondedAt?: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApprovalEntityReference extends Readonly<SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApprovalProps>{



}

export class SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApproval extends ValueObject<SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApprovalProps> implements SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApprovalEntityReference {
  constructor(props: SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApprovalProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get isApplicantApprovalRequired() {
    return this.props.isApplicantApprovalRequired;
    }
  get isApplicantApproved() {
    return this.props.isApplicantApproved;
    }
  get applicantRespondedAt() {
    return this.props.applicantRespondedAt;
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
    newProps: SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApprovalProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApproval {
      return new SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApproval(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set IsApplicantApprovalRequired(value: boolean) {
    this.props.isApplicantApprovalRequired = value;
  }
  set IsApplicantApproved(value: boolean) {
    this.props.isApplicantApproved = value;
  }
  set ApplicantRespondedAt(value: Date) {
    this.props.applicantRespondedAt = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
