
import { ServicePermissions } from "../service-ticket/service-permissions.spec";
import { Visa } from '../../../../../seedwork/passport-seedwork/visa';

export interface ServiceVisa extends Visa {
  determineIf(func:((permissions:ServicePermissions) => boolean)) :  boolean ;
}