import { VOFloat, VOString } from '@lucaspaganini/value-objects';

export class ServiceFee extends VOFloat({ min: 0 }) { }
export class Amount extends VOFloat({ min: 0 }) { }
// export class TransactionReference extends VOString({ trim: true, maxLength: 200 }) { }