export interface SendReportCaseV1FinanceDetailsTransactionsProps extends ValueObjectProps {
  // Primitive Fields

  // NestedPath Fields
  readonly submission: SendReportCaseV1FinanceDetailsTransactionSubmissionProps;

  // PopulateDoc Fields

  // DocumentArray Fields
  readonly adhocTransactions: PropArray<SendReportCaseV1FinanceDetailsTransactionAdhocTransactionProps>;

}

export interface SendReportCaseV1FinanceDetailsTransactionsEntityReference extends Readonly<Omit<SendReportCaseV1FinanceDetailsTransactionsProps, 'submission' | 'adhocTransactions'>> {
  readonly submission: SendReportCaseV1FinanceDetailsTransactionSubmissionEntityReference;


  readonly adhocTransactions: ReadonlyArray<SendReportCaseV1FinanceDetailsTransactionAdhocTransactionEntityReference>;

}

export class SendReportCaseV1FinanceDetailsTransactions extends ValueObject<SendReportCaseV1FinanceDetailsTransactionsProps> implements SendReportCaseV1FinanceDetailsTransactionsEntityReference {
  constructor(props: SendReportCaseV1FinanceDetailsTransactionsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get submission() {
      return new SendReportCaseV1FinanceDetailsTransactionSubmission(this.props.submission, this.context
      //, this.visa
      );
    }

  // PopulateDoc Field Getters

  // DocumentArray Field Getters
  get adhocTransactions(): ReadonlyArray<SendReportCaseV1FinanceDetailsTransactionAdhocTransaction> {
    return this.props.adhocTransactions.items.map((item) => new SendReportCaseV1FinanceDetailsTransactionAdhocTransaction(item, this.context
    //, this.visa
    ));
  }


  private validateVisa(): void {
    // modify this to match the permissions required to perform the action
    // if (!this.visa.determineIf((permissions) => (permissions.canManageTickets && permissions.isEditingAssignedTicket) || permissions.isSystemAccount)) {
    //   throw new Error('Unauthorized');
    // }
  }

  static getNewInstance(
    newProps: SendReportCaseV1FinanceDetailsTransactionsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1FinanceDetailsTransactions {
      return new SendReportCaseV1FinanceDetailsTransactions(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
