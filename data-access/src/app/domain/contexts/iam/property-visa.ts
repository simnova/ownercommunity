
import { MemberEntityReference } from '../community/member';
import { PropertyEntityReference } from '../property/property';
import { PropertyPermissions } from "../property/property-permissions.spec";
import { Visa } from './passport';

export class PropertyVisaImpl<root extends PropertyEntityReference> implements PropertyVisa {
  constructor(private root: root, private member: MemberEntityReference) {
  }  
  
  determineIf(func:((permissions:PropertyPermissions) => boolean)) :  boolean {
    //ensure that the member is a member of this community
    if(!this.member || this.member.community.id !== this.root.community.id) {
      console.log('member not part of community',this.member,this.root.community);
      return false;
    }
    const propertyPermissions = this.member.role.permissions.propertyPermissions;
    if(! propertyPermissions) {
      console.log('no property permissions',this.member.role.permissions);
      return false;
    }

    const updatedPermissions = Object.create(propertyPermissions, {
      isEditingOwnProperty : {value: (
        this.root.owner?.id && this.member.id === this.root.owner.id)} //overwrite isEditingOwnProperty based on user ownership
    }) as PropertyPermissions;

    console.log('updatedPermissions',updatedPermissions);
    return func(updatedPermissions);
    
  }
}

export interface PropertyVisa extends Visa {
  determineIf(func:((permissions:PropertyPermissions) => boolean)) :  boolean ;
}