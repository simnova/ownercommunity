export interface CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReferenceProps extends ValueObjectProps {
  // Primitive Fields
  debitGlAccount?: string;
  creditGlAccount?: string;
  completedOn?: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReferenceEntityReference extends Readonly<CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReferenceProps>{



}

export class CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReference extends ValueObject<CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReferenceProps> implements CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReferenceEntityReference {
  constructor(props: CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReferenceProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get debitGlAccount() {
    return this.props.debitGlAccount;
    }
  get creditGlAccount() {
    return this.props.creditGlAccount;
    }
  get completedOn() {
    return this.props.completedOn;
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
    newProps: CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReferenceProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReference {
      return new CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReference(newProps, context
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
  set CompletedOn(value: Date) {
    this.props.completedOn = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
