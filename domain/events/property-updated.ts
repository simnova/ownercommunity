import { CustomDomainEventImpl } from '../shared/domain-event';

export interface PropertyUpdatedProps {
  id: string;
}

export class PropertyUpdatedEvent extends CustomDomainEventImpl<PropertyUpdatedProps>  {
  constructor(aggregateRootId: string) {super(aggregateRootId);}
}