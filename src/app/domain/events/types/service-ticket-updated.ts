import { CustomDomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface ServiceTicketUpdatedProps {
  id: string;
}

export class ServiceTicketUpdatedEvent extends CustomDomainEventImpl<ServiceTicketUpdatedProps> {}
