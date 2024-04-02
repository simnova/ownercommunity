import { CustomDomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface ServiceTicketCreatedProps {
  id: string;
}

export class ServiceTicketCreatedEvent extends CustomDomainEventImpl<ServiceTicketCreatedProps> {}
