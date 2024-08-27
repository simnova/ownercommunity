export interface IdentityVerificationCaseV1FinanceDetailsTransactionsProps extends ValueObjectProps {
  // Primitive Fields

  // NestedPath Fields
  readonly submission: IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionProps;

  // PopulateDoc Fields

  // DocumentArray Fields
  readonly adhocTransactions: PropArray<IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionProps>;

}

export interface IdentityVerificationCaseV1FinanceDetailsTransactionsEntityReference extends Readonly<Omit<IdentityVerificationCaseV1FinanceDetailsTransactionsProps, 'submission' | 'adhocTransactions'>> {
  readonly submission: IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionEntityReference;


  readonly adhocTransactions: ReadonlyArray<IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionEntityReference>;

}

export class IdentityVerificationCaseV1FinanceDetailsTransactions extends ValueObject<IdentityVerificationCaseV1FinanceDetailsTransactionsProps> implements IdentityVerificationCaseV1FinanceDetailsTransactionsEntityReference {
  constructor(props: IdentityVerificationCaseV1FinanceDetailsTransactionsProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters

  // NestedPath Field Getters
  get submission() {
      return this.props.submission ? new IdentityVerificationCaseV1FinanceDetailsTransactionsSubmission(this.props.submission, this.context) : undefined;
    }

  // PopulateDoc Field Getters

  // DocumentArray Field Getters
  get adhocTransactions(): ReadonlyArray<IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransaction> {
    return this.props.adhocTransactions.items.map((item) => new IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransaction(item, this.context
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
    newProps: IdentityVerificationCaseV1FinanceDetailsTransactionsProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1FinanceDetailsTransactions {
      return new IdentityVerificationCaseV1FinanceDetailsTransactions(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
