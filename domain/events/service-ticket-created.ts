import { CustomDomainEventImpl } from '../shared/domain-event';

export interface ServiceTicketCreatedProps {
  id: string;
}

export class ServiceTicketCreatedEvent extends CustomDomainEventImpl<ServiceTicketCreatedProps> {
  constructor(aggregateRootId: string) {
    super(aggregateRootId);
  }
}
