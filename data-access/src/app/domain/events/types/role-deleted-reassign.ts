import { CustomDomainEventImpl } from '../../../../../framework/seedwork/domain-seedwork/domain-event';

export interface RoleDeletedReassignProps {
  deletedRoleId: string;
  newRoleId: string;
}

export class RoleDeletedReassignEvent extends CustomDomainEventImpl<RoleDeletedReassignProps> {}
