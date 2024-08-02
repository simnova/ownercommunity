import { VOString, VOSet, VOInteger, VOObject, VOAny } from '@lucaspaganini/value-objects';
import { DateTime } from 'graphql-scalars/typings/typeDefs';

export const StatusCodes = {
  Draft: 'DRAFT',
  Submitted: 'SUBMITTED',
  Assigned: 'ASSIGNED',
  Completed: 'COMPLETED',
  Closed: 'CLOSED',
  Paid: 'PAID',
};

export class Title extends VOString({ trim: true, maxLength: 200, minLength: 5 }) {}
export class Description extends VOString({ trim: true, maxLength: 2000 }) {}
export class StatusCode extends VOSet(Object.values(StatusCodes)) {}
export class Priority extends VOInteger({ min: 1, max: 5 }) {}
export class PenaltyAmount extends VOInteger({ min: 1 }) {}
export class PenaltyPaidDate extends VOString({ trim: true }) {}

export class NewRevisionRequest extends VOObject({
  requestedAt: Date,
  revisionSummary: VOString({ trim: true }),
  requestedChanges: VOObject({
    requestUpdatedAssignment: Boolean,
    requestUpdatedStatus: Boolean,
    requestUpdatedProperty: Boolean,
    requestUpdatedPaymentTransaction: Boolean 
  }),
  revisionSubmittedAt: VOSet([DateTime, undefined]),
}) {}
