import { CustomDomainEventImpl } from '../shared/domain-event';

export interface PropertyCreatedProps {
  id: string;
}

export class PropertyCreatedEvent extends CustomDomainEventImpl<PropertyCreatedProps> {}
