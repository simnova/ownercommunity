
import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';
import { CommunityPermissions } from '../../../../external-dependencies/datastore';

export interface CommunityVisa extends Visa {
  determineIf(func:((permissions: CommunityPermissions) => boolean)) : boolean;
}