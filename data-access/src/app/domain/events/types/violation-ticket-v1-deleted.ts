import { DomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface ViolationTicketV1DeletedEventProps {
  id: string;
}

export class ViolationTicketV1DeletedEvent extends DomainEventImpl<ViolationTicketV1DeletedEventProps> {}
