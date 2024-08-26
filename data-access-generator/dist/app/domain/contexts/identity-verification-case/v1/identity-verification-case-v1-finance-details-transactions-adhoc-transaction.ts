export interface IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionProps extends DomainEntityProps {
  // Primitive Fields
  amount: number;
  requestedAt: Date;
  reason: string;

  // NestedPath Fields
  readonly approval: IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionApprovalProps;
  readonly transactionReference: IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReferenceProps;
  readonly financeReference: IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReferenceProps;

  // PopulateDoc Fields
  readonly requestedBy: StaffUserProps;
  setRequestedByRef(requestedBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionEntityReference extends Readonly<Omit<IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionProps, 'requestedBy' | 'setRequestedByRef' | 'approval' | 'transactionReference' | 'financeReference'>> {
  readonly approval: IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionApprovalEntityReference;
  readonly transactionReference: IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReferenceEntityReference;
  readonly financeReference: IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReferenceEntityReference;

  readonly requestedBy: StaffUserEntityReference;


}

export class IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransaction extends DomainEntity<IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionProps> implements IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionEntityReference {
  constructor(props: IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
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
      return this.props.approval ? new IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionApproval(this.props.approval, this.context) : undefined;
    }
  get transactionReference() {
      return this.props.transactionReference ? new IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionTransactionReference(this.props.transactionReference, this.context) : undefined;
    }
  get financeReference() {
      return new IdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactionFinanceReference(this.props.financeReference, this.context
      //, this.visa
      );
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
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnIdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransactions && permissions.isEditingOwnIdentityVerificationCaseV1FinanceDetailsTransactionsAdhocTransaction)
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
