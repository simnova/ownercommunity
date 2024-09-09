import { DomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface PropertyUpdatedProps {
  id: string;
}

export class PropertyUpdatedEvent extends DomainEventImpl<PropertyUpdatedProps> {}
