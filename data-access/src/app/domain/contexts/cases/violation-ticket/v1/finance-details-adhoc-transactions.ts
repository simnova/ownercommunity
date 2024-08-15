import { DomainEntity, DomainEntityProps } from "../../../../../../../seedwork/domain-seedwork/domain-entity";
import { DomainExecutionContext } from "../../../../domain-execution-context";
import { Member, MemberEntityReference, MemberProps } from "../../../community/member/member";
import { FinanceReference, FinanceReferenceProps } from "./finance-detail-adhoc-transactions-finance-reference";
import { Approval, ApprovalProps } from "./finance-details-adhoc-transactions-approval";
import { TransactionReference, TransactionReferenceProps } from "./violation-ticket-v1-finance-details-transactions-submission-transaction-reference";

export interface AdhocTransactionsPropValues extends DomainEntityProps { 
  amount: number;
  requestedBy: MemberProps;
  setRequestedByRef: (requestedBy: MemberEntityReference) => void;
  requestedOn: Date;
  reason: string;
  approval: ApprovalProps;
  readonly transactionReference: TransactionReferenceProps;
  readonly financeReference: FinanceReferenceProps;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdhocTransactionsProps extends AdhocTransactionsPropValues {}

export interface AdhocTransactionsEntityReference extends Readonly<Omit<AdhocTransactionsPropValues, 'requestedBy' | 'setRequestedByRef' | 'transactionReference' | 'financeReference' | 'approval'>> {
  readonly requestedBy: MemberEntityReference;
}

export class AdhocTransactions extends DomainEntity<AdhocTransactionsProps> implements AdhocTransactionsEntityReference {
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

  get approval() {
    return new Approval(this.props.approval, this.context);
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

  set CreatedAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  set UpdatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}
