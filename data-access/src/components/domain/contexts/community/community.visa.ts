import { Visa } from "../../../../../framework/seedwork/passport-seedwork/visa";
import { StaffRoleCommunityPermissionsSpec } from "./roles/staff-role/staff-role-community-permissions";
import { EndUserRoleCommunityPermissionsSpec } from "./roles/end-user-role/end-user-role-community-permissions";

export interface CommunityPermissionsSpec extends StaffRoleCommunityPermissionsSpec, EndUserRoleCommunityPermissionsSpec {}

export interface CommunityVisa extends Visa {
  determineIf(func: ((permissions: CommunityPermissionsSpec) => boolean)): boolean;
}

