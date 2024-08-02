import { PropArray } from "../../../../../../../seedwork/domain-seedwork/prop-array";
import { ValueObject, ValueObjectProps } from "../../../../../../../seedwork/domain-seedwork/value-object";
import { DomainExecutionContext } from "../../../../domain-execution-context";
import { AdhocTransactions, AdhocTransactionsEntityReference, AdhocTransactionsProps } from "./finance-details-adhoc-transactions";
import { Submission, SubmissionEntityReference, SubmissionProps } from "./violation-ticket-v1-finance-details-transactions-submission";


export interface TransactionsProps extends ValueObjectProps {
  readonly submission: SubmissionProps;
  readonly adhocTransactions: PropArray<AdhocTransactionsProps>;
};

export interface TransactionsEntityReference extends Readonly<Omit<TransactionsProps, 'submission' |  'adhocTransactions'>> {
  readonly submission: SubmissionEntityReference;
  adhocTransactions: ReadonlyArray<AdhocTransactionsEntityReference>;
}

export class Transactions extends ValueObject<TransactionsProps> implements TransactionsEntityReference {
  constructor(props: TransactionsProps, private readonly context: DomainExecutionContext) {
    super(props);
  }

  get submission() {
    return new Submission(this.props.submission, this.context);
  }

  get adhocTransactions(): ReadonlyArray<AdhocTransactions> {
    return this.props.adhocTransactions.items.map((adhocTransaction) => new AdhocTransactions(adhocTransaction, this.context));
  }

  public requestAddNewAdhocTransaction(): AdhocTransactions {
    let adhocTransaction = this.props.adhocTransactions.getNewItem();
    return new AdhocTransactions(adhocTransaction, this.context);
  }
}