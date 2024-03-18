import { CustomDomainEventImpl } from '../../../domain-seedwork/domain-event';

export interface ServiceTicketUpdatedProps {
  id: string;
}

export class ServiceTicketUpdatedEvent extends CustomDomainEventImpl<ServiceTicketUpdatedProps> {}
