import { MemberEntityReference } from '../../community/member';
import { AdminTicketEntityReference } from '../../service-ticket/admin-ticket';
import { AdminTicketPermissions } from "../../service-ticket/admin-ticket-permissions.spec";
import { AdminTicketVisa } from './admin-ticket-visa';


export class AdminTicketVisaImplForAdminTicket<root extends AdminTicketEntityReference> implements AdminTicketVisa {
  constructor(private root: root, private member: MemberEntityReference) {
  }

  determineIf(func: ((permissions: AdminTicketPermissions) => boolean)): boolean {
    //ensure that the member is a member of this community
    if (!this.member || this.member.community.id !== this.root.community.id) {
      console.log("Admin Ticket Visa : member is not a member of this community", this.member, this.root);
      return false;
    }
    const adminTicketPermissions = this.member.role.permissions.serviceTicketPermissions;
    if (!adminTicketPermissions) {
      console.log("Admin Ticket Visa : no community permissions");
      return false;
    }

    const updatedPermissions = Object.create(adminTicketPermissions, {
      isEditingOwnTicket: {
        value: (this.member.id === this.root.requestor.id)
      },
      isEditingAssignedTickets: {
        value: (
          this.root.assignedTo?.id &&
          this.member.id === this.root.assignedTo.id)
      } //overwrite isEditingOwnProperty based on user ownership
    }) as AdminTicketPermissions;
    console.log("Admin Ticket Visa : updated permissions", updatedPermissions);

    return func(updatedPermissions);

  }
}
