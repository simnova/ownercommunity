
import { Visa } from '../../../../../../../seedwork/passport-seedwork/visa';
import { MemberEntityReference } from '../../../community/member/member';
import { ViolationTicketV1EntityReference } from './violation-ticket';

export interface ViolationTicketV1Permissions {
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canAssignTickets: boolean;
  canWorkOnTickets: boolean;
  isEditingOwnTicket: boolean;
  isEditingAssignedTicket: boolean;
  isSystemAccount: boolean;
}

export interface ViolationTicketV1Visa extends Visa {
  determineIf(func:((permissions:ViolationTicketV1Permissions) => boolean)) :  boolean ;
}

export class ViolationTicketV1VisaImpl<root extends ViolationTicketV1EntityReference> implements ViolationTicketV1Visa {
  constructor(private root: root, private member: MemberEntityReference) { }

  determineIf(func: (permissions: ViolationTicketV1Permissions) => boolean): boolean {
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
    console.log("root", this.root, "member", this.member);
    const updatedPermissions = Object.create(violationTicketPermissions, {
      isEditingOwnTicket: {
        value: this.member.id === this.root.requestor.id,
      },
      isEditingAssignedTicket: {
        value: this.root.assignedTo?.id && this.member.id === this.root.assignedTo.id,
      }, //overwrite isEditingOwnProperty based on user ownership
    }) as ViolationTicketV1Permissions;
    console.log('Violation Ticket Visa : updated permissions', updatedPermissions);

    return func(updatedPermissions);
  }
}


