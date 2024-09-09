import { DomainEventImpl } from '../../../../../seedwork/domain-seedwork/domain-event';

export interface RoleDeletedReassignProps {
  deletedRoleId: string;
  newRoleId: string;
}

export class RoleDeletedReassignEvent extends DomainEventImpl<RoleDeletedReassignProps> {}
