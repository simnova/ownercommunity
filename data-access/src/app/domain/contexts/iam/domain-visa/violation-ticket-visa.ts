
import { ViolationTicketPermissions } from "../../cases/violation-ticket/v1/violation-ticket-permissions.spec";
import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';

export interface ViolationTicketVisa extends Visa {
  determineIf(func:((permissions:ViolationTicketPermissions) => boolean)) :  boolean ;
}

