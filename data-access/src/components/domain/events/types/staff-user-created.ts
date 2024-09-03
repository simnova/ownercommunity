import { CustomDomainEventImpl } from '../../../../../framework/seedwork/domain-seedwork/domain-event';

export interface StaffUserCreatedProps {
  externalId: string;
}

export class StaffUserCreatedEvent extends CustomDomainEventImpl<StaffUserCreatedProps> {}
