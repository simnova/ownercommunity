export interface SendReportCaseV1FinanceDetailsProps extends ValueObjectProps {
  // Primitive Fields
  serviceFee?: number;

  // NestedPath Fields
  readonly revenueRecognition: SendReportCaseV1FinanceDetailsRevenueRecognitionProps;
  readonly transactions: SendReportCaseV1FinanceDetailsTransactionsProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1FinanceDetailsEntityReference extends Readonly<Omit<SendReportCaseV1FinanceDetailsProps, 'revenueRecognition' | 'transactions'>> {
  readonly revenueRecognition: SendReportCaseV1FinanceDetailsRevenueRecognitionEntityReference;
  readonly transactions: SendReportCaseV1FinanceDetailsTransactionsEntityReference;



}

export class SendReportCaseV1FinanceDetails extends ValueObject<SendReportCaseV1FinanceDetailsProps> implements SendReportCaseV1FinanceDetailsEntityReference {
  constructor(props: SendReportCaseV1FinanceDetailsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get serviceFee() {
    return this.props.serviceFee;
    }

  // NestedPath Field Getters
  get revenueRecognition() {
      return new SendReportCaseV1FinanceDetailsRevenueRecognition(this.props.revenueRecognition, this.context
      //, this.visa
      );
    }
  get transactions() {
      return new SendReportCaseV1FinanceDetailsTransactions(this.props.transactions, this.context
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
    newProps: SendReportCaseV1FinanceDetailsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1FinanceDetails {
      return new SendReportCaseV1FinanceDetails(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set ServiceFee(value: number) {
    this.props.serviceFee = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
