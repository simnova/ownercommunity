import { DomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface ServiceTicketV1CreatedProps {
  id: string;
}

export class ServiceTicketV1CreatedEvent extends DomainEventImpl<ServiceTicketV1CreatedProps> {}
