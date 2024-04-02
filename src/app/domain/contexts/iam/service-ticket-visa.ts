
import { MemberEntityReference } from '../community/member';
import { ServiceTicketEntityReference } from '../service-ticket/service-ticket';
import { ServiceTicketPermissions } from "../service-ticket/service-ticket-permissions.spec";
import { Visa } from './passport';

export class ServiceTicketVisaImpl<root extends ServiceTicketEntityReference> implements ServiceTicketVisa {
  constructor(private root: root, private member: MemberEntityReference) {
  }  
  
  determineIf(func:((permissions:ServiceTicketPermissions) => boolean)) :  boolean {
    //ensure that the member is a member of this community
    if(!this.member || this.member.community.id !== this.root.community.id) {
      console.log("Service Ticket Visa : member is not a member of this community", this.member, this.root);
      return false;
    }
    const serviceTicketPermissions = this.member.role.permissions.serviceTicketPermissions;
    if(! serviceTicketPermissions) {
      console.log("Service Ticket Visa : no community permissions");
      return false;
    }

    const updatedPermissions = Object.create(serviceTicketPermissions, {
      isEditingOwnTicket : {
        value: (this.member.id === this.root.requestor.id)
      },
      isEditingAssignedTickets : {
        value: (
          this.root.assignedTo?.id &&
          this.member.id === this.root.assignedTo.id)} //overwrite isEditingOwnProperty based on user ownership
    }) as ServiceTicketPermissions;
    console.log("Service Ticket Visa : updated permissions", updatedPermissions);

    return func(updatedPermissions);
    
  }
}

export interface ServiceTicketVisa extends Visa {
  determineIf(func:((permissions:ServiceTicketPermissions) => boolean)) :  boolean ;
}