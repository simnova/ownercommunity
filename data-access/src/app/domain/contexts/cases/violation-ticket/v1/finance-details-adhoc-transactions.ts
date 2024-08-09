import { Entity, EntityProps } from "../../../../../../../seedwork/domain-seedwork/entity";
import { DomainExecutionContext } from "../../../../domain-execution-context";
import { Member, MemberEntityReference, MemberProps } from "../../../community/member/member";
import { FinanceReference, FinanceReferenceProps } from "./finance-detail-adhoc-transactions-finance-reference";
import { TransactionReference, TransactionReferenceProps } from "./violation-ticket-v1-finance-details-transactions-submission-transaction-reference";

export interface AdhocTransactionsPropValues extends EntityProps { 
  amount: number;
  requestedBy: MemberProps;
  setRequestedByRef: (requestedBy: MemberEntityReference) => void;
  requestedOn: Date;
  reason: string;
  approval: {
    isApplicantApprovalRequired: boolean;
    isApplicantApproved: boolean;
    applicantRespondedAt: Date;
  };
  readonly transactionReference: TransactionReferenceProps;
  readonly financeReference: FinanceReferenceProps;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdhocTransactionsProps extends AdhocTransactionsPropValues {}

export interface AdhocTransactionsEntityReference extends Readonly<Omit<AdhocTransactionsPropValues, 'requestedBy' | 'setRequestedByRef' | 'transactionReference' | 'financeReference'>> {
  readonly requestedBy: MemberEntityReference;
}

export class AdhocTransactions extends Entity<AdhocTransactionsProps> implements AdhocTransactionsEntityReference {
  constructor(props: AdhocTransactionsProps, private readonly context: DomainExecutionContext) {
    super(props);
  }

  get amount(): number {
    return this.props.amount;
  }

  get requestedBy(): MemberEntityReference {
    return this.props.requestedBy ? new Member(this.props.requestedBy, this.context) : undefined;
  }

  get requestedOn(): Date {
    return this.props.requestedOn;
  }

  get reason(): string {
    return this.props.reason;
  }

  get approval(): {
    isApplicantApprovalRequired: boolean;
    isApplicantApproved: boolean;
    applicantRespondedAt: Date;
  } {
    return this.props.approval;
  }

  get transactionReference(): TransactionReference {
    return new TransactionReference(this.props.transactionReference, this.context);
  }

  get financeReference(): FinanceReference {
    return new FinanceReference(this.props.financeReference, this.context);
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set Amount(amount: number) {
    this.props.amount = amount;
  }

  set RequestedBy(requestedBy: MemberEntityReference) {
    this.props.setRequestedByRef(requestedBy);
  }

  set RequestedOn(requestedOn: Date) {
    this.props.requestedOn = requestedOn;
  }

  set Reason(reason: string) {
    this.props.reason = reason;
  }

  set Approval(approval: {
    isApplicantApprovalRequired: boolean;
    isApplicantApproved: boolean;
    applicantRespondedAt: Date;
  }) {
    this.props.approval = approval;
  }

  set CreatedAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  set UpdatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}
