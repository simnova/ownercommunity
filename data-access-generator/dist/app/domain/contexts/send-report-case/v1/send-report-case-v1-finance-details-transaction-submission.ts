export interface SendReportCaseV1FinanceDetailsTransactionSubmissionProps extends ValueObjectProps {
  // Primitive Fields
  amount?: number;

  // NestedPath Fields
  readonly transactionReference: SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReferenceProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1FinanceDetailsTransactionSubmissionEntityReference extends Readonly<Omit<SendReportCaseV1FinanceDetailsTransactionSubmissionProps, 'transactionReference'>> {
  readonly transactionReference: SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReferenceEntityReference;



}

export class SendReportCaseV1FinanceDetailsTransactionSubmission extends ValueObject<SendReportCaseV1FinanceDetailsTransactionSubmissionProps> implements SendReportCaseV1FinanceDetailsTransactionSubmissionEntityReference {
  constructor(props: SendReportCaseV1FinanceDetailsTransactionSubmissionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get amount() {
    return this.props.amount;
    }

  // NestedPath Field Getters
  get transactionReference() {
      return this.props.transactionReference ? new SendReportCaseV1FinanceDetailsTransactionSubmissionTransactionReference(this.props.transactionReference, this.context) : undefined;
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
    newProps: SendReportCaseV1FinanceDetailsTransactionSubmissionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1FinanceDetailsTransactionSubmission {
      return new SendReportCaseV1FinanceDetailsTransactionSubmission(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set Amount(value: number) {
    this.props.amount = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
