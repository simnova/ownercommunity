import { ValueObject, ValueObjectProps } from "../../../../../../../seedwork/domain-seedwork/value-object";
import { DomainExecutionContext } from "../../../../domain-execution-context";
import { TransactionReference, TransactionReferenceProps } from "./violation-ticket-v1-finance-details-transactions-submission-transaction-reference";

export interface SubmissionEntityReference extends Readonly<SubmissionProps> {
  readonly transactionReference: TransactionReferenceProps;
}

export interface SubmissionProps extends ValueObjectProps {
  amount: number;
  readonly transactionReference: TransactionReferenceProps;
}


export class Submission extends ValueObject<SubmissionProps> implements SubmissionEntityReference {
  constructor(props: SubmissionProps, private readonly context: DomainExecutionContext) {
    super(props);
  }

  get amount() {
    return this.props.amount;
  }

  get transactionReference() {
    return this.props.transactionReference ? new TransactionReference(this.props.transactionReference, this.context) : undefined;
  }

  // implementing setters  from TS 5.1

  set Amount(amount: number) {
    this.props.amount = amount;
  }
}