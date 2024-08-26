export interface IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReferenceProps extends ValueObjectProps {
  // Primitive Fields
  vendor: string;
  referenceId: string;
  completedAt?: Date;

  // NestedPath Fields

  // PopulateDoc Fields

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReferenceEntityReference extends Readonly<IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReferenceProps>{



}

export class IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReference extends ValueObject<IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReferenceProps> implements IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReferenceEntityReference {
  constructor(props: IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReferenceProps, private readonly context: DomainExecutionContext /*, private readonly visa: ServiceTicketV1Visa */) {
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
    newProps: IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReferenceProps, 
    context: DomainExecutionContext, 
    // visa: ServiceTicketV1Visa
    ): IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReference {
      return new IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReference(newProps, context
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
