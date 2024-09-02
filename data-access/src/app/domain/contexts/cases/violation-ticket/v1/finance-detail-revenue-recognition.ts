import { ValueObject, ValueObjectProps } from "../../../../../../../seedwork/domain-seedwork/value-object";
import { DomainExecutionContext } from "../../../../../../../framework/domain/domain-execution-context";
import { GlTransaction, GlTransactionProps } from './finance-detail-revenue-recognition-gl-transaction';

export interface RevenueRecognitionProps extends ValueObjectProps {
  readonly submission: GlTransactionProps
  readonly recognition: GlTransactionProps
}

export interface RevenueRecognitionEntityReference extends Readonly<Omit<RevenueRecognitionProps, 'submission' | 'recognition'>> {
  readonly submission: GlTransactionProps
  readonly recognition: GlTransactionProps
}



export class RevenueRecognition extends ValueObject<RevenueRecognitionProps> implements RevenueRecognitionEntityReference {
  constructor(props: RevenueRecognitionProps, private readonly context: DomainExecutionContext) {
    super(props);
  }

  get submission() {
    return this.props.submission ? new GlTransaction(this.props.submission, this.context) : undefined;
  }

  get recognition() {
    return this.props.recognition ? new GlTransaction(this.props.recognition, this.context) : undefined;
  }
}