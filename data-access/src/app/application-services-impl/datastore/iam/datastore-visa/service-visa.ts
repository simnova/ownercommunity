
import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';
import { ServicePermissions } from '../../../../external-dependencies/datastore';

export interface ServiceVisa extends Visa {
  determineIf(func:((permissions: ServicePermissions) => boolean)) : boolean;
}