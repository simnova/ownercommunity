import { CustomDomainEventImpl } from '../shared/domain-event';

export interface ServiceTicketUpdatedProps {
  id: string;
}

export class ServiceTicketUpdatedEvent extends CustomDomainEventImpl<ServiceTicketUpdatedProps> {
  constructor(aggregateRootId: string) {
    super(aggregateRootId);
  }
}
