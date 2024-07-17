import { VOString, VOArray, VOObject, VOFloat } from '@lucaspaganini/value-objects';

export class CustomerId extends VOString({ trim: true, maxLength: 500 }) {}
export class TransactionId extends VOString({ trim: true, maxLength: 500 }) {}
export class ClientReferenceCode extends VOString({ trim: true, maxLength: 50 }) {}
class Status extends VOString({ trim: true, maxLength: 50 }) {}
export class ReconciliationId extends VOString({ trim: true, maxLength: 500 }) {}

export class WalletProps extends VOObject({
  customerId: CustomerId,
  transactions: VOArray(VOObject({
    transactionId: TransactionId,
    clientReferenceCode: ClientReferenceCode,
    amountDetails: VOObject({
      totalAmount: VOFloat(),
      authorizedAmount: VOFloat(),
      currency: VOString({ trim: true, maxLength: 5 }),
    }),
    status: Status,
    reconciliationId: ReconciliationId,
    isSuccess: Boolean,
    transactionTime: Date,
    successTimestamp: Date,
    error: VOObject({
      code: VOString({ trim: true, maxLength: 50 }),
      message: VOString({ trim: true, maxLength: 500 }),
      timestamp: Date,
    }),
  })),
}) {}

export class AmountDetails extends VOObject({
  totalAmount: VOFloat(),
  authorizedAmount: VOFloat(),
  currency: VOString({ trim: true, maxLength: 5 }),
}) {}

export class Error extends VOObject({
  code: VOString({ trim: true, maxLength: 50 }),
  message: VOString({ trim: true, maxLength: 500 }),
  timestamp: Date,
}) {}
export class Transaction extends VOObject({
  transactionId: TransactionId,
  clientReferenceCode: ClientReferenceCode,
  amountDetails: AmountDetails,
  status: Status,
  reconciliationId: ReconciliationId,
  isSuccess: Boolean,
  transactionTime: Date,
  successTimestamp: Date,
  error: Error
}) {}
export class Transactions extends VOArray(Transaction) {}
