import { Entity, EntityProps } from '../../../../../../seedwork/domain-seedwork/entity';
import { CommunityVisa } from "../community.visa";

export interface PropertyPermissionsSpec {
  canManageProperties: boolean;
  canEditOwnProperty: boolean;
  isEditingOwnProperty: boolean;
  isSystemAccount: boolean;
}

export interface PropertyPermissionsProps extends PropertyPermissionsSpec, EntityProps {}

export class PropertyPermissions extends Entity<PropertyPermissionsProps> implements PropertyPermissionsEntityReference {
  constructor(props: PropertyPermissionsProps, private visa: CommunityVisa) {
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

  set canManageProperties(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageProperties = value;
  }

  set canEditOwnProperty(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canEditOwnProperty = value;
  }
}

export interface PropertyPermissionsEntityReference extends Readonly<PropertyPermissionsProps> {}
