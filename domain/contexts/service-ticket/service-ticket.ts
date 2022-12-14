import { Entity, EntityProps } from '../../shared/entity';
import { Community, CommunityProps, CommunityEntityReference } from '../community/community';
import { Property, PropertyEntityReference, PropertyProps } from '../property/property';
import { MemberEntityReference, Member, MemberProps } from '../community/member';
import { Service, ServiceEntityReference, ServiceProps } from './service';
import { AggregateRoot } from '../../shared/aggregate-root';
import { DomainExecutionContext } from '../context';
import * as ActivityDetailValueObjects from './activity-detail.value-objects';
import * as ValueObjects from './service-ticket.value-objects';
import { PropArray } from '../../shared/prop-array';
import { ActivityDetail, ActivityDetailEntityReference, ActivityDetailProps } from './activity-detail';
import { Photo, PhotoEntityReference, PhotoProps } from './photo';
import { ServiceTicketVisa } from '../iam/service-ticket-visa';
import { ServiceTicketCreatedEvent } from '../../events/service-ticket-created';
import { ServiceTicketUpdatedEvent } from '../../events/service-ticket-updated';
import { ServiceTicketDeletedEvent } from '../../events/service-ticket-deleted';

export interface ServiceTicketProps extends EntityProps {
  readonly community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference): void;
  readonly property: PropertyProps;
  setPropertyRef(property: PropertyEntityReference): void;
  readonly requestor: MemberProps;
  setRequestorRef (requestor: MemberEntityReference) :void;
  readonly assignedTo: MemberProps; 
  setAssignedToRef(assignedTo: MemberEntityReference) : void;
  readonly service: ServiceProps;
  setServiceRef(service: ServiceEntityReference) : void;
  title: string;
  description: string;
  status: string;
  priority: number;
  readonly activityLog: PropArray<ActivityDetailProps>;
  readonly photos: PropArray<PhotoProps>;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;

  hash: string;
  lastIndexed: Date; // success
  updateIndexFailedDate: Date; // failure
}

export interface ServiceTicketEntityReference extends Readonly<Omit<ServiceTicketProps,
  'community' | 'setCommunityRef' | 
  'property' | 'setPropertyRef' | 
  'requestor' | 'setRequestorRef' |
  'assignedTo' | 'setAssignedToRef' | 
  'service' | 'setServiceRef' |
  'activityLog' |
  'photos' >>{
  readonly community: CommunityEntityReference;
  readonly property: PropertyEntityReference;
  readonly requestor: MemberEntityReference;
  readonly assignedTo: MemberEntityReference;  
  readonly service: ServiceEntityReference;
  readonly activityLog: ReadonlyArray<ActivityDetailEntityReference>;
  readonly photos: ReadonlyArray<PhotoEntityReference>;
}

export class ServiceTicket<props extends ServiceTicketProps> extends AggregateRoot<props> implements ServiceTicketEntityReference {
  private isNew: boolean = false;
  private readonly visa: ServiceTicketVisa;
  constructor(props: props, private context: DomainExecutionContext) {
    super(props);
    this.visa = context.passport.forServiceTicket(this);
  }

  public static getNewInstance<props extends ServiceTicketProps>(
    newProps: props,
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference,
    context: DomainExecutionContext
  ): ServiceTicket<props> {
    let serviceTicket = new ServiceTicket(newProps, context);
    serviceTicket.MarkAsNew();
    serviceTicket.isNew = true;
    serviceTicket.requestSetTitle(title);
    serviceTicket.requestSetDescription(description);
    serviceTicket.requestSetCommunity(community);
    serviceTicket.requestSetProperty(property);
    serviceTicket.requestSetRequestor(requestor);
    serviceTicket.requestSetStatus(ValueObjects.StatusCodes.Draft);
    serviceTicket.requestSetPriority(5);
    let newActivity = serviceTicket.requestNewActivityDetail();
    newActivity.requestSetActivityType(ActivityDetailValueObjects.ActivityTypeCodes.Created);
    newActivity.requestSetActivityDescription('Created');
    newActivity.requestSetActivityBy(requestor);
    serviceTicket.isNew = false;
    return serviceTicket;
  }

  get community() { return new Community(this.props.community, this.context); }
  get property() { return new Property(this.props.property, this.context); }
  get requestor() { return new Member(this.props.requestor, this.context); }
  get assignedTo() { return this.props.assignedTo?new Member(this.props.assignedTo, this.context):undefined; }
  get service() { return this.props.service?new Service(this.props.service, this.context):undefined; }
  get title() { return this.props.title; }
  get description() { return this.props.description; }
  get status() { return this.props.status; }
  get priority() { return this.props.priority; }
  get activityLog(): ReadonlyArray<ActivityDetailEntityReference> { return this.props.activityLog.items.map(a => new ActivityDetail(a,this.context, this.visa)); }
  get photos(): ReadonlyArray<PhotoEntityReference> { return this.props.photos.items.map(p => new Photo(p,this.context, this.visa)); }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }  
  get schemaVersion(): string {return this.props.schemaVersion; }  

  get hash() {
    return this.props.hash;
  }

  get lastIndexed() {
    return this.props.lastIndexed;
  }

  get updateIndexFailedDate() {
    return this.props.updateIndexFailedDate;
  }

  private readonly validStatusTransitions = new Map<string, string[]>([
    [ValueObjects.StatusCodes.Draft, [ValueObjects.StatusCodes.Submitted]],
    [ValueObjects.StatusCodes.Submitted, [ValueObjects.StatusCodes.Draft, ValueObjects.StatusCodes.Assigned]],
    [ValueObjects.StatusCodes.Assigned, [ValueObjects.StatusCodes.Submitted, ValueObjects.StatusCodes.InProgress]],
    [ValueObjects.StatusCodes.InProgress, [ValueObjects.StatusCodes.Assigned, ValueObjects.StatusCodes.Completed]],
    [ValueObjects.StatusCodes.Completed, [ValueObjects.StatusCodes.InProgress, ValueObjects.StatusCodes.Closed]],
    [ValueObjects.StatusCodes.Closed, [ValueObjects.StatusCodes.InProgress]],
  ]);
  private readonly statusMappings = new Map<string, string>([
    [ValueObjects.StatusCodes.Draft, ActivityDetailValueObjects.ActivityTypeCodes.Created],
    [ValueObjects.StatusCodes.Submitted, ActivityDetailValueObjects.ActivityTypeCodes.Created],
    [ValueObjects.StatusCodes.Assigned, ActivityDetailValueObjects.ActivityTypeCodes.Assigned],
    [ValueObjects.StatusCodes.InProgress, ActivityDetailValueObjects.ActivityTypeCodes.Updated],
    [ValueObjects.StatusCodes.Completed, ActivityDetailValueObjects.ActivityTypeCodes.Completed],
    [ValueObjects.StatusCodes.Closed, ActivityDetailValueObjects.ActivityTypeCodes.Closed],
  ]);

  private MarkAsNew(): void {
    this.isNew = true;
    this.addIntegrationEvent(ServiceTicketCreatedEvent, { id: this.props.id });
  }

  private requestSetCommunity(community: CommunityEntityReference): void {
    if (!this.isNew) {
      throw new Error('Unauthorized');
    }
    this.props.setCommunityRef(community);
  }
  public requestSetProperty(property: PropertyEntityReference): void {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageTickets || (permissions.canCreateTickets && permissions.isEditingOwnTicket))) {
      throw new Error('Unauthorized1');
    }
    this.props.setPropertyRef(property);
  }
  private requestSetRequestor(requestor:MemberEntityReference):void{
    if(!this.isNew) { throw new Error('Unauthorized'); }
    if(!requestor) { throw new Error('requestor cannot be null or undefined'); }
    this.props.setRequestorRef(requestor);
  }
  public requestDelete(): void {
    if (!this.isDeleted && !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageTickets)) {
      throw new Error('You do not have permission to delete this property');
    }
    super.isDeleted = true;
    this.addIntegrationEvent(ServiceTicketDeletedEvent, { id: this.props.id });
  }
  public requestSetAssignedTo(assignedTo: MemberEntityReference): void {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canAssignTickets)) {
      throw new Error('Unauthorized2');
    }
    this.props.setAssignedToRef(assignedTo);
  }
  public requestSetService(service:ServiceEntityReference):void{
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.isSystemAccount ||  permissions.canManageTickets || (permissions.canCreateTickets && permissions.isEditingOwnTicket))) { throw new Error('Unauthorized3a'); }
    this.props.setServiceRef(service);
  }
  public requestSetTitle(title:string):void{
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageTickets || (permissions.canCreateTickets && permissions.isEditingOwnTicket))) { throw new Error('Unauthorized3b'); }
    this.props.title = (new ValueObjects.Title(title)).valueOf();
  }
  public requestSetDescription(description:string):void{
    if(
      !this.isNew &&
      !this.visa.determineIf(permissions => permissions.isSystemAccount || permissions.canManageTickets || (permissions.canCreateTickets && permissions.isEditingOwnTicket))) { throw new Error('Unauthorized4'); }
    this.props.description = (new ValueObjects.Description(description)).valueOf();
  }
  public requestSetStatus(statusCode: ValueObjects.StatusCode): void {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.isSystemAccount)) {
      throw new Error('Unauthorized5');
    }
    this.props.status = statusCode.valueOf();
  }
  public requestSetPriority(priority: ValueObjects.Priority): void {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.isSystemAccount || (permissions.canCreateTickets && permissions.isEditingOwnTicket) || permissions.canManageTickets)) {
      throw new Error('Unauthorized6');
    }
    this.props.priority = priority.valueOf();
  }

  private requestNewActivityDetail(): ActivityDetail {
    let activityDetail = this.props.activityLog.getNewItem();
    return new ActivityDetail(activityDetail, this.context, this.visa);
  }

  public requestAddStatusUpdate(description: string, by: MemberEntityReference): void {
    if (
      !this.isNew &&
      !this.visa.determineIf(
        (permissions) =>
          permissions.isSystemAccount || (permissions.canCreateTickets && permissions.isEditingOwnTicket) || (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket) || permissions.canManageTickets || permissions.canAssignTickets
      )
    ) {
      throw new Error('Unauthorized7');
    }
    const activityDetail = this.requestNewActivityDetail();
    activityDetail.requestSetActivityType(ActivityDetailValueObjects.ActivityTypeCodes.Updated);
    activityDetail.requestSetActivityDescription(description);
    activityDetail.requestSetActivityBy(by);
  }
  public requestAddStatusTransition(newStatus: ValueObjects.StatusCode, description: string, by: MemberEntityReference): void {
    if (
      !this.visa.determineIf(
        (permissions) =>
          permissions.isSystemAccount ||
          (this.validStatusTransitions.get(this.status.valueOf())?.includes(newStatus.valueOf()) &&
            (permissions.canManageTickets || permissions.canAssignTickets || (permissions.canCreateTickets && permissions.isEditingOwnTicket) || (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket)))
      )
    ) {
      throw new Error('Unauthorized or Invalid Status Transition');
    }

    this.props.status = newStatus.valueOf();
    const activityDetail = this.requestNewActivityDetail();
    activityDetail.requestSetActivityDescription(description);
    activityDetail.requestSetActivityType(this.statusMappings.get(newStatus.valueOf()));
    activityDetail.requestSetActivityBy(by);
  }

  public requestSetHash(hash: string): void {
    if (
      !this.isNew &&
      !this.visa.determineIf(
        (permissions) =>
          permissions.isSystemAccount || (permissions.canCreateTickets && permissions.isEditingOwnTicket) || (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket) || permissions.canManageTickets || permissions.canAssignTickets
      )
    ) {
      throw new Error('Unauthorized7');
    }
    this.props.hash = hash;
  }

  public requestSetLastIndexed(lastIndexed: Date): void {
    if (
      !this.isNew &&
      !this.visa.determineIf(
        (permissions) =>
          permissions.isSystemAccount || (permissions.canCreateTickets && permissions.isEditingOwnTicket) || (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket) || permissions.canManageTickets || permissions.canAssignTickets
      )
    ) {
      throw new Error('Unauthorized7');
    }
    this.props.lastIndexed = lastIndexed;
  }

  public requestSetUpdateIndexFailedDate(updateIndexFailedDate: Date): void {
    if (
      !this.isNew &&
      !this.visa.determineIf(
        (permissions) =>
          permissions.isSystemAccount || (permissions.canCreateTickets && permissions.isEditingOwnTicket) || (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket) || permissions.canManageTickets || permissions.canAssignTickets
      )
    ) {
      throw new Error('Unauthorized7');
    }
    this.props.updateIndexFailedDate = updateIndexFailedDate;
  }

  public override onSave(isModified: boolean): void {
    if (isModified && !super.isDeleted) {
      this.addIntegrationEvent(ServiceTicketUpdatedEvent, { id: this.props.id });
    }
  }
}
