export interface CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsProps extends DomainEntityProps {
  // Primitive Fields
  amount?: number;
  requestedAt?: Date;
  reason?: string;

  // NestedPath Fields
  readonly approval: CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApprovalProps;
  readonly transactionReference: CredentialVerificationCaseV1TransactionReferenceProps;
  readonly financeReference: CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReferenceProps;

  // PopulateDoc Fields
  readonly requestedBy: StaffUserProps;
  setRequestedByRef(requestedBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsEntityReference extends Readonly<Omit<CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsProps, 'requestedBy' | 'setRequestedByRef' | 'approval' | 'transactionReference' | 'financeReference'>> {
  readonly approval: CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApprovalEntityReference;
  readonly transactionReference: CredentialVerificationCaseV1TransactionReferenceEntityReference;
  readonly financeReference: CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReferenceEntityReference;

  readonly requestedBy: StaffUserEntityReference;


}

export class CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactions extends DomainEntity<CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsProps> implements CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsEntityReference {
  constructor(props: CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
    super(props);
  }
  // Primitive Field Getters
  get amount() {
    return this.props.amount;
    }
  get requestedAt() {
    return this.props.requestedAt;
    }
  get reason() {
    return this.props.reason;
    }

  // NestedPath Field Getters
  get approval() {
      return this.props.approval ? new CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsApproval(this.props.approval, this.context) : undefined;
    }
  get transactionReference() {
      return this.props.transactionReference ? new CredentialVerificationCaseV1TransactionReference(this.props.transactionReference, this.context) : undefined;
    }
  get financeReference() {
      return this.props.financeReference ? new CredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionsFinanceReference(this.props.financeReference, this.context) : undefined;
    }

  // PopulateDoc Field Getters
  get requestedBy(): StaffUserEntityReference {
          return new StaffUser(this.props.requestedBy, this.context);
        }

  // DocumentArray Field Getters


  private validateVisa() {
    // modify this to match the permissions required to perform the action

    // if (
    //   !this.visa.determineIf(
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnCredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactionss && permissions.isEditingOwnCredentialVerificationCaseV1FinanceDetailsTransactionAdhocTransactions)
    //   )
    // ) {
    //   throw new Error('You do not have permission to update this account');
    // }
  }

  // using ts 5.1 setters
  // Primitive Field Setters
  set Amount(value: number) {
    this.props.amount = value;
  }
  set RequestedAt(value: Date) {
    this.props.requestedAt = value;
  }
  set Reason(value: string) {
    this.props.reason = value;
  }

  // PopulatedDoc Field Setters
  set RequestedBy(requestedBy: StaffUserEntityReference) {
    this.props.setRequestedByRef(requestedBy);
  }

//DocumentArrayFieldSetters: added as needed
}
