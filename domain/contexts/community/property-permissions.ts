import { Entity, EntityProps } from '../../shared/entity';
import { CommunityVisa } from '../iam/community-visa';
import { PropertyPermissions as PropertyPermissionsSpec } from '../property/property';

export interface PropertyPermissionsProps extends PropertyPermissionsSpec, EntityProps {}

export class PropertyPermissions extends Entity<PropertyPermissionsProps> implements PropertyPermissionsEntityReference {
  constructor(props: PropertyPermissionsProps,private visa:CommunityVisa) {super(props);}

  get canManageProperties(): boolean {return this.props.canManageProperties;}
  get canEditOwnProperty(): boolean {return this.props.canEditOwnProperty;}
  get isEditingOwnProperty(): boolean { return false;}
  get isSystemAccount(): boolean {return false;}

  public setCanManageProperties(value:boolean): void {
    if(!  this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageProperties = value;
  }

  public setCanEditOwnProperty(value:boolean): void {
    if(!  this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canEditOwnProperty = value;
  }

}

export interface PropertyPermissionsEntityReference extends Readonly<PropertyPermissionsProps> {}