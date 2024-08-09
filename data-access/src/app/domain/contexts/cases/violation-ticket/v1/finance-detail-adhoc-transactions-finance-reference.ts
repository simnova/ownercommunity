import { ValueObject, ValueObjectProps } from '../../../../../../../seedwork/domain-seedwork/value-object';
import { DomainExecutionContext } from '../../../../domain-execution-context';

export interface FinanceReferenceProps extends ValueObjectProps {
  debitGlAccount: string;
  creditGlAccount: string;
  completedOn: Date;
}

export interface FinanceReferencePropsEntityReference extends Readonly<FinanceReferenceProps> {}

export class FinanceReference extends ValueObject<FinanceReferenceProps> implements FinanceReferencePropsEntityReference {
  constructor(props: FinanceReferenceProps, private readonly context: DomainExecutionContext) {
    super(props);
  }

  get debitGlAccount() {
    return this.props.debitGlAccount;
  }

  set debitGlAccount(debitGlAccount: string) {
    this.props.debitGlAccount = debitGlAccount;
  }

  get creditGlAccount() {
    return this.props.creditGlAccount;
  }

  set creditGlAccount(creditGlAccount: string) {
    this.props.creditGlAccount = creditGlAccount;
  }

  get completedOn() {
    return this.props.completedOn;
  }

  set completedOn(completedOn: Date) {
    this.props.completedOn = completedOn;
  }
}