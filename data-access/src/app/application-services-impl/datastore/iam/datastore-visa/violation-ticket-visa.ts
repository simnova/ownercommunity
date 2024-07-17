
import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';
import { ViolationTicketPermissions } from '../../../../external-dependencies/datastore';

export interface ViolationTicketVisa extends Visa {
  determineIf(func:((permissions: ViolationTicketPermissions) => boolean)) : boolean;
}