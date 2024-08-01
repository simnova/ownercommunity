import { Visa } from "../../../../../../../seedwork/passport-seedwork/visa";
import { ViolationTicketV1EntityReference } from "./violation-ticket";
import { MemberEntityReference } from "../../../community/member/member";
import { StaffRoleViolationTicketPermissionsSpec } from "../../../community/roles/staff-role/violation-ticket-permissions";
import { EndUserRoleViolationTicketPermissionsSpec } from "../../../community/roles/end-user-role/violation-ticket-permissions";

export interface ViolationTicketPermissionsSpec extends StaffRoleViolationTicketPermissionsSpec, EndUserRoleViolationTicketPermissionsSpec {}

export interface ViolationTicketV1Visa extends Visa {
  determineIf(func:((permissions:ViolationTicketPermissionsSpec) => boolean)) :  boolean ;
}

export class ViolationTicketV1VisaImpl<root extends ViolationTicketV1EntityReference> implements ViolationTicketV1Visa {
  constructor(private root: root, private member: MemberEntityReference) { }

  determineIf(func: (permissions: ViolationTicketPermissionsSpec) => boolean): boolean {
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
    }) as ViolationTicketPermissionsSpec;
    console.log('Violation Ticket Visa : updated permissions', updatedPermissions);

    return func(updatedPermissions);
  }
}


