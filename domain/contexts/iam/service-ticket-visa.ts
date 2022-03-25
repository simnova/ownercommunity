
import { MemberEntityReference } from '../community/member';
import { ServiceTicketEntityReference, ServiceTicketPermissions } from '../service-ticket/service-ticket';
import { Visa } from './passport';

export class ServiceTicketVisaImpl<root extends ServiceTicketEntityReference> implements ServiceTicketVisa {
  constructor(private root: root, private member: MemberEntityReference) {
  }  
  
  determineIf(func:((permissions:ServiceTicketPermissions) => boolean)) :  boolean {
    //ensure that the member is a member of this community
    if(!this.member || this.member.community.id !== this.root.community.id) {
      return false;
    }
    const serviceTicketPermissions = this.member.role.permissions.serviceTicketPermissions;
    if(! serviceTicketPermissions) {return false;}

    var updatedPermissions = { 
      ...serviceTicketPermissions, 
      ...{
        isEditingOwnServiceTicket : (this.member.id === this.root.requestor.id),
        isEditingAssignedTickets : (this.member.id === this.root.assignedTo.id),        
      } //overwrite isEditingOwnServiceTicket based on user ownership
    } as ServiceTicketPermissions;
    return func(updatedPermissions);
    
  }
}

export interface ServiceTicketVisa extends Visa {
  determineIf(func:((permissions:ServiceTicketPermissions) => boolean)) :  boolean ;
}