import { MemberEntityReference } from '../../community/member';
import { ViolationTicketEntityReference } from '../../violation-ticket/violation-ticket';
import { ViolationTicketPermissions } from '../../violation-ticket/violation-ticket-permissions.spec';
import { ViolationTicketVisa as ViolationTicketVisa } from './violation-ticket-visa';

export class ViolationTicketVisaImplForViolationTicket<root extends ViolationTicketEntityReference> implements ViolationTicketVisa {
  constructor(private root: root, private member: MemberEntityReference) {}

  determineIf(func: (permissions: ViolationTicketPermissions) => boolean): boolean {
    //ensure that the member is a member of this community
    if (!this.member || this.member.community.id !== this.root.community.id) {
      console.log('Violation Ticket Visa : member is not a member of this community', this.member, this.root);
      return false;
    }
    const violationTicketPermissions = this.member.role.permissions.violationTicketPermissions;
    if (!violationTicketPermissions) {
      console.log('Violation Ticket Visa : no community permissions');
      return false;
    }

    const updatedPermissions = Object.create(violationTicketPermissions, {
      isEditingOwnTicket: {
        value: this.member.id === this.root.requestor.id,
      },
      isEditingAssignedTickets: {
        value: this.root.assignedTo?.id && this.member.id === this.root.assignedTo.id,
      }, //overwrite isEditingOwnProperty based on user ownership
    }) as ViolationTicketPermissions;
    console.log('Violation Ticket Visa : updated permissions', updatedPermissions);

    return func(updatedPermissions);
  }
}
