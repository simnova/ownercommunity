import { CustomDomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface ServiceTicketDeletedEventProps {
  id: string;
}

export class ServiceTicketDeletedEvent extends CustomDomainEventImpl<ServiceTicketDeletedEventProps> {}
