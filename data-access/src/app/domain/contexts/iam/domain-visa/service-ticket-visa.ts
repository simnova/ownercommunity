
import { ServiceTicketPermissions } from "../../service-ticket/service-ticket-permissions.spec";
import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';

export interface ServiceTicketVisa extends Visa {
  determineIf(func:((permissions:ServiceTicketPermissions) => boolean)) :  boolean ;
}