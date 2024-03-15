import { CustomDomainEventImpl } from '../../domain-seedwork/domain-event';

export interface RoleDeletedReassignProps {
  deletedRoleId: string;
  newRoleId: string;
}

export class RoleDeletedReassignEvent extends CustomDomainEventImpl<RoleDeletedReassignProps> {}
