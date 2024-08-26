export interface CredentialVerificationCaseV1FinanceDetailsTransactionSubmissionProps extends ValueObjectProps {
  // Primitive Fields
  amount?: number;

  // NestedPath Fields
  readonly transactionReference: CredentialVerificationCaseV1TransactionReferenceProps;

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1FinanceDetailsTransactionSubmissionEntityReference extends Readonly<Omit<CredentialVerificationCaseV1FinanceDetailsTransactionSubmissionProps, 'transactionReference'>> {
  readonly transactionReference: CredentialVerificationCaseV1TransactionReferenceEntityReference;



}

export class CredentialVerificationCaseV1FinanceDetailsTransactionSubmission extends ValueObject<CredentialVerificationCaseV1FinanceDetailsTransactionSubmissionProps> implements CredentialVerificationCaseV1FinanceDetailsTransactionSubmissionEntityReference {
  constructor(props: CredentialVerificationCaseV1FinanceDetailsTransactionSubmissionProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get amount() {
    return this.props.amount;
    }

  // NestedPath Field Getters
  get transactionReference() {
      return new CredentialVerificationCaseV1TransactionReference(this.props.transactionReference, this.context
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
    newProps: CredentialVerificationCaseV1FinanceDetailsTransactionSubmissionProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): CredentialVerificationCaseV1FinanceDetailsTransactionSubmission {
      return new CredentialVerificationCaseV1FinanceDetailsTransactionSubmission(newProps, context
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
