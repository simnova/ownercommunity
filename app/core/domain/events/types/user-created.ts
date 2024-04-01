import { CustomDomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface UserCreatedProps {
  userId: string;
}

export class UserCreatedEvent extends CustomDomainEventImpl<UserCreatedProps> {}
