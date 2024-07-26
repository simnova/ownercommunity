import { ServiceTicketPermissions, MemberData, ServiceTicketData } from "../../../../external-dependencies/datastore";
import { ServiceTicketVisa } from "./service-ticket-visa";

export class ServiceTicketVisaImplForServiceTicket<root extends ServiceTicketData> implements ServiceTicketVisa {
  constructor(private root: root, private member: MemberData) {}

  determineIf(func:((permissions: ServiceTicketPermissions) => boolean)) : boolean {
    const serviceTicketPermissions = this.member.role.permissions.serviceTicketPermissions;
    if(!serviceTicketPermissions) {
      console.log("Service Ticket Visa : no service ticket permissions");
      return false;
    }

    return func(serviceTicketPermissions as ServiceTicketPermissions);
  }
}