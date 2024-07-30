
import { Visa } from '../../../../seedwork/passport-seedwork/visa';
import { StaffRoleCommunityPermissions, EndUserRoleCommunityPermissions } from '../../external-dependencies/datastore';

export type CommunityPermissions = StaffRoleCommunityPermissions | EndUserRoleCommunityPermissions;

export interface CommunityVisa extends Visa {
  determineIf(func:((permissions: CommunityPermissions) => boolean)) : boolean;
}