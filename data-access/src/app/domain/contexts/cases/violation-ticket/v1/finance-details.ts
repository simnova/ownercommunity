import { ValueObject, ValueObjectProps } from '../../../../../../../seedwork/domain-seedwork/value-object';
import { DomainExecutionContext } from '../../../../domain-execution-context';
import { Transactions, TransactionsEntityReference, TransactionsProps } from './violation-ticket-v1-finance-details-transactions';

export interface FinanceDetailProps extends ValueObjectProps {
  serviceFee: number;
  transactions: TransactionsProps
}

export interface FinanceDetailEntityReference extends Readonly<Omit<FinanceDetailProps, 'transactions'>> {
  readonly transactions: TransactionsEntityReference;
}

export class FinanceDetails extends ValueObject<FinanceDetailProps> implements FinanceDetailEntityReference {
  constructor(props: FinanceDetailProps, private readonly context: DomainExecutionContext) {
    super(props);
  }

  get serviceFee() {
    return this.props.serviceFee;
  }

  get transactions() {
    return new Transactions(this.props.transactions, this.context);
  }

  // implementing setters  from TS 5.1

  set ServiceFee(serviceFee: number) {
    this.props.serviceFee = serviceFee;
  }
}