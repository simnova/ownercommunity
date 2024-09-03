import { ValueObject, ValueObjectProps } from '../../../../../../../framework/seedwork/domain-seedwork/value-object';
import { CommunityVisa } from "../../community.visa";

export interface EndUserRolePropertyPermissionsSpec {
  canManageProperties?: boolean;
  canEditOwnProperty?: boolean;
  isEditingOwnProperty?: boolean;
  isSystemAccount?: boolean;
}

export interface EndUserRolePropertyPermissionsProps extends EndUserRolePropertyPermissionsSpec, ValueObjectProps {}

export class EndUserRolePropertyPermissions extends ValueObject<EndUserRolePropertyPermissionsProps> implements EndUserRolePropertyPermissionsEntityReference {
  constructor(props: EndUserRolePropertyPermissionsProps, private visa: CommunityVisa) {
    super(props);
  }

  get canManageProperties(): boolean {
    return this.props.canManageProperties;
  }
  get canEditOwnProperty(): boolean {
    return this.props.canEditOwnProperty;
  }
  get isEditingOwnProperty(): boolean {
    return false;
  }
  get isSystemAccount(): boolean {
    return false;
  }

  // setters using TS 5.1

  set CanManageProperties(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageProperties = value;
  }

  set CanEditOwnProperty(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canEditOwnProperty = value;
  }
}

export interface EndUserRolePropertyPermissionsEntityReference extends Readonly<EndUserRolePropertyPermissionsProps> {}
