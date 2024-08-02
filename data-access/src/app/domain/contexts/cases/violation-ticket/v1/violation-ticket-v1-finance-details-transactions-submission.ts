import { PropArray } from "../../../../../../../seedwork/domain-seedwork/prop-array";
import { ValueObject, ValueObjectProps } from "../../../../../../../seedwork/domain-seedwork/value-object";
import { DomainExecutionContext } from "../../../../domain-execution-context";
import { AdhocTransactions, AdhocTransactionsEntityReference, AdhocTransactionsProps } from "./finance-details-adhoc-transactions";
import { TransactionReference, TransactionReferenceProps } from "./violation-ticket-v1-finance-details-transactions-submission-transaction-reference";

export interface SubmissionEntityReference extends Readonly<Omit<SubmissionProps, 'adhocTransactions' |  'transactionReference'>> {
  adhocTransactions: ReadonlyArray<AdhocTransactionsEntityReference>;
  readonly transactionReference: TransactionReferenceProps;
}

export interface SubmissionProps extends ValueObjectProps {
  amount: number;
  readonly transactionReference: TransactionReferenceProps;
  readonly adhocTransactions: PropArray<AdhocTransactionsProps>;
}


export class Submission extends ValueObject<SubmissionProps> implements SubmissionEntityReference {
  constructor(props: SubmissionProps, private readonly context: DomainExecutionContext) {
    super(props);
  }

  get amount() {
    return this.props.amount;
  }

  get transactionReference() {
    return new TransactionReference(this.props.transactionReference, this.context);
  }

  get adhocTransactions(): ReadonlyArray<AdhocTransactions> {
    return this.props.adhocTransactions.items.map((adhocTransaction) => new AdhocTransactions(adhocTransaction, this.context));
  }

  // implementing setters  from TS 5.1

  set Amount(amount: number) {
    this.props.amount = amount;
  }
}