import { CustomDomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface PropertyUpdatedProps {
  id: string;
}

export class PropertyUpdatedEvent extends CustomDomainEventImpl<PropertyUpdatedProps> {}
