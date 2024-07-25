import { ViolationTicketPermissions, MemberData, ViolationTicketData } from "../../../../external-dependencies/datastore";
import { ViolationTicketVisa } from "./violation-ticket-visa";

export class ViolationTicketVisaImplForViolationTicket<root extends ViolationTicketData> implements ViolationTicketVisa {
  constructor(private root: root, private member: MemberData) {}

  determineIf(func:((permissions: ViolationTicketPermissions) => boolean)) : boolean {
    const violationTicketPermissions = this.member.role.permissions.violationTicketPermissions;
    if(!violationTicketPermissions) {
      console.log("Violation Ticket Visa : no violation ticket permissions");
      return false;
    }

    return func(violationTicketPermissions as ViolationTicketPermissions);
  }
}