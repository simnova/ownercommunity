import { CustomDomainEventImpl } from '../../../../../framework/seedwork/domain-seedwork/domain-event';

export interface EndUserCreatedProps {
  userId: string;
}

export class EndUserCreatedEvent extends CustomDomainEventImpl<EndUserCreatedProps> {}
