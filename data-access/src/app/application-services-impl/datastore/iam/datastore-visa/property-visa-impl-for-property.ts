
import { PropertyPermissions, MemberData, PropertyData } from "../../../../external-dependencies/datastore";
import { PropertyVisa } from "./property-visa";

export class PropertyVisaImplForProperty<root extends PropertyData> implements PropertyVisa {
  constructor(private root: root, private member: MemberData) {}  
  
  determineIf(func:((permissions: PropertyPermissions) => boolean)) :  boolean {
    const propertyPermissions = this.member.role.permissions.communityPermissions;
    if(!propertyPermissions) {
      console.log("Property Visa : no property permissions");
      return false;
    }
    
    return func(propertyPermissions as PropertyPermissions);
  }
}