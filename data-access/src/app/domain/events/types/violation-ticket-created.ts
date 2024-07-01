import { CustomDomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface ViolationTicketCreatedProps {
  id: string;
}

export class ViolationTicketCreatedEvent extends CustomDomainEventImpl<ViolationTicketCreatedProps> {}
