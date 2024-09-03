import { CustomDomainEventImpl } from '../../../../../framework/seedwork/domain-seedwork/domain-event';

export interface PropertyCreatedProps {
  id: string;
}

export class PropertyCreatedEvent extends CustomDomainEventImpl<PropertyCreatedProps> {}
