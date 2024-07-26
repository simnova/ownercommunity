import {
  VOString,
  VOSet
} from '@lucaspaganini/value-objects';

export const ViolationTicketV1MessageSentByEnum = {
  Internal: 'internal',
  External: 'external'
}

export class Message extends VOString({ trim: true, maxLength: 2000 }) { }
export class Embedding extends VOString({ trim: true, maxLength: 2000 }) { }
export class SentBy extends VOSet(Object.values(ViolationTicketV1MessageSentByEnum)) { }