import { CustomDomainEventImpl } from '../../domain-seedwork/domain-event';

export interface ServiceTicketCreatedProps {
  id: string;
}

export class ServiceTicketCreatedEvent extends CustomDomainEventImpl<ServiceTicketCreatedProps> {}
