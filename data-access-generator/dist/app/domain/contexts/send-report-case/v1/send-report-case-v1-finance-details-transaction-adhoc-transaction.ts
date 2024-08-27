export interface SendReportCaseV1FinanceDetailsTransactionAdhocTransactionProps extends DomainEntityProps {
  // Primitive Fields
  amount: number;
  requestedAt: Date;
  reason: string;

  // NestedPath Fields
  readonly approval: SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApprovalProps;
  readonly transactionReference: SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReferenceProps;
  readonly financeReference: SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReferenceProps;

  // PopulateDoc Fields
  readonly requestedBy: StaffUserProps;
  setRequestedByRef(requestedBy: StaffUserEntityReference): void;

  // DocumentArray Fields

}

export interface SendReportCaseV1FinanceDetailsTransactionAdhocTransactionEntityReference extends Readonly<Omit<SendReportCaseV1FinanceDetailsTransactionAdhocTransactionProps, 'requestedBy' | 'setRequestedByRef' | 'approval' | 'transactionReference' | 'financeReference'>> {
  readonly approval: SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApprovalEntityReference;
  readonly transactionReference: SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReferenceEntityReference;
  readonly financeReference: SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReferenceEntityReference;

  readonly requestedBy: StaffUserEntityReference;


}

export class SendReportCaseV1FinanceDetailsTransactionAdhocTransaction extends DomainEntity<SendReportCaseV1FinanceDetailsTransactionAdhocTransactionProps> implements SendReportCaseV1FinanceDetailsTransactionAdhocTransactionEntityReference {
  constructor(props: SendReportCaseV1FinanceDetailsTransactionAdhocTransactionProps, private readonly context: DomainExecutionContext /*, private readonly visa: CommunityVisa */) {
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
      return this.props.approval ? new SendReportCaseV1FinanceDetailsTransactionAdhocTransactionApproval(this.props.approval, this.context) : undefined;
    }
  get transactionReference() {
      return this.props.transactionReference ? new SendReportCaseV1FinanceDetailsTransactionAdhocTransactionTransactionReference(this.props.transactionReference, this.context) : undefined;
    }
  get financeReference() {
      return new SendReportCaseV1FinanceDetailsTransactionAdhocTransactionFinanceReference(this.props.financeReference, this.context
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
    //     (permissions) => permissions.isSystemAccount || permissions.canManageMembers || (permissions.canEditOwnSendReportCaseV1FinanceDetailsTransactionAdhocTransactions && permissions.isEditingOwnSendReportCaseV1FinanceDetailsTransactionAdhocTransaction)
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
