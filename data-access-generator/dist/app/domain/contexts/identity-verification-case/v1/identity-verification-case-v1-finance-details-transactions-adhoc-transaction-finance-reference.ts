export interface IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReferenceProps extends ValueObjectProps {
  // Primitive Fields
  debitGlAccount: string;
  creditGlAccount: string;
  completedAt: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReferenceEntityReference extends Readonly<IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReferenceProps>{



}

export class IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReference extends ValueObject<IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReferenceProps> implements IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReferenceEntityReference {
  constructor(props: IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReferenceProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
    newProps: IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReferenceProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReference {
      return new IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReference(newProps, context
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
