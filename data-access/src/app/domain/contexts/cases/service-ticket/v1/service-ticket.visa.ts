
import { Visa } from '../../../../../../../seedwork/passport-seedwork/visa';
import { MemberEntityReference } from '../../../community/member/member';
import { ServiceTicketV1EntityReference } from './service-ticket';

export interface ServiceTicketV1Permissions {
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canAssignTickets: boolean;
  canWorkOnTickets: boolean;
  isEditingOwnTicket: boolean;
  isEditingAssignedTicket: boolean;
  isSystemAccount: boolean;
}

export interface ServiceTicketV1Visa extends Visa {
  determineIf(func:((permissions:ServiceTicketV1Permissions) => boolean)) :  boolean ;
}

export class ServiceTicketV1VisaImpl<root extends ServiceTicketV1EntityReference> implements ServiceTicketV1Visa {
  constructor(private root: root, private member: MemberEntityReference) {
  }

  determineIf(func: ((permissions: ServiceTicketV1Permissions) => boolean)): boolean {
    //ensure that the member is a member of this community
    if (!this.member || this.member.community.id !== this.root.community.id) {
      console.log("Service Ticket Visa : member is not a member of this community", this.member, this.root);
      return false;
    }
    const serviceTicketPermissions = this.member.role.permissions.serviceTicketPermissions;
    if (!serviceTicketPermissions) {
      console.log("Service Ticket Visa : no community permissions");
      return false;
    }

    const updatedPermissions = Object.create(serviceTicketPermissions, {
      isEditingOwnTicket: {
        value: (this.member.id === this.root.requestor.id)
      },
      isEditingAssignedTickets: {
        value: (
          this.root.assignedTo?.id &&
          this.member.id === this.root.assignedTo.id)
      } //overwrite isEditingOwnProperty based on user ownership
    }) as ServiceTicketV1Permissions;
    console.log("Service Ticket Visa : updated permissions", updatedPermissions);

    return func(updatedPermissions);

  }
}

