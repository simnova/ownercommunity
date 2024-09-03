import { CustomDomainEventImpl } from '../../../../../framework/seedwork/domain-seedwork/domain-event';

export interface PropertyDeletedEventProps {
  id: string;
}

export class PropertyDeletedEvent extends CustomDomainEventImpl<PropertyDeletedEventProps> {}
