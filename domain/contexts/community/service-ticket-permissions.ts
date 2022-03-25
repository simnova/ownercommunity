import { Entity, EntityProps } from '../../shared/entity';
import { CommunityVisa } from '../iam/community-visa';
import { ServiceTicketVisa } from '../iam/service-ticket-visa';
import { ServiceTicketPermissions as ServiceTicketPermissionsSpec } from '../service-ticket/service-ticket';

export interface ServiceTicketPermissionsProps extends ServiceTicketPermissionsSpec, EntityProps {}

export class ServiceTicketPermissions extends Entity<ServiceTicketPermissionsProps> implements ServiceTicketPermissionsEntityReference {
  constructor(props: ServiceTicketPermissionsProps,private visa:CommunityVisa) {super(props);}

  get canCreateTickets(): boolean {return this.props.canCreateTickets;}
  get canManageTickets(): boolean {return this.props.canManageTickets;}
  get canAssignTickets(): boolean {return this.props.canAssignTickets;}
  get canWorkOnTickets(): boolean {return this.props.canWorkOnTickets;}
  get isEditingOwnTicket(): boolean {return false;}
  get isEditingAssignedTicket(): boolean { return false;}
  get isSystemAccount(): boolean {return false;}

  public setCanCreateTickets(value:boolean): void {
    if(!  this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('Cannot set permission');
    }
    this.props.canCreateTickets = value;
  }

  public setCanManageTickets(value:boolean): void {
    if(!  this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageTickets = value;
  }

  public setCanAssignTickets(value:boolean): void {
    if(!  this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('Cannot set permission');
    }
    this.props.canAssignTickets = value;
  }

  public setCanWorkOnTickets(value:boolean): void {
    if(!  this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('Cannot set permission');
    }
    this.props.canWorkOnTickets = value;
  }

}

export interface ServiceTicketPermissionsEntityReference extends Readonly<ServiceTicketPermissionsProps> {}