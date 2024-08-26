export interface IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReferenceProps extends ValueObjectProps {
  // Primitive Fields
  vendor: string;
  referenceId: string;
  completedAt: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReferenceEntityReference extends Readonly<IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReferenceProps>{



}

export class IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReference extends ValueObject<IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReferenceProps> implements IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReferenceEntityReference {
  constructor(props: IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReferenceProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
    super(props);
  }
  // Primitive Field Getters
  get vendor() {
    return this.props.vendor;
    }
  get referenceId() {
    return this.props.referenceId;
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
    newProps: IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReferenceProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReference {
      return new IdentityVerificationCaseV1FinanceDetailsTransactionsSubmissionTransactionReference(newProps, context
        // , visa
      );
  }
  // Primitive Field Setters
  set Vendor(value: string) {
    this.props.vendor = value;
  }
  set ReferenceId(value: string) {
    this.props.referenceId = value;
  }
  set CompletedAt(value: Date) {
    this.props.completedAt = value;
  }

  // PopulatedDoc Field Setters

//DocumentArrayFieldSetters: added as needed
}
