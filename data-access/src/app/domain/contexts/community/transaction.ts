import { Entity, EntityProps } from "../../../../../seedwork/domain-seedwork/entity";
import * as ValueObjects from "./transaction.value-objects";

export interface TransactionProps extends EntityProps {
  transactionId: string;
  clientReferenceCode: string;
  amountDetails: {
    amount: number;
    authorizedAmount: number;
    currency: string;
  };
  status: string;
  reconciliationId: string;
  isSuccess: boolean;
  transactionTime: Date;
  successTimestamp: Date;
  error: {
    code: string;
    message: string;
    timestamp: Date;
  };
}

export interface TransactionReference extends Readonly<TransactionProps> {}

export class Transaction extends Entity<TransactionProps> implements TransactionReference {
  constructor(props: TransactionProps) {
    super(props);
  }

  get transactionId() {
    return this.props.transactionId;
  }
  get clientReferenceCode() {
    return this.props.clientReferenceCode;
  }
  get amountDetails() {
    return this.props.amountDetails;
  }
  get status() {
    return this.props.status;
  }
  get reconciliationId() {
    return this.props.reconciliationId;
  }
  get isSuccess() {
    return this.props.isSuccess;
  }
  get transactionTime() {
    return this.props.transactionTime;
  }
  get successTimestamp() {
    return this.props.successTimestamp;
  }
  get error() {
    return this.props.error;
  }

  // implementing setters  from TS 5.1

  set TransactionId(transactionId: ValueObjects.TransactionId) {
    this.props.transactionId = transactionId.valueOf();
  }

  set ClientReferenceCode(clientReferenceCode: ValueObjects.ClientReferenceCode) {
    this.props.clientReferenceCode = clientReferenceCode.valueOf();
  }

  set AmountDetails(amountDetails: ValueObjects.AmountDetails) {
    this.props.amountDetails = amountDetails.valueOf();
  }

  set Status(status: ValueObjects.Status) {
    this.props.status = status.valueOf();
  }

  set ReconciliationId(reconciliationId: ValueObjects.ReconciliationId) {
    this.props.reconciliationId = reconciliationId.valueOf();
  }

  set IsSuccess(isSuccess: boolean) {
    this.props.isSuccess = isSuccess;
  }

  set TransactionTime(transactionTime: Date) {
    this.props.transactionTime = transactionTime;
  }

  set SuccessTimestamp(successTimestamp: Date) {
    this.props.successTimestamp = successTimestamp;
  }

  set Error(error: ValueObjects.Error) {
    this.props.error.timestamp = error.timestamp;
    this.props.error.code = error.code.valueOf();
    this.props.error.message = error.message.valueOf();
  }
}