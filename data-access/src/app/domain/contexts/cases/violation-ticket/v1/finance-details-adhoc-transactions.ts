import { Entity, EntityProps } from "../../../../../../../seedwork/domain-seedwork/entity";
import { TransactionReference } from "../../../../../../infrastructure-services-impl/datastore/mongodb/models/cases/violation-ticket";
import { DomainExecutionContext } from "../../../../domain-execution-context";
import { Member, MemberEntityReference, MemberProps } from "../../../community/member/member";

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
  transactionReference: TransactionReference;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdhocTransactionsProps extends AdhocTransactionsPropValues {}

export interface AdhocTransactionsEntityReference extends Readonly<Omit<AdhocTransactionsPropValues, 'requestedBy' | 'setRequestedByRef'>> {
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
    return this.props.transactionReference;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set amount(amount: number) {
    this.props.amount = amount;
  }

  set requestedBy(requestedBy: MemberEntityReference) {
    this.props.setRequestedByRef(requestedBy);
  }

  set requestedOn(requestedOn: Date) {
    this.props.requestedOn = requestedOn;
  }

  set reason(reason: string) {
    this.props.reason = reason;
  }

  set approval(approval: {
    isApplicantApprovalRequired: boolean;
    isApplicantApproved: boolean;
    applicantRespondedAt: Date;
  }) {
    this.props.approval = approval;
  }

  set transactionReference(transactionReference: TransactionReference) {
    this.props.transactionReference = transactionReference;
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}