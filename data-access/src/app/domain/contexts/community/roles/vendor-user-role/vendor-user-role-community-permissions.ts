import { ValueObject, ValueObjectProps } from '../../../../../../../seedwork/domain-seedwork/value-object';
import { CommunityVisa } from "../../community.visa";

export interface VendorUserRoleCommunityPermissionsSpec {
  canManageRolesAndPermissions?: boolean;
  canManageCommunitySettings?: boolean;
  canManageSiteContent?: boolean;
  canManageMembers?: boolean;
  canEditOwnMemberProfile?: boolean;
  canEditOwnMemberAccounts?: boolean;
  isEditingOwnMemberAccount?: boolean;
  isSystemAccount?: boolean;
}

export interface VendorUserRoleCommunityPermissionsProps extends VendorUserRoleCommunityPermissionsSpec, ValueObjectProps {}

export class VendorUserRoleCommunityPermissions extends ValueObject<VendorUserRoleCommunityPermissionsProps> implements VendorUserRoleCommunityPermissionsEntityReference {
  constructor(props: VendorUserRoleCommunityPermissionsProps, private visa: CommunityVisa) {
    super(props);
  }

  get canManageRolesAndPermissions(): boolean {
    return this.props.canManageRolesAndPermissions;
  }
  get canManageCommunitySettings(): boolean {
    return this.props.canManageCommunitySettings;
  }
  get canManageSiteContent(): boolean {
    return this.props.canManageSiteContent;
  }
  get canManageMembers(): boolean {
    return this.props.canManageMembers;
  }
  get canEditOwnMemberProfile(): boolean {
    return this.props.canEditOwnMemberProfile;
  }
  get canEditOwnMemberAccounts(): boolean {
    return this.props.canEditOwnMemberAccounts;
  }
  get isEditingOwnMemberAccount(): boolean {
    return false;
  }
  get isSystemAccount(): boolean {
    return false;
  }

  // using setters from TS 5.1

  set CanManageRolesAndPermissions(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission1');
    }
    this.props.canManageRolesAndPermissions = value;
  }

  set CanManageCommunitySettings(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission2');
    }
    this.props.canManageCommunitySettings = value;
  }

  set CanManageSiteContent(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission3');
    }
    this.props.canManageSiteContent = value;
  }

  set CanManageMembers(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageMembers = value;
  }

  set CanEditOwnMemberProfile(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canEditOwnMemberProfile = value;
  }

  set CanEditOwnMemberAccounts(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canEditOwnMemberAccounts = value;
  }
}

export interface VendorUserRoleCommunityPermissionsEntityReference extends Readonly<VendorUserRoleCommunityPermissionsProps> {}



