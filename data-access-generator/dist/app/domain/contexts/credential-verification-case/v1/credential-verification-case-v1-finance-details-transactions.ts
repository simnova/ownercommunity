export interface CredentialVerificationCaseV1FinanceDetailsTransactionsProps extends ValueObjectProps {
  // Primitive Fields

  // NestedPath Fields
  readonly submission: CredentialVerificationCaseV1FinanceDetailsTransactionSubmissionProps;

  // PopulateDoc Fields

  // DocumentArray Fields
  readonly adhocTransactions: PropArray<CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsProps>;

}

export interface CredentialVerificationCaseV1FinanceDetailsTransactionsEntityReference extends Readonly<Omit<CredentialVerificationCaseV1FinanceDetailsTransactionsProps, 'submission' | 'adhocTransactions'>> {
  readonly submission: CredentialVerificationCaseV1FinanceDetailsTransactionSubmissionEntityReference;


  readonly adhocTransactions: ReadonlyArray<CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsEntityReference>;

}

export class CredentialVerificationCaseV1FinanceDetailsTransactions extends ValueObject<CredentialVerificationCaseV1FinanceDetailsTransactionsProps> implements CredentialVerificationCaseV1FinanceDetailsTransactionsEntityReference {
  constructor(props: CredentialVerificationCaseV1FinanceDetailsTransactionsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get submission() {
      return this.props.submission ? new CredentialVerificationCaseV1FinanceDetailsTransactionSubmission(this.props.submission, this.context) : undefined;
    }

  // PopulateDoc Field Getters

  // DocumentArray Field Getters
  get adhocTransactions(): ReadonlyArray<CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactions> {
    return this.props.adhocTransactions.items.map((item) => new CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactions(item, this.context
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
    newProps: CredentialVerificationCaseV1FinanceDetailsTransactionsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1FinanceDetailsTransactions {
      return new CredentialVerificationCaseV1FinanceDetailsTransactions(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
