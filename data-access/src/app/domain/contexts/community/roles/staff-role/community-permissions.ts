import { Entity, EntityProps } from '../../../../../../../seedwork/domain-seedwork/entity';
import { CommunityVisa } from "../../community.visa";

export interface StaffRoleCommunityPermissionsSpec {
  canManageStaffRolesAndPermissions?: boolean;
  canManageAllCommunities?: boolean
  canDeleteCommunities?: boolean;
  canChangeCommunityOwner?: boolean;
  canReIndexSearchCollections?: boolean;
}

export interface StaffRoleCommunityPermissionsProps extends StaffRoleCommunityPermissionsSpec, EntityProps {}

export class StaffRoleCommunityPermissions extends Entity<StaffRoleCommunityPermissionsProps> implements StaffRoleCommunityPermissionsEntityReference {
  constructor(props: StaffRoleCommunityPermissionsProps, private visa: CommunityVisa) {
    super(props);
  }

  get canManageStaffRolesAndPermissions(): boolean {
    return this.props.canManageStaffRolesAndPermissions;
  }
  get canManageAllCommunities(): boolean {
    return this.props.canManageAllCommunities;
  }
  get canDeleteCommunities(): boolean {
    return this.props.canDeleteCommunities
  }
  get canChangeCommunityOwner(): boolean {
    return this.props.canChangeCommunityOwner;
  }
  get canReIndexSearchCollections(): boolean {
    return this.props.canReIndexSearchCollections;
  }

  // using setters from TS 5.1

  set canManageStaffRolesAndPermissions(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageStaffRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission1');
    }
    this.props.canManageStaffRolesAndPermissions = value;
  }

  set canManageAllCommunities(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageStaffRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission2');
    }
    this.props.canManageAllCommunities = value;
  }

  set canDeleteCommunities(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageStaffRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission3');
    }
    this.props.canDeleteCommunities = value;
  }

  set canChangeCommunityOwner(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageStaffRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canChangeCommunityOwner = value;
  }

  set canReIndexSearchCollections(value: boolean) {
    if (!this.visa.determineIf((permissions) => permissions.canManageStaffRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canReIndexSearchCollections = value;
  }
}

export interface StaffRoleCommunityPermissionsEntityReference extends Readonly<StaffRoleCommunityPermissionsProps> {}



