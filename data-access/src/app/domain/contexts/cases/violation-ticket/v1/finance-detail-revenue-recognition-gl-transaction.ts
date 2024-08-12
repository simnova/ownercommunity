import { ValueObject, ValueObjectProps } from '../../../../../../../seedwork/domain-seedwork/value-object';
import { DomainExecutionContext } from '../../../../domain-execution-context';

export interface GlTransactionProps extends ValueObjectProps {
  debitGlAccount: string;
  creditGlAccount: string;
  amount: number;
  recognitionDate: Date;
  completedOn?: Date;
}

export interface GlTransactionEntityReference extends Readonly<GlTransactionProps> {}

export class GlTransaction extends ValueObject<GlTransactionProps> implements GlTransactionEntityReference {
  constructor(props: GlTransactionProps, private readonly context: DomainExecutionContext) {
    super(props);
  }

  get debitGlAccount() {
    return this.props.debitGlAccount;
  }

  set DebitGlAccount(debitGlAccount: string) {
    this.props.debitGlAccount = debitGlAccount;
  }

  get creditGlAccount() {
    return this.props.creditGlAccount;
  }

  set CreditGlAccount(creditGlAccount: string) {
    this.props.creditGlAccount = creditGlAccount;
  }

  get amount() {
    return this.props.amount;
  }

  set Amount(amount: number) {
    this.props.amount = amount;
  }

  get recognitionDate() {
    return this.props.recognitionDate;
  }

  set RecognitionDate(recognitionDate: Date) {
    this.props.recognitionDate = recognitionDate;
  }

  get completedOn() {
    return this.props.completedOn;
  }

  set CompletedOn(completedOn: Date) {
    this.props.completedOn = completedOn;
  }
}