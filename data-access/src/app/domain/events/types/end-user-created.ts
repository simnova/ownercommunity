import { DomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface EndUserCreatedProps {
  userId: string;
}

export class EndUserCreatedEvent extends DomainEventImpl<EndUserCreatedProps> {}
