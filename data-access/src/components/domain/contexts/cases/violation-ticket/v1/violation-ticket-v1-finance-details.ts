import { ValueObject, ValueObjectProps } from '../../../../../../../framework/seedwork/domain-seedwork/value-object';
import { DomainExecutionContext } from '../../../../../../../framework/domain/domain-execution-context';
import { RevenueRecognition, RevenueRecognitionProps } from './finance-detail-revenue-recognition';
import { Transactions, TransactionsEntityReference, TransactionsProps } from './violation-ticket-v1-finance-details-transactions';

export interface ViolationTicketV1FinanceDetailProps extends ValueObjectProps {
  serviceFee: number;
  readonly transactions: TransactionsProps
  readonly revenueRecognition: RevenueRecognitionProps
}

export interface ViolationTicketV1FinanceDetailEntityReference extends Readonly<Omit<ViolationTicketV1FinanceDetailProps, 'transactions' | 'revenueRecognition'>> {
  readonly transactions: TransactionsEntityReference;
}

export class ViolationTicketV1FinanceDetails extends ValueObject<ViolationTicketV1FinanceDetailProps> implements ViolationTicketV1FinanceDetailEntityReference {
  constructor(props: ViolationTicketV1FinanceDetailProps, private readonly context: DomainExecutionContext) {
    super(props);
  }

  get serviceFee() {
    return this.props.serviceFee;
  }

  get transactions(): Transactions {
    return this.props.transactions ? new Transactions(this.props.transactions, this.context) : undefined;
  }

  // implementing setters  from TS 5.1

  set ServiceFee(serviceFee: number) {
    this.props.serviceFee = serviceFee;
  }

  get revenueRecognition(): RevenueRecognition {
    return this.props.revenueRecognition ? new RevenueRecognition(this.props.revenueRecognition, this.context) : undefined;
  }
}