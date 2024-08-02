
import { Visa } from '../../../../../seedwork/passport-seedwork/visa';
import { MemberData, ViolationTicketData, StaffRoleViolationTicketPermissions, EndUserRoleViolationTicketPermissions } from '../../../external-dependencies/datastore';

export type ViolationTicketPermissions = StaffRoleViolationTicketPermissions | EndUserRoleViolationTicketPermissions;

export interface ViolationTicketVisa extends Visa {
  determineIf(func:((permissions: ViolationTicketPermissions) => boolean)) : boolean;
}

export class ViolationTicketVisaImplForViolationTicket<root extends ViolationTicketData> implements ViolationTicketVisa {
  constructor(private root: root, private member: MemberData) { }

  determineIf(func: ((permissions: ViolationTicketPermissions) => boolean)): boolean {
    const violationTicketPermissions = this.member.role.permissions.violationTicketPermissions;
    if (!violationTicketPermissions) {
      console.log("Violation Ticket Visa : no violation ticket permissions");
      return false;
    }

    return func(violationTicketPermissions as ViolationTicketPermissions);
  }
}
