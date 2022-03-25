import { Entity, EntityProps } from '../../shared/entity';
import { DomainExecutionContext } from '../context';
import * as ValueObjects from './bedroom-detail-value-objects';

export interface BedroomDetailProps extends EntityProps {
  roomName: string;
  bedDescriptions: string[];
}

export interface BedroomDetailReference extends Readonly<BedroomDetailProps> {}

export class BedroomDetail extends Entity<BedroomDetailProps> implements BedroomDetailReference {
  constructor(props: BedroomDetailProps, private readonly context: DomainExecutionContext) { super(props); }

  get roomName() {return this.props.roomName;}
  get bedDescriptions() {return this.props.bedDescriptions;}

  requestSetRoomName(roomName: ValueObjects.RoomName) {
    this.props.roomName = roomName.valueOf();
  }
  requestSetBedDescriptions(bedDescriptions: ValueObjects.BedDescriptions) {
    this.props.bedDescriptions = bedDescriptions.valueOf();
  }
}