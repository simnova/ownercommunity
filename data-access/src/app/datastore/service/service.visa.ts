
import { Visa } from '../../../../seedwork/passport-seedwork/visa';
import { MemberData, ServiceData, StaffRoleServicePermissions, EndUserRoleServicePermissions } from '../../external-dependencies/datastore';

export type ServicePermissions = StaffRoleServicePermissions | EndUserRoleServicePermissions;

export interface ServiceVisa extends Visa {
  determineIf(func:((permissions: ServicePermissions) => boolean)) : boolean;
}
export class ServiceVisaImplForService<root extends ServiceData> implements ServiceVisa {
  constructor(private root: root, private member: MemberData) { }

  determineIf(func: ((permissions: ServicePermissions) => boolean)): boolean {
    const servicePermissions = this.member.role.permissions.servicePermissions;
    if (!servicePermissions) {
      console.log("Service Visa : no service permissions");
      return false;
    }

    return func(servicePermissions as ServicePermissions);
  }
}
