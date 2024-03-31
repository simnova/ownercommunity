import { Entity, EntityProps } from '../../../../../seedwork/domain-seedwork/entity';
import { CommunityVisa } from '../iam/community-visa';
import { CommunityPermissions as CommunityPermissionsSpec } from './community-permissions.spec';

export interface CommunityPermissionsProps extends CommunityPermissionsSpec, EntityProps {}

export class CommunityPermissions extends Entity<CommunityPermissionsProps> implements CommunityPermissionsEntityReference {
  constructor(props: CommunityPermissionsProps, private visa: CommunityVisa) {
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

  set canManageRolesAndPermissions(value: boolean) {
    if (
      !this.visa.determineIf((permissions) => {
        const value = permissions.canManageRolesAndPermissions || permissions.isSystemAccount;
        return value;
      })
    ) {
      throw new Error('Cannot set permission1');
    }
    this.props.canManageRolesAndPermissions = value;
  }

  set canManageCommunitySettings(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission2');
    }
    this.props.canManageCommunitySettings = value;
  }

  set canManageSiteContent(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission3');
    }
    this.props.canManageSiteContent = value;
  }

  set canManageMembers(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageMembers = value;
  }

  set canEditOwnMemberProfile(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canEditOwnMemberProfile = value;
  }

  set canEditOwnMemberAccounts(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canEditOwnMemberAccounts = value;
  }
}

export interface CommunityPermissionsEntityReference extends Readonly<CommunityPermissionsProps> {}
