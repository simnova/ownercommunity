
import { ServiceTicketPermissions } from "../../cases/service-ticket/v1/service-ticket-permissions.spec";
import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';

export interface ServiceTicketVisa extends Visa {
  determineIf(func:((permissions:ServiceTicketPermissions) => boolean)) :  boolean ;
}