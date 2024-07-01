import { CustomDomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface ViolationTicketUpdatedProps {
  id: string;
}

export class ViolationTicketUpdatedEvent extends CustomDomainEventImpl<ViolationTicketUpdatedProps> {}
