import { Entity, EntityProps } from '../../../../../seedwork/domain-seedwork/entity';
import { CommunityVisa } from '../iam/community-visa';
import { ServicePermissions as ServicePermissionsSpec } from "../service-ticket/service-permissions.spec";

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