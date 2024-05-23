
import { CommunityPermissions } from "../../community/community-permissions.spec";
import { Visa } from '../../../../../../seedwork/passport-seedwork/visa';

export interface CommunityVisa extends Visa {
  determineIf(func:((permissions:CommunityPermissions) => boolean)) :  boolean ;
}