import { CustomDomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface ServiceTicketV1CreatedProps {
  id: string;
}

export class ServiceTicketV1CreatedEvent extends CustomDomainEventImpl<ServiceTicketV1CreatedProps> {}
