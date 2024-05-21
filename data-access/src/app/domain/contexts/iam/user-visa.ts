import { UserPermissions } from '../user/user';
import { Visa } from '../../../../../seedwork/passport-seedwork/visa';

export interface UserVisa extends Visa{
  determineIf(func:((permissions:UserPermissions) => boolean)) :  boolean ;
}