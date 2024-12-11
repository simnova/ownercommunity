import { CustomDomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface VendorUserCreatedProps {
  userId: string;
}

export class VendorUserCreatedEvent extends CustomDomainEventImpl<VendorUserCreatedProps> {}
