import { Entity, EntityProps } from '../../shared/entity';
import { CommunityVisa } from '../iam/community-visa';
import { CommunityPermissions as CommunityPermissionsSpec } from './community';

export interface CommunityPermissionsProps extends CommunityPermissionsSpec, EntityProps {}

export class CommunityPermissions extends Entity<CommunityPermissionsProps> implements CommunityPermissionsEntityReference {
  constructor(props: CommunityPermissionsProps,private visa:CommunityVisa) {super(props);}

  get canManageRolesAndPermissions(): boolean {return this.props.canManageRolesAndPermissions;}
  get canManageCommunitySettings(): boolean {return this.props.canManageCommunitySettings;}
  get canManageSiteContent(): boolean {return this.props.canManageSiteContent;}
  get canManageMembers(): boolean {return this.props.canManageMembers;}
  get canEditOwnMemberProfile(): boolean {return this.props.canEditOwnMemberProfile;}
  get canEditOwnMemberAccounts(): boolean {return this.props.canEditOwnMemberAccounts;}
  get isEditingOwnMemberAccount(): boolean { return false;}
  get isSystemAccount(): boolean {return false;}

  public setCanManageRolesAndPermissions(value:boolean): void {
    if(!  this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageRolesAndPermissions = value;
  }

  public setCanManageCommunitySettings(value:boolean): void {
    if(!  this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageCommunitySettings = value;
  }

  public setCanManageSiteContent(value:boolean): void {
    if(!  this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageCommunitySettings = value;
  }

  public setCanManageMembers(value:boolean): void {
    if(!  this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageMembers = value;
  }

  public setCanEditOwnMemberProfile(value:boolean): void {
    if(!  this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('Cannot set permission');
    }
    this.props.canEditOwnMemberProfile = value;
  }

  public setCanEditOwnMemberAccounts(value:boolean): void {
    if(!  this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('Cannot set permission');
    }
    this.props.canEditOwnMemberAccounts = value;
  }
}

export interface CommunityPermissionsEntityReference extends Readonly<CommunityPermissionsProps> {}