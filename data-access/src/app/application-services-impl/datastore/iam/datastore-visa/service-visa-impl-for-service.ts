
import { ServicePermissions, MemberData, ServiceData } from "../../../../external-dependencies/datastore";
import { ServiceVisa } from "./service-visa";

export class ServiceVisaImplForService<root extends ServiceData> implements ServiceVisa {
  constructor(private root: root, private member: MemberData) {}  
  
  determineIf(func:((permissions: ServicePermissions) => boolean)) :  boolean {
    const servicePermissions = this.member.role.permissions.servicePermissions;
    if(!servicePermissions) {
      console.log("Service Visa : no service permissions");
      return false;
    }
    
    return func(servicePermissions as ServicePermissions);
  }
}