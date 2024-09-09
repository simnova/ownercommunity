import { DomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface ViolationTicketV1UpdatedProps {
  id: string;
}

export class ViolationTicketV1UpdatedEvent extends DomainEventImpl<ViolationTicketV1UpdatedProps> {}
