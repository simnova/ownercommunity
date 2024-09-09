import { DomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface PropertyCreatedProps {
  id: string;
}

export class PropertyCreatedEvent extends DomainEventImpl<PropertyCreatedProps> {}
