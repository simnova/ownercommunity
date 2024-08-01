import { CustomDomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface ServiceTicketV1DeletedEventProps {
  id: string;
}

export class ServiceTicketV1DeletedEvent extends CustomDomainEventImpl<ServiceTicketV1DeletedEventProps> {}
