import { VOString, VOSet, VOInteger, VOObject, VOOptional } from '@lucaspaganini/value-objects';
import { DateTime } from 'graphql-scalars/typings/typeDefs';

export const StatusCodes = {
  Draft: 'DRAFT',
  Submitted: 'SUBMITTED',
  Assigned: 'ASSIGNED',
  InProgress: 'INPROGRESS',
  Completed: 'COMPLETED',
  Closed: 'CLOSED',
};

export class Title extends VOString({ trim: true, maxLength: 200, minLength: 5 }) { }
export class Description extends VOString({ trim: true, maxLength: 2000 }) { }
export class StatusCode extends VOSet(Object.values(StatusCodes)) { }
export class Priority extends VOInteger({ min: 1, max: 5 }) { }