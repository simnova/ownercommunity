
import { ViolationTicketPermissions } from "../../violation-ticket/violation-ticket-permissions.spec";
import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';

export interface ViolationTicketVisa extends Visa {
  determineIf(func:((permissions:ViolationTicketPermissions) => boolean)) :  boolean ;
}

