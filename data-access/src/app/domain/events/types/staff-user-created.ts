import { DomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface StaffUserCreatedProps {
  externalId: string;
}

export class StaffUserCreatedEvent extends DomainEventImpl<StaffUserCreatedProps> {}
