import { VOString, VOSet, VOInteger } from '@lucaspaganini/value-objects';

export const StatusCodes = {
  Draft: 'DRAFT',
  Submitted: 'SUBMITTED',
  Assigned: 'ASSIGNED',
  InProgress: 'INPROGRESS',
  Paid: 'PAID',
  Completed: 'COMPLETED',
  Closed: 'CLOSED',
};

export class Title extends VOString({ trim: true, maxLength: 200, minLength: 5 }) {}
export class Description extends VOString({ trim: true, maxLength: 2000 }) {}
export class StatusCode extends VOSet(Object.values(StatusCodes)) {}
export class Priority extends VOInteger({ min: 1, max: 5 }) {}
export class PenaltyAmount extends VOInteger({ min: 0 }) {}
export class PenaltyPaidDate extends VOString({ trim: true }) {}
