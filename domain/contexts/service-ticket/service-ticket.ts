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
import { ServiceTicketVisa } from '../iam/service-ticket-visa';

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
  private isNew: boolean = false;
  private visa: ServiceTicketVisa;
  constructor(props: props, private context:DomainExecutionContext) { 
    super(props); 
    this.visa = context.passport.forServiceTicket(this);
  }

  public static async getNewInstance<props extends ServiceTicketProps> (
      newProps:props,
      title:string,
      community:CommunityEntityReference, 
      property:PropertyEntityReference,
      requestor:MemberEntityReference,
      context:DomainExecutionContext): Promise<ServiceTicket<props>> {
    let serviceTicket = new ServiceTicket(newProps,context);
    serviceTicket.isNew = true;
    serviceTicket.requestSetTitle(new ValueObjects.Title(title));
    serviceTicket.requestSetCommunity(community);
    serviceTicket.requestSetProperty(property);
    serviceTicket.requestSetRequestor(requestor);
    serviceTicket.isNew = false;
    return serviceTicket;
  }

  get community() { return new Community(this.props.community, this.context); }
  get property() { return new Property(this.props.property, this.context); }
  get requestor() { return new Member(this.props.requestor, this.context); }
  get assignedTo() { return new Member(this.props.assignedTo, this.context); }
  get title() { return this.props.title; }
  get description() { return this.props.description; }
  get status() { return this.props.status; }
  get priority() { return this.props.priority; }
  get activityLog(): ReadonlyArray<ActivityDetailEntityReference> { return this.props.activityLog.items.map(a => new ActivityDetail(a,this.context, this.visa)); }

  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }  
  get schemaVersion(): string {return this.props.schemaVersion; }  

  private requestSetCommunity(community:CommunityEntityReference):void{
    if(!this.isNew) { throw new Error('Unauthorized'); }
    this.props.setCommunityRef(community);
  }
  public requestSetProperty(property:PropertyEntityReference):void{
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.isSystemAccount || (permissions.canCreateTickets && permissions.isEditingOwnTicket))) { throw new Error('Unauthorized'); }
    this.props.setPropertyRef(property);
  }
  private requestSetRequestor(requestor:MemberEntityReference):void{
    if(!this.isNew) { throw new Error('Unauthorized'); }
    this.props.setRequestorRef(requestor);
  }
  public requestSetAssignedTo(assignedTo:MemberEntityReference):void{
    if(!this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canAssignTickets)) { throw new Error('Unauthorized'); }
    this.props.setAssignedToRef(assignedTo);
  }
  public requestSetTitle(title:ValueObjects.Title):void{
    if(!this.visa.determineIf(permissions => permissions.isSystemAccount || (permissions.canCreateTickets && permissions.isEditingOwnTicket))) { throw new Error('Unauthorized'); }
    this.props.title = title.valueOf();
  }
  public requestSetDescription(description:ValueObjects.Description):void{
    if(!this.visa.determineIf(permissions => permissions.isSystemAccount || (permissions.canCreateTickets && permissions.isEditingOwnTicket))) { throw new Error('Unauthorized'); }
    this.props.description = description.valueOf();
  }
  public requestSetStatus(statusCode:ValueObjects.StatusCode):void{
    if(!this.visa.determineIf(permissions => permissions.isSystemAccount)) { throw new Error('Unauthorized'); }
    this.props.status = statusCode.valueOf();
  }
  public requestSetPriority(priority:ValueObjects.Priority):void{
    if(!this.visa.determineIf(permissions => 
      permissions.isSystemAccount || 
      (permissions.canCreateTickets && permissions.isEditingOwnTicket) ||
      permissions.canManageTickets
      )) { throw new Error('Unauthorized'); }
    this.props.priority = priority.valueOf();
  }

  public requestNewActivityDetail():ActivityDetail{
    if(!this.visa.determineIf(permissions => 
      permissions.isSystemAccount || 
      (permissions.canCreateTickets && permissions.isEditingOwnTicket) ||
      (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket) ||
      permissions.canManageTickets ||
      permissions.canAssignTickets
    )) { throw new Error('Unauthorized'); }
    let activityDetail = this.props.activityLog.getNewItem();
    return(new ActivityDetail(activityDetail,this.context, this.visa));
  }

}

export interface ServiceTicketPermissions {
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canAssignTickets: boolean;
  canWorkOnTickets: boolean;
  isEditingOwnTicket: boolean;
  isEditingAssignedTicket: boolean;
  isSystemAccount: boolean;
} 