import { ValueObject, ValueObjectProps } from '../../../../../../../framework/seedwork/domain-seedwork/value-object';
import { DomainExecutionContext } from '../../../../../../../framework/domain/domain-execution-context';

export interface TransactionReferenceProps extends ValueObjectProps {
  referenceId: string;
  completedOn: Date;
  vendor: string;
}

export interface TransactionReferenceEntityReference extends Readonly<TransactionReferenceProps> {}

export class TransactionReference extends ValueObject<TransactionReferenceProps> implements TransactionReferenceEntityReference {
  constructor(props: TransactionReferenceProps, private readonly context: DomainExecutionContext) {
    super(props);
  }

  get referenceId() {
    return this.props.referenceId;
  }

  get completedOn() {
    return this.props.completedOn;
  }

  get vendor() {
    return this.props.vendor;
  }

  // implementing setters  from TS 5.1

  set ReferenceId(referenceId: string) {
    this.props.referenceId = referenceId;
  }

  set CompletedOn(completedOn: Date) {
    this.props.completedOn = completedOn;
  }

  set Vendor(vendor: string) {
    this.props.vendor = vendor;
  }
}