import { CustomDomainEventImpl } from '../shared/domain-event';

export interface ServiceTicketDeletedEventProps {
  id: string;
}

export class ServiceTicketDeletedEvent extends CustomDomainEventImpl<ServiceTicketDeletedEventProps> {
  constructor(aggregateRootId: string) {
    super(aggregateRootId);
  }
}
