import { ValueObject, ValueObjectProps } from "../../../../../../../seedwork/domain-seedwork/value-object";
import { DomainExecutionContext } from "../../../../domain-execution-context";
import { GlTransaction, GlTransactionProps } from './finance-detail-revenue-recognition-gl-transaction';

export interface RevenueRecognitionProps extends ValueObjectProps {
  readonly submission: GlTransactionProps
  readonly decision: GlTransactionProps
}

export interface RevenueRecognitionEntityReference extends Readonly<Omit<RevenueRecognitionProps, 'submission' | 'decision'>> {
  readonly submission: GlTransactionProps
  readonly decision: GlTransactionProps
}



export class RevenueRecognition extends ValueObject<RevenueRecognitionProps> implements RevenueRecognitionEntityReference {
  constructor(props: RevenueRecognitionProps, private readonly context: DomainExecutionContext) {
    super(props);
  }

  get submission() {
    return this.props.submission ? new GlTransaction(this.props.submission, this.context) : undefined;
  }

  get decision() {
    return this.props.decision ? new GlTransaction(this.props.decision, this.context) : undefined;
  }
}