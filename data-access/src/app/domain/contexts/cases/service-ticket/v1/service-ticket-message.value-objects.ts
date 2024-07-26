import {
  VOString,
  VOSet
} from '@lucaspaganini/value-objects';

export const ServiceTicketMessageSentByEnum = {
  Internal: 'internal',
  External: 'external'
}

export class Message extends VOString({ trim: true, maxLength: 2000 }) { }
export class Embedding extends VOString({ trim: true, maxLength: 2000 }) { }
export class SentBy extends VOSet(Object.values(ServiceTicketMessageSentByEnum)) { }