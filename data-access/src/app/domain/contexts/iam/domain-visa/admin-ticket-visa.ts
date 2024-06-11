
import { AdminTicketPermissions } from "../../service-ticket/admin-ticket-permissions.spec";
import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';

export interface AdminTicketVisa extends Visa {
  determineIf(func:((permissions:AdminTicketPermissions) => boolean)) :  boolean ;
}

