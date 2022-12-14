import { VOString } from '@lucaspaganini/value-objects';
export { Email, ExternalId } from '../value-objects';
export class FirstName extends VOString({ trim: true, maxLength: 500 }) {}
export class LastName extends VOString({ trim: true, maxLength: 500 }) {}
