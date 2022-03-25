import { Entity, EntityProps } from '../../shared/entity';
import { CommunityVisa } from '../iam/community-visa';
import { CommunityPermissions as CommunityPermissionsSpec } from './community';

export interface CommunityPermissionsProps extends CommunityPermissionsSpec, EntityProps {}

export class CommunityPermissions extends Entity<CommunityPermissionsProps> implements CommunityPermissionsEntityReference {
  constructor(props: CommunityPermissionsProps,private visa:CommunityVisa) {super(props);}

  get canManageRolesAndPermissions(): boolean {return this.props.canManageRolesAndPermissions;}
  get canManageCommunitySettings(): boolean {return this.props.canManageCommunitySettings;}
  get canManageSiteContent(): boolean {return this.props.canManageSiteContent;}

  public async setCanManageRolesAndPermissions(value:boolean): Promise<void> {
    if(!  this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageRolesAndPermissions = value;
  }

  public async setCanManageCommunitySettings(value:boolean): Promise<void> {
    if(!  this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageCommunitySettings = value;
  }

  public async setCanManageSiteContent(value:boolean): Promise<void> {
    if(!  this.visa.determineIf((permissions) => permissions.canManageSiteContent)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageCommunitySettings = value;
  }
}

export interface CommunityPermissionsEntityReference extends Readonly<CommunityPermissionsProps> {}