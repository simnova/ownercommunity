
import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';
import { PropertyPermissions } from '../../../../external-dependencies/datastore';

export interface PropertyVisa extends Visa {
  determineIf(func:((permissions: PropertyPermissions) => boolean)) : boolean;
}