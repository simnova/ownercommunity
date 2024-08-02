import { ValueObject, ValueObjectProps } from "../../../../../../../seedwork/domain-seedwork/value-object";
import { DomainExecutionContext } from "../../../../domain-execution-context";
import { Submission, SubmissionEntityReference, SubmissionProps } from "./violation-ticket-v1-finance-details-transactions-submission";


export interface TransactionsProps extends ValueObjectProps {
  readonly submission: SubmissionProps;
};

export interface TransactionsEntityReference extends Readonly<Omit<TransactionsProps, 'submission'>> {
  readonly submission: SubmissionEntityReference;
}

export class Transactions extends ValueObject<TransactionsProps> implements TransactionsEntityReference {
  constructor(props: TransactionsProps, private readonly context: DomainExecutionContext) {
    super(props);
  }

  get submission() {
    return new Submission(this.props.submission, this.context);
  }
}