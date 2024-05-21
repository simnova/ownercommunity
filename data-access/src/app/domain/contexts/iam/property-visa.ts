
import { PropertyPermissions } from "../property/property-permissions.spec";
import { Visa } from '../../../../../seedwork/passport-seedwork/visa';

export interface PropertyVisa extends Visa {
  determineIf(func:((permissions:PropertyPermissions) => boolean)) :  boolean ;
}