
import { MemberEntityReference } from '../community/member';
import { PropertyEntityReference, PropertyPermissions } from '../property/property';
import { Visa } from './passport';

export class PropertyVisaImpl<root extends PropertyEntityReference> implements PropertyVisa {
  constructor(private root: root, private member: MemberEntityReference) {
  }  
  
  determineIf(func:((permissions:PropertyPermissions) => boolean)) :  boolean {
    //ensure that the member is a member of this community
    if(!this.member || this.member.community.id !== this.root.community.id) {
      return false;
    }
    const propertyPermissions = this.member.role.permissions.propertyPermissions;
    if(! propertyPermissions) {return false;}

    var updatedPermissions = { 
      ...propertyPermissions, 
      ...{isEditingOwnProperty : (this.member.id === this.root.owner.id)} //overwrite isEditingOwnProperty based on user ownership
    } as PropertyPermissions;
    return func(updatedPermissions);
    
  }
}

export interface PropertyVisa extends Visa {
  determineIf(func:((permissions:PropertyPermissions) => boolean)) :  boolean ;
}