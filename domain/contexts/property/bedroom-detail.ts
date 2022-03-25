import { Entity, EntityProps } from '../../shared/entity';
import { PropertyVisa } from '../iam/property-visa';
import * as ValueObjects from './bedroom-detail-value-objects';

export interface BedroomDetailProps extends EntityProps {
  roomName: string;
  bedDescriptions: string[];
}

export interface BedroomDetailReference extends Readonly<BedroomDetailProps> {}

export class BedroomDetail extends Entity<BedroomDetailProps> implements BedroomDetailReference {
  constructor(props: BedroomDetailProps, private readonly visa: PropertyVisa) { super(props); }

  get roomName() {return this.props.roomName;}
  get bedDescriptions() {return this.props.bedDescriptions;}

  private validateVisa(){
    if(!this.visa.determineIf((permissions) => 
      permissions.canManageProperties ||
      (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('You do not have permission to update this listing');
    }
  }

  requestSetRoomName(roomName: ValueObjects.RoomName) {
    this.validateVisa();
    this.props.roomName = roomName.valueOf();
  }
  requestSetBedDescriptions(bedDescriptions: ValueObjects.BedDescriptions) {
    this.validateVisa();
    this.props.bedDescriptions = bedDescriptions.valueOf();
  }
}