import { DomainEntityProps } from '../../../../../../../framework/seedwork/domain-seedwork/domain-entity';
import { Community, CommunityProps, CommunityEntityReference } from '../../../community/community/community';
import { Property, PropertyEntityReference, PropertyProps } from '../../../property/property/property';
import { MemberEntityReference, Member, MemberProps } from '../../../community/member/member';
import { Service, ServiceEntityReference, ServiceProps } from '../../../community/service/service';
import { AggregateRoot } from '../../../../../../../framework/seedwork/domain-seedwork/aggregate-root';
import { DomainExecutionContext } from '../../../../../../../framework/domain/domain-execution-context';
import * as MessageValueObjects from './service-ticket-v1-message.value-objects';
import * as ActivityDetailValueObjects from './activity-detail.value-objects';
import * as ValueObjects from './service-ticket.value-objects';
import { PropArray } from '../../../../../../../framework/seedwork/domain-seedwork/prop-array';
import { ActivityDetail, ActivityDetailEntityReference, ActivityDetailProps } from './activity-detail';
import { Photo, PhotoEntityReference, PhotoProps } from './photo';
import { ServiceTicketV1Visa } from './service-ticket.visa';
import { ServiceTicketV1CreatedEvent } from '../../../../events/types/service-ticket-v1-created';
import { ServiceTicketV1UpdatedEvent } from '../../../../events/types/service-ticket-v1-updated';
import { ServiceTicketV1DeletedEvent } from '../../../../events/types/service-ticket-v1-deleted';
import { ServiceTicketV1Message, ServiceTicketV1MessageEntityReference, ServiceTicketV1MessageProps } from './service-ticket-v1-message';
import { ServiceTicketV1RevisionRequest, ServiceTicketV1RevisionRequestEntityReference, ServiceTicketV1RevisionRequestProps } from './service-ticket-v1-revision-request';

export interface ServiceTicketV1Props extends DomainEntityProps {
  readonly community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference): void;
  readonly property: PropertyProps;
  setPropertyRef(property: PropertyEntityReference): void;
  readonly requestor: MemberProps;
  setRequestorRef(requestor: MemberEntityReference): void;
  readonly assignedTo: MemberProps;
  setAssignedToRef(assignedTo: MemberEntityReference): void;
  readonly service: ServiceProps;
  setServiceRef(service: ServiceEntityReference): void;
  title: string;
  description: string;
  readonly ticketType?: string;
  status: string;
  priority: number;
  readonly activityLog: PropArray<ActivityDetailProps>;
  readonly messages: PropArray<ServiceTicketV1MessageProps>;
  readonly revisionRequest?: ServiceTicketV1RevisionRequestProps;
  readonly photos: PropArray<PhotoProps>;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly schemaVersion: string;

  hash: string;
  lastIndexed: Date; // success
  updateIndexFailedDate: Date; // failure
}

export interface ServiceTicketV1EntityReference
  extends Readonly<
    Omit<
      ServiceTicketV1Props,
      | 'community'
      | 'setCommunityRef'
      | 'property'
      | 'setPropertyRef'
      | 'requestor'
      | 'setRequestorRef'
      | 'assignedTo'
      | 'setAssignedToRef'
      | 'service'
      | 'setServiceRef'
      | 'activityLog'
      | 'messages'
      | 'photos'
      | 'revisionRequest'
    >
  > {
  readonly community: CommunityEntityReference;
  readonly property: PropertyEntityReference;
  readonly requestor: MemberEntityReference;
  readonly assignedTo: MemberEntityReference;
  readonly service: ServiceEntityReference;
  readonly activityLog: ReadonlyArray<ActivityDetailEntityReference>;
  readonly messages: ReadonlyArray<ServiceTicketV1MessageEntityReference>;
  readonly photos: ReadonlyArray<PhotoEntityReference>;
  readonly revisionRequest: ServiceTicketV1RevisionRequestEntityReference;
}

export class ServiceTicketV1<props extends ServiceTicketV1Props> extends AggregateRoot<props> implements ServiceTicketV1EntityReference {
  private isNew: boolean = false;
  private readonly visa: ServiceTicketV1Visa;
  constructor(props: props, private context: DomainExecutionContext) {
    super(props);
    this.visa = context.domainVisa.forServiceTicketV1(this);
  }

  public static getNewInstance<props extends ServiceTicketV1Props>(
    newProps: props,
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference,
    context: DomainExecutionContext
  ): ServiceTicketV1<props> {
    let serviceTicket = new ServiceTicketV1(newProps, context);
    serviceTicket.MarkAsNew();
    serviceTicket.isNew = true;
    serviceTicket.Title = title;
    serviceTicket.Description = description;
    serviceTicket.Community = community;
    serviceTicket.Property = property;
    serviceTicket.Requestor = requestor;
    serviceTicket.Status = ValueObjects.StatusCodes.Draft;
    serviceTicket.Priority = 5;
    let newActivity = serviceTicket.requestNewActivityDetail();
    newActivity.ActivityType = ActivityDetailValueObjects.ActivityTypeCodes.Created;
    newActivity.ActivityDescription = 'Created';
    newActivity.ActivityBy = requestor;
    serviceTicket.isNew = false;
    return serviceTicket;
  }

  get community() {
    return new Community(this.props.community, this.context);
  }
  get property() {
    return new Property(this.props.property, this.context);
  }
  get requestor() {
    return new Member(this.props.requestor, this.context);
  }
  get assignedTo() {
    return this.props.assignedTo ? new Member(this.props.assignedTo, this.context) : undefined;
  }
  get service() {
    return this.props.service ? new Service(this.props.service, this.context) : undefined;
  }
  get title() {
    return this.props.title;
  }
  get description() {
    return this.props.description;
  }
  get ticketType() {
    return this.props.ticketType;
  }
  get status() {
    return this.props.status;
  }
  get priority() {
    return this.props.priority;
  }
  get activityLog(): ReadonlyArray<ActivityDetailEntityReference> {
    return this.props.activityLog.items.map((a) => new ActivityDetail(a, this.context, this.visa));
  }
  get messages(): ReadonlyArray<ServiceTicketV1Message> {
    return this.props.messages.items.map((m) => new ServiceTicketV1Message(m, this.context, this.visa));
  }
  get photos(): ReadonlyArray<PhotoEntityReference> {
    return this.props.photos.items.map((p) => new Photo(p, this.context, this.visa));
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
  get schemaVersion(): string {
    return this.props.schemaVersion;
  }

  get hash() {
    return this.props.hash;
  }

  get lastIndexed() {
    return this.props.lastIndexed;
  }

  get updateIndexFailedDate() {
    return this.props.updateIndexFailedDate;
  }

  get revisionRequest() {
    return this.props.revisionRequest ? new ServiceTicketV1RevisionRequest(this.props.revisionRequest, this.context, this.visa) : undefined;
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
    [ValueObjects.StatusCodes.Submitted, ActivityDetailValueObjects.ActivityTypeCodes.Submitted],
    [ValueObjects.StatusCodes.Assigned, ActivityDetailValueObjects.ActivityTypeCodes.Assigned],
    [ValueObjects.StatusCodes.InProgress, ActivityDetailValueObjects.ActivityTypeCodes.InProgress],
    [ValueObjects.StatusCodes.Completed, ActivityDetailValueObjects.ActivityTypeCodes.Completed],
    [ValueObjects.StatusCodes.Closed, ActivityDetailValueObjects.ActivityTypeCodes.Closed],
  ]);

  private MarkAsNew(): void {
    this.isNew = true;
    this.addIntegrationEvent(ServiceTicketV1CreatedEvent, { id: this.props.id });
  }

  // using set from TS 5.1

  set Community(community: CommunityEntityReference) {
    if (!this.isNew) {
      throw new Error('Unauthorized');
    }
    this.props.setCommunityRef(community);
  }

  set Property(property: PropertyEntityReference) {
    if (
      !this.isNew &&
      !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageTickets || (permissions.canCreateTickets && permissions.isEditingOwnTicket))
    ) {
      throw new Error('Unauthorized1');
    }
    this.props.setPropertyRef(property);
  }

  private set Requestor(requestor: MemberEntityReference) {
    if (!this.isNew) {
      throw new Error('Unauthorized');
    }
    if (!requestor) {
      throw new Error('requestor cannot be null or undefined');
    }
    this.props.setRequestorRef(requestor);
  }

  set AssignedTo(assignedTo: MemberEntityReference) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canAssignTickets)) {
      throw new Error('Unauthorized2');
    }
    this.props.setAssignedToRef(assignedTo);
  }

  set Service(service: ServiceEntityReference) {
    if (
      !this.isNew &&
      !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageTickets || (permissions.canCreateTickets && permissions.isEditingOwnTicket))
    ) {
      throw new Error('Unauthorized3a');
    }
    this.props.setServiceRef(service);
  }

  set Title(title: string) {
    if (
      !this.isNew &&
      !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageTickets || (permissions.canCreateTickets && permissions.isEditingOwnTicket))
    ) {
      throw new Error('Unauthorized3b');
    }
    this.props.title = new ValueObjects.Title(title).valueOf();
  }

  set Description(description: string) {
    if (
      !this.isNew &&
      !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageTickets || (permissions.canCreateTickets && permissions.isEditingOwnTicket))
    ) {
      throw new Error('Unauthorized4');
    }
    this.props.description = new ValueObjects.Description(description).valueOf();
  }
  

  set Status(statusCode: ValueObjects.StatusCode) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.isSystemAccount)) {
      throw new Error('Unauthorized5');
    }
    this.props.status = statusCode.valueOf();
  }

  set Priority(priority: ValueObjects.Priority) {
    if (
      !this.isNew &&
      !this.visa.determineIf((permissions) => permissions.isSystemAccount || (permissions.canCreateTickets && permissions.isEditingOwnTicket) || permissions.canManageTickets)
    ) {
      throw new Error('Unauthorized6');
    }
    this.props.priority = priority.valueOf();
  }

  set Hash(hash: string) {
    if (
      !this.isNew &&
      !this.visa.determineIf(
        (permissions) =>
          permissions.isSystemAccount ||
          (permissions.canCreateTickets && permissions.isEditingOwnTicket) ||
          (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket) ||
          permissions.canManageTickets ||
          permissions.canAssignTickets
      )
    ) {
      throw new Error('Unauthorized7');
    }
    this.props.hash = hash;
  }

  set LastIndexed(lastIndexed: Date) {
    if (
      !this.isNew &&
      !this.visa.determineIf(
        (permissions) =>
          permissions.isSystemAccount ||
          (permissions.canCreateTickets && permissions.isEditingOwnTicket) ||
          (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket) ||
          permissions.canManageTickets ||
          permissions.canAssignTickets
      )
    ) {
      throw new Error('Unauthorized7');
    }
    this.props.lastIndexed = lastIndexed;
  }

  set UpdateIndexFailedDate(updateIndexFailedDate: Date) {
    if (
      !this.isNew &&
      !this.visa.determineIf(
        (permissions) =>
          permissions.isSystemAccount ||
          (permissions.canCreateTickets && permissions.isEditingOwnTicket) ||
          (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket) ||
          permissions.canManageTickets ||
          permissions.canAssignTickets
      )
    ) {
      throw new Error('Unauthorized7');
    }
    this.props.updateIndexFailedDate = updateIndexFailedDate;
  }
  //

  public requestDelete(): void {
    if (!this.isDeleted && !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageTickets)) {
      throw new Error('You do not have permission to delete this property');
    }
    super.isDeleted = true;
    this.addIntegrationEvent(ServiceTicketV1DeletedEvent, { id: this.props.id });
  }

  private requestNewActivityDetail(): ActivityDetail {
    let activityDetail = this.props.activityLog.getNewItem();
    return new ActivityDetail(activityDetail, this.context, this.visa);
  }

  private requestNewMessage(): ServiceTicketV1Message {
    let message = this.props.messages.getNewItem();
    return new ServiceTicketV1Message(message, this.context, this.visa);
  }

  public requestAddMessage(message: string, sentBy: string, embedding?: string, initiatedBy?: MemberEntityReference): void {
    if (
      !this.visa.determineIf(
        (permissions) =>
          permissions.isSystemAccount ||
          (permissions.canCreateTickets && permissions.isEditingOwnTicket) ||
          (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket) ||
          permissions.canManageTickets
      )
    ) {
      throw new Error('Unauthorized7');
    }
    const newMessage = this.requestNewMessage();
    newMessage.Message = new MessageValueObjects.Message(message);
    newMessage.SentBy = new MessageValueObjects.SentBy(sentBy);
    if (embedding !== undefined) newMessage.Embedding = new MessageValueObjects.Embedding(embedding);
    if (initiatedBy !== undefined) {
      newMessage.InitiatedBy = initiatedBy;
    }
  }

  public requestAddStatusUpdate(description: string, by: MemberEntityReference): void {
    if (
      !this.isNew &&
      !this.visa.determineIf(
        (permissions) =>
          permissions.isSystemAccount ||
          (permissions.canCreateTickets && permissions.isEditingOwnTicket) ||
          (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket) ||
          permissions.canManageTickets ||
          permissions.canAssignTickets
      )
    ) {
      throw new Error('Unauthorized7');
    }
    const activityDetail = this.requestNewActivityDetail();
    activityDetail.ActivityType = ActivityDetailValueObjects.ActivityTypeCodes.Updated;
    activityDetail.ActivityDescription = description;
    activityDetail.ActivityBy = by;
  }
  public requestAddStatusTransition(newStatus: ValueObjects.StatusCode, description: string, by: MemberEntityReference): void {
    if (
      !this.visa.determineIf(
        (permissions) =>
          permissions.isSystemAccount ||
          (this.validStatusTransitions.get(this.status.valueOf())?.includes(newStatus.valueOf()) &&
            (permissions.canManageTickets ||
              permissions.canAssignTickets ||
              (permissions.canCreateTickets && permissions.isEditingOwnTicket) ||
              (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket)))
      )
    ) {
      throw new Error('Unauthorized or Invalid Status Transition');
    }

    this.props.status = newStatus.valueOf();
    const activityDetail = this.requestNewActivityDetail();
    activityDetail.ActivityDescription = description;
    activityDetail.ActivityType = this.statusMappings.get(newStatus.valueOf());
    activityDetail.ActivityBy = by;
  }

  public override onSave(isModified: boolean): void {
    if (isModified && !super.isDeleted) {
      this.addIntegrationEvent(ServiceTicketV1UpdatedEvent, { id: this.props.id });
    }
  }
}
