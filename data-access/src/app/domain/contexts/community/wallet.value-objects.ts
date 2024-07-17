import { VOString, VOObject } from '@lucaspaganini/value-objects';

export class CustomerId extends VOString({ trim: true, maxLength: 500 }) {}


export class WalletProps extends VOObject({
  customerId: CustomerId
}) {}
