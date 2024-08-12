import { Entity, EntityProps } from '../../../../../../seedwork/domain-seedwork/entity';
import { PropertyVisa } from './property.visa';
import * as ValueObjects from './bedroom-detail.value-objects';

export interface BedroomDetailProps extends EntityProps {
  roomName: string;
  bedDescriptions: string[];
}

export interface BedroomDetailReference extends Readonly<BedroomDetailProps> {}

export class BedroomDetail extends Entity<BedroomDetailProps> implements BedroomDetailReference {
  constructor(props: BedroomDetailProps, private readonly visa: PropertyVisa) { super(props); }

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