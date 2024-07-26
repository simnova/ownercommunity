import { Visa } from "../../../../../seedwork/passport-seedwork/visa";
import { CommunityPermissionsSpec } from "./role/community-permissions";

export interface CommunityVisa extends Visa {
  determineIf(func: ((permissions: CommunityPermissionsSpec) => boolean)): boolean;
}

