import { Entity, EntityProps } from '../../../../../../../seedwork/domain-seedwork/entity';
import { DomainExecutionContext } from '../../../../domain-execution-context';
import * as ValueObjects from './transaction.value-objects';
import { ViolationTicketV1Visa } from './violation-ticket.visa';

export interface TransactionProps extends EntityProps {
  transactionId: string;
  clientReferenceCode: string;
  type: string;
  description: string;
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
  constructor(props: TransactionProps, private context: DomainExecutionContext, visa: ViolationTicketV1Visa) {
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

  get description() {
    return this.props.description;
  }

  get type() {
    return this.props.type;
  }

  // implementing setters  from TS 5.1

  set TransactionId(transactionId: ValueObjects.TransactionId) {
    this.props.transactionId = transactionId.valueOf();
  }

  set ClientReferenceCode(clientReferenceCode: ValueObjects.ClientReferenceCode) {
    this.props.clientReferenceCode = clientReferenceCode.valueOf();
  }

  // set AmountDetails(amountDetails: ValueObjects.AmountDetails) {
  //   this.props.amountDetails.amount = amountDetails.amount.valueOf();
  //   this.props.amountDetails.authorizedAmount = amountDetails.authorizedAmount.valueOf();
  //   this.props.amountDetails.currency = amountDetails.currency.valueOf();
  // }

  set Amount(amount: ValueObjects.AmountDetails["amount"]) {
    this.props.amountDetails.amount = amount.valueOf();
  }

  set AuthorizedAmount(authorizedAmount: ValueObjects.AmountDetails["authorizedAmount"]) {
    this.props.amountDetails.authorizedAmount = authorizedAmount.valueOf();
  }

  set Currency(currency: ValueObjects.AmountDetails["currency"]) {
    this.props.amountDetails.currency = currency.valueOf();
  }
  set Description(description: ValueObjects.Description) {
    this.props.description = description.valueOf();
  }

  set Type(type: ValueObjects.Type) {
    this.props.type = type.valueOf();
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

  set ErrorTimestamp(errorTimestamp: Date) {
    this.props.error.timestamp = errorTimestamp; 
  }

  set ErrorCode(errorCode: ValueObjects.Error['code']) {
    this.props.error.code = errorCode.valueOf();  
  }

  set ErrorMessage(errorMessage: ValueObjects.Error['message']) {
    this.props.error.message = errorMessage.valueOf();
  }
}
