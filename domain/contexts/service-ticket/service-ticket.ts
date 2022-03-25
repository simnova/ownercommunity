import { Entity, EntityProps } from '../../shared/entity';
import { Community, CommunityProps, CommunityEntityReference } from '../community/community';
import { Property, PropertyEntityReference } from '../property/property';
import { MemberEntityReference, Member } from '../community/member';
import { AggregateRoot } from '../../shared/aggregate-root';
import { DomainExecutionContext } from '../context';
import { PropertyProps } from '../property/property';
import { MemberProps } from '../community/member';
import * as ValueObjects from './service-ticket-value-objects';
import { PropArray } from '../../shared/prop-array';
import { ActivityDetail, ActivityDetailEntityReference, ActivityDetailProps } from './activity-detail';

export interface ServiceTicketProps extends EntityProps {
  readonly community: CommunityProps;
  setCommunityRef:(community: CommunityEntityReference) => void;
  readonly property: PropertyProps;
  setPropertyRef: (property: PropertyEntityReference) => void;
  readonly requestor: MemberProps;
  setRequestorRef: (requestor: MemberEntityReference) => void;
  readonly assignedTo: MemberProps; 
  setAssignedToRef: (assignedTo: MemberEntityReference) => void;
  title: string;
  description: string;
  status: string;
  priority: number;
  readonly activityLog: PropArray<ActivityDetailProps>;

  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
}

export interface ServiceTicketEntityReference extends Readonly<Omit<ServiceTicketProps,
  'community' | 'setCommunityRef' | 
  'property' | 'setPropertyRef' | 
  'requestor' | 'setRequestorRef' |
  'assignedTo' | 'setAssignedToRef' | 
  'activityLog' >>{
  readonly community: CommunityEntityReference;
  readonly property: PropertyEntityReference;
  readonly requestor: MemberEntityReference;
  readonly assignedTo: MemberEntityReference;  
  readonly activityLog: ReadonlyArray<ActivityDetailEntityReference>;
}

export class ServiceTicket<props extends ServiceTicketProps> extends AggregateRoot<props> implements ServiceTicketEntityReference{
  constructor(props: props, private context:DomainExecutionContext) { 
    super(props); 
  }

  get community() { return new Community(this.props.community, this.context); }
  get property() { return new Property(this.props.property, this.context); }
  get requestor() { return new Member(this.props.requestor, this.context); }
  get assignedTo() { return new Member(this.props.assignedTo, this.context); }
  get title() { return this.props.title; }
  get description() { return this.props.description; }
  get status() { return this.props.status; }
  get priority() { return this.props.priority; }
  get activityLog(): ReadonlyArray<ActivityDetailEntityReference> { return this.props.activityLog.items.map(a => new ActivityDetail(a, this.context)); }

  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }  
  get schemaVersion(): string {return this.props.schemaVersion; }  

  public requestSetCommunity(community:CommunityEntityReference):void{
    this.props.setCommunityRef(community);
  }
  public requestSetProperty(property:PropertyEntityReference):void{
    this.props.setPropertyRef(property);
  }
  public requestSetRequestor(requestor:MemberEntityReference):void{
    this.props.setRequestorRef(requestor);
  }
  public requestSetAssignedTo(assignedTo:MemberEntityReference):void{
    this.props.setAssignedToRef(assignedTo);
  }
  public requestSetTitle(title:ValueObjects.Title):void{
    this.props.title = title.valueOf();
  }
  public requestSetDescription(description:ValueObjects.Description):void{
    this.props.description = description.valueOf();
  }
  public requestSetStatus(statusCode:ValueObjects.StatusCode):void{
    this.props.status = statusCode.valueOf();
  }
  public requestSetPriority(priority:ValueObjects.Priority):void{
    this.props.priority = priority.valueOf();
  }

}