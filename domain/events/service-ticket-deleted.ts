import { CustomDomainEventImpl } from '../../domain-seedwork/domain-event';

export interface ServiceTicketDeletedEventProps {
  id: string;
}

export class ServiceTicketDeletedEvent extends CustomDomainEventImpl<ServiceTicketDeletedEventProps> {}
