import { ValueObject, ValueObjectProps } from '../../../../../../../framework/seedwork/domain-seedwork/value-object';
import { CommunityVisa } from "../../community.visa";

export interface EndUserRoleServicePermissionsSpec {
  canManageServices?: boolean;
  isSystemAccount?: boolean;
}

export interface EndUserRoleServicePermissionsProps extends EndUserRoleServicePermissionsSpec, ValueObjectProps {}

export class EndUserRoleServicePermissions extends ValueObject<EndUserRoleServicePermissionsProps> implements EndUserRoleServicePermissionsEntityReference {
  constructor(props: EndUserRoleServicePermissionsProps,private visa:CommunityVisa) {super(props);}

  get canManageServices(): boolean {return this.props.canManageServices;}
  get isSystemAccount(): boolean {return false;}

  // using setters from TS 5.1

  set CanManageServices(value:boolean) {
    if(! this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageServices = value;
  }
}

export interface EndUserRoleServicePermissionsEntityReference extends Readonly<EndUserRoleServicePermissionsProps> {}
