export interface SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReferenceProps extends ValueObjectProps {
  // Primitive Fields
  debitGlAccount: string;
  creditGlAccount: string;
  completedAt: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReferenceEntityReference extends Readonly<SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReferenceProps>{



}

export class SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReference extends ValueObject<SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReferenceProps> implements SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReferenceEntityReference {
  constructor(props: SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReferenceProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get debitGlAccount() {
    return this.props.debitGlAccount;
    }
  get creditGlAccount() {
    return this.props.creditGlAccount;
    }
  get completedAt() {
    return this.props.completedAt;
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
    newProps: SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReferenceProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReference {
      return new SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReference(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set DebitGlAccount(value: string) {
    this.props.debitGlAccount = value;
  }
  set CreditGlAccount(value: string) {
    this.props.creditGlAccount = value;
  }
  set CompletedAt(value: Date) {
    this.props.completedAt = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
