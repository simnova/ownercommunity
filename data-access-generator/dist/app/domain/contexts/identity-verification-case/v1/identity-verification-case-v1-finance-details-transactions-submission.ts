export interface IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionProps extends ValueObjectProps {
  // Primitive Fields
  amount: number;

  // NestedPath Fields
  readonly transactionReference: IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReferenceProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionEntityReference extends Readonly<Omit<IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionProps, 'transactionReference'>> {
  readonly transactionReference: IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReferenceEntityReference;



}

export class IdentityVerificationCaseV1FinanceDetailsTransactionsSubmission extends ValueObject<IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionProps> implements IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionEntityReference {
  constructor(props: IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get amount() {
    return this.props.amount;
    }

  // NestedPath Field Getters
  get transactionReference() {
      return new IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReference(this.props.transactionReference, this.context
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
    newProps: IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1FinanceDetailsTransactionsSubmission {
      return new IdentityVerificationCaseV1FinanceDetailsTransactionsSubmission(newProps, context
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
