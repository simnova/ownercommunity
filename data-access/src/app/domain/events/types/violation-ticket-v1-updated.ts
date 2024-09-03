import { CustomDomainEventImpl } from '../../../../../framework/seedwork/domain-seedwork/domain-event';

export interface ViolationTicketV1UpdatedProps {
  id: string;
}

export class ViolationTicketV1UpdatedEvent extends CustomDomainEventImpl<ViolationTicketV1UpdatedProps> {}
