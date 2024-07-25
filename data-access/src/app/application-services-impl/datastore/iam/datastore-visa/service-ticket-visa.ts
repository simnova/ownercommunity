import { Visa } from "../../../../../../seedwork/passport-seedwork/visa";
import { ServiceTicketPermissions } from "../../../../external-dependencies/datastore";


export interface ServiceTicketVisa extends Visa {
  determineIf(func:((permissions: ServiceTicketPermissions) => boolean)) : boolean;
}