import { Entity, EntityProps } from '../../../../../../seedwork/domain-seedwork/entity';
import { CommunityVisa } from "../community.visa";

export interface ServicePermissionsSpec {
  canManageServices: boolean;
  isSystemAccount: boolean;
}

export interface ServicePermissionsProps extends ServicePermissionsSpec, EntityProps {}

export class ServicePermissions extends Entity<ServicePermissionsProps> implements ServicePermissionsEntityReference {
  constructor(props: ServicePermissionsProps,private visa:CommunityVisa) {super(props);}

  get canManageServices(): boolean {return this.props.canManageServices;}
  get isSystemAccount(): boolean {return false;}

  // using setters from TS 5.1

  set canManageServices(value:boolean) {
    if(! this.visa.determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      throw new Error('Cannot set permission');
    }
    this.props.canManageServices = value;
  }
}

export interface ServicePermissionsEntityReference extends Readonly<ServicePermissionsProps> {}
