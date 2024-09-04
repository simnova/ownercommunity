import { DomainEntity, DomainEntityProps } from '../../../../../../framework/seedwork/domain-seedwork/domain-entity';
import { PropertyVisa } from '../property.domain-visa';
import * as ValueObjects from './property-listing-detail-bedroom-detail.value-objects';

export interface PropertyListingDetailBedroomDetailProps extends DomainEntityProps {
  roomName: string;
  bedDescriptions: string[];
}

export interface PropertyListingDetailBedroomDetailReference extends Readonly<PropertyListingDetailBedroomDetailProps> {}

export class PropertyListingDetailBedroomDetail extends DomainEntity<PropertyListingDetailBedroomDetailProps> implements PropertyListingDetailBedroomDetailReference {
  constructor(props: PropertyListingDetailBedroomDetailProps, private readonly visa: PropertyVisa) { super(props); }

  get id() {return this.props.id;}
  get roomName() {return this.props.roomName;}
  get bedDescriptions() {return this.props.bedDescriptions;}

  private validateVisa(){
    if(!this.visa.determineIf((permissions) => 
      permissions.canManageProperties ||
      (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('You do not have permission to update this listing');
    }
  }
  // using set from TS 5.1
  set RoomName(roomName: string) {
    this.validateVisa();
    this.props.roomName = new ValueObjects.RoomName(roomName).valueOf();
  }

  set BedDescriptions(bedDescriptions: string[]) {
    this.validateVisa();
    this.props.bedDescriptions = new ValueObjects.BedDescriptions(bedDescriptions).valueOf();
  }

  
}