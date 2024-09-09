import { DomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface ServiceTicketV1DeletedEventProps {
  id: string;
}

export class ServiceTicketV1DeletedEvent extends DomainEventImpl<ServiceTicketV1DeletedEventProps> {}
