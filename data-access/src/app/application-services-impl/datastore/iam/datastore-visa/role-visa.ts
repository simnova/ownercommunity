
import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';
import { CommunityPermissions } from '../../../../external-dependencies/datastore';

export interface RoleVisa extends Visa {
  determineIf(func:((permissions:CommunityPermissions) => boolean)) :  boolean ;
}