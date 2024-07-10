import { CustomDomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface ViolationTicketDeletedEventProps {
  id: string;
}

export class ViolationTicketDeletedEvent extends CustomDomainEventImpl<ViolationTicketDeletedEventProps> {}
