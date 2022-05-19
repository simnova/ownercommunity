import { CustomDomainEventImpl } from '../shared/domain-event';

export interface PropertyDeletedEventProps {
  id: string;
}

export class PropertyDeletedEvent extends CustomDomainEventImpl<PropertyDeletedEventProps>  {
  constructor(aggregateRootId: string) {super(aggregateRootId);}
}