import { VOFloat, VOObject, VOString } from '@lucaspaganini/value-objects';

export class TransactionId extends VOString({ trim: true, maxLength: 500 }) {}
export class ClientReferenceCode extends VOString({ trim: true, maxLength: 50 }) {}
export class Status extends VOString({ trim: true, maxLength: 50 }) {}
export class ReconciliationId extends VOString({ trim: true, maxLength: 500 }) {}
export class TransactionTime extends VOString({ trim: true, maxLength: 500 }) {}
export class SuccessTimestamp extends VOString({ trim: true, maxLength: 500 }) {}
export class Code extends VOString({ trim: true, maxLength: 50 }) {}
export class Message extends VOString({ trim: true, maxLength: 500 }) {}
export class Timestamp extends VOString({ trim: true, maxLength: 500 }) {}
export class TotalAmount extends VOString({ trim: true, maxLength: 500 }) {}
export class AuthorizedAmount extends VOString({ trim: true, maxLength: 500 }) {}
export class Currency extends VOString({ trim: true, maxLength: 5 }) {}
export class Transactions extends VOString({ trim: true, maxLength: 500 }) {}
export class Transaction extends VOString({ trim: true, maxLength: 500 }) {}
export class IsSuccess extends VOString({ trim: true, maxLength: 500 }) {}
export class Description extends VOString({ trim: true, maxLength: 500 }) {}
export class Type extends VOString({ trim: true, maxLength: 500 }) {}
export class AmountDetails extends VOObject({
  amount: VOFloat(),
  authorizedAmount: VOFloat(),
  currency: VOString({ trim: true, maxLength: 5 }),
}) {}
export class Error extends VOObject({
  code: VOString({ trim: true, maxLength: 50 }),
  message: VOString({ trim: true, maxLength: 500 }),
  timestamp: Date,
}) {}
