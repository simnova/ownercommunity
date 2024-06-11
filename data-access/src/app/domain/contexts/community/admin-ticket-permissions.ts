import { Entity, EntityProps } from '../../../../../seedwork/domain-seedwork/entity';
import { CommunityVisa } from '../iam/domain-visa/community-visa';
import { AdminTicketPermissions as AdminTicketPermissionsSpec } from '../service-ticket/admin-ticket-permissions.spec';

export interface AdminTicketPermissionsProps extends AdminTicketPermissionsSpec, EntityProps {}

export class AdminTicketPermissions extends Entity<AdminTicketPermissionsProps> implements AdminTicketPermissionsEntityReference {
  constructor(props: AdminTicketPermissionsProps, private visa: CommunityVisa) {
    super(props);
  }

  get canCreateTickets(): boolean {
    return this.props.canCreateTickets;
  }
  get canManageTickets(): boolean {
    return this.props.canManageTickets;
  }
  get canAssignTickets(): boolean {
    return this.props.canAssignTickets;
  }
  get canWorkOnTickets(): boolean {
    return this.props.canWorkOnTickets;
  }
  get isEditingOwnTicket(): boolean {
    return false;
  }
  get isEditingAssignedTicket(): boolean {
    return false;
  }
  get isSystemAccount(): boolean {
    return false;
  }

  // setters using ts 5.1

  set canCreateTickets(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canCreateTickets = value;
  }

  set canManageTickets(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageTickets = value;
  }

  set canAssignTickets(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canAssignTickets = value;
  }

  set canWorkOnTickets(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canWorkOnTickets = value;
  }
}

export interface AdminTicketPermissionsEntityReference extends Readonly<AdminTicketPermissionsProps> {}
