import { EntityProps } from '../../../../../seedwork/domain-seedwork/entity';
import { Community, CommunityProps, CommunityEntityReference } from '../community/community';
import { Property, PropertyEntityReference, PropertyProps } from '../property/property';
import { MemberEntityReference, Member, MemberProps } from '../community/member';
import { Service, ServiceEntityReference, ServiceProps } from '../service-ticket/service';
import { AggregateRoot } from '../../../../../seedwork/domain-seedwork/aggregate-root';
import { DomainExecutionContext } from '../domain-execution-context';
import * as ActivityDetailValueObjects from '../service-ticket/activity-detail.value-objects';
import * as ValueObjects from './violation-ticket.value-objects';
import { PropArray } from '../../../../../seedwork/domain-seedwork/prop-array';
import { ActivityDetail, ActivityDetailEntityReference, ActivityDetailProps } from '../service-ticket/activity-detail';
import { Photo, PhotoEntityReference, PhotoProps } from '../service-ticket/photo';
import { ViolationTicketVisa as ViolationTicketVisa } from '../iam/domain-visa/violation-ticket-visa';
import { ViolationTicketDeletedEvent } from '../../events/types/violation-ticket-deleted';
import { ViolationTicketUpdatedEvent } from '../../events/types/violation-ticket-updated';
import { ViolationTicketCreatedEvent } from '../../events/types/violation-ticket-created';
import { ViolationTicketUpdateInput } from '../../../external-dependencies/graphql-api';
import dayjs from 'dayjs';
import { Transaction, TransactionProps } from './transaction';
import { PenaltyAmount } from './violation-ticket.value-objects';

export interface ViolationTicketProps extends EntityProps {
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
  penaltyAmount: number;
  penaltyPaidDate: Date;
  readonly paymentTransactions: PropArray<TransactionProps>;
  readonly ticketType?: string;
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

export interface ViolationTicketEntityReference
  extends Readonly<
    Omit<
      ViolationTicketProps,
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
      | 'photos'
      | 'paymentTransactions'
    >
  > {
  readonly community: CommunityEntityReference;
  readonly property: PropertyEntityReference;
  readonly requestor: MemberEntityReference;
  readonly assignedTo: MemberEntityReference;
  readonly service: ServiceEntityReference;
  readonly activityLog: ReadonlyArray<ActivityDetailEntityReference>;
  readonly photos: ReadonlyArray<PhotoEntityReference>;
}

export class ViolationTicket<props extends ViolationTicketProps> extends AggregateRoot<props> implements ViolationTicketEntityReference {
  private isNew: boolean = false;
  private readonly visa: ViolationTicketVisa;
  constructor(props: props, private context: DomainExecutionContext) {
    super(props);
    this.visa = context.domainVisa.forViolationTicket(this);
  }

  public static getNewInstance<props extends ViolationTicketProps>(
    newProps: props,
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference,
    context: DomainExecutionContext,
    penaltyAmount?: number,
    penaltyPaidDate?: Date
  ): ViolationTicket<props> {
    let violationTicket = new ViolationTicket(newProps, context);
    violationTicket.MarkAsNew();
    violationTicket.isNew = true;
    violationTicket.Title = title;
    violationTicket.Description = description;
    violationTicket.Community = community;
    violationTicket.Property = property;
    violationTicket.Requestor = requestor;
    violationTicket.Status = ValueObjects.StatusCodes.Draft;
    violationTicket.Priority = 5;
    violationTicket.PenaltyAmount = penaltyAmount;
    violationTicket.PenaltyPaidDate = penaltyPaidDate;
    let newActivity = violationTicket.requestNewActivityDetail();
    newActivity.ActivityType = ActivityDetailValueObjects.ActivityTypeCodes.Created;
    newActivity.ActivityDescription = 'Created';
    newActivity.ActivityBy = requestor;
    return violationTicket;
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

  get penaltyAmount() {
    return this.props.penaltyAmount;
  }

  get penaltyPaidDate() {
    return this.props?.penaltyPaidDate;
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

  private readonly validStatusTransitions = new Map<string, string[]>([
    [ValueObjects.StatusCodes.Draft, [ValueObjects.StatusCodes.Submitted]],
    [ValueObjects.StatusCodes.Submitted, [ValueObjects.StatusCodes.Draft, ValueObjects.StatusCodes.Assigned]],
    [ValueObjects.StatusCodes.Assigned, [ValueObjects.StatusCodes.Submitted, ValueObjects.StatusCodes.Paid]],
    [ValueObjects.StatusCodes.Paid, [ValueObjects.StatusCodes.Assigned, ValueObjects.StatusCodes.Closed]],
    [ValueObjects.StatusCodes.Closed, [ValueObjects.StatusCodes.Assigned]],
  ]);
  private readonly statusMappings = new Map<string, string>([
    [ValueObjects.StatusCodes.Draft, ActivityDetailValueObjects.ActivityTypeCodes.Created],
    [ValueObjects.StatusCodes.Submitted, ActivityDetailValueObjects.ActivityTypeCodes.Submitted],
    [ValueObjects.StatusCodes.Assigned, ActivityDetailValueObjects.ActivityTypeCodes.Assigned],
    [ValueObjects.StatusCodes.Paid, ActivityDetailValueObjects.ActivityTypeCodes.Paid],
    [ValueObjects.StatusCodes.Closed, ActivityDetailValueObjects.ActivityTypeCodes.Closed],
  ]);

  private MarkAsNew(): void {
    this.isNew = true;
    this.addIntegrationEvent(ViolationTicketCreatedEvent, { id: this.props.id });
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

  set Status(statusCode: string) {
    if (!this.isNew && !this.visa.determineIf((permissions) => permissions.isSystemAccount)) {
      throw new Error('Unauthorized5');
    }
    this.props.status = new ValueObjects.StatusCode(statusCode).valueOf();
  }

  set Priority(priority: number) {
    if (
      !this.isNew &&
      !this.visa.determineIf((permissions) => permissions.isSystemAccount || (permissions.canCreateTickets && permissions.isEditingOwnTicket) || permissions.canManageTickets)
    ) {
      throw new Error('Unauthorized6');
    }
    this.props.priority = new ValueObjects.Priority(priority).valueOf();
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

  set PenaltyAmount(penaltyAmount: number) {
    if (
      !this.isNew &&
      !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageTickets || (permissions.canCreateTickets && permissions.isEditingOwnTicket))
    ) {
      throw new Error('Unauthorized3b');
    }
    this.props.penaltyAmount = new ValueObjects.PenaltyAmount(penaltyAmount).valueOf();
  }

  set PenaltyPaidDate(penaltyPaidDate: Date) {
    this.props.penaltyPaidDate = penaltyPaidDate;
  }
  //

  public requestDelete(): void {
    if (!this.isDeleted && !this.visa.determineIf((permissions) => permissions.isSystemAccount || permissions.canManageTickets)) {
      throw new Error('You do not have permission to delete this property');
    }
    super.isDeleted = true;
    this.addIntegrationEvent(ViolationTicketDeletedEvent, { id: this.props.id });
  }

  private requestNewActivityDetail(): ActivityDetail {
    let activityDetail = this.props.activityLog.getNewItem();
    return new ActivityDetail(activityDetail, this.context, this.visa);
  }

  private requestNewPaymentTransaction(): Transaction {
    let paymentTransaction = this.props.paymentTransactions.getNewItem();
    return new Transaction(paymentTransaction, this.context, this.visa);
  }

  public requestAddPaymentTransaction(): Transaction {
    if (
      !this.isNew &&
      !this.visa.determineIf(
        (permissions) =>
          permissions.isSystemAccount ||
          (permissions.canCreateTickets && permissions.isEditingOwnTicket) ||
          (permissions.canWorkOnTickets && permissions.isEditingAssignedTicket) ||
          permissions.canManageTickets
      )
    ) {
      throw new Error('Unauthorized');
    }
    return this.requestNewPaymentTransaction();
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
      throw new Error('Unauthorized');
    }
    const activityDetail = this.requestNewActivityDetail();
    activityDetail.ActivityType = ActivityDetailValueObjects.ActivityTypeCodes.Updated;
    activityDetail.ActivityDescription = description;
    activityDetail.ActivityBy = by;
  }

  public detectValueChangeAndAddTicketActivityLogs(incomingPayload: ViolationTicketUpdateInput, propertyDo) {
    let activityMessage: string = `${this.requestor.memberName} made field changes: | `;
    const updateLogMessages = {
      title: incomingPayload.title && incomingPayload.title !== this.title ? `Title: %n ${incomingPayload.title} %o ${this.title}` : null,
      description:
        incomingPayload.description && incomingPayload.description !== this.description ? `Description: %n ${incomingPayload.description} %o ${this.description}` : null,
      penaltyAmount:
        incomingPayload.penaltyAmount && incomingPayload.penaltyAmount !== this.penaltyAmount
          ? `Penalty amount: %n $${incomingPayload.penaltyAmount} %o $${this.penaltyAmount}`
          : null,
      priority: incomingPayload.priority && incomingPayload.priority !== this.priority ? `Priority: %n ${incomingPayload.priority} %o ${this.priority}` : null,
      property: incomingPayload.propertyId && incomingPayload.propertyId !== this.property.id ? `Property: %n ${propertyDo?.propertyName}` : null,
    };
    for (let key in updateLogMessages) {
      if (!propertyDo) {
        delete updateLogMessages.property;
      }
      if (updateLogMessages[key]) {
        activityMessage += `${updateLogMessages[key]} | `;
      }
    }
    this.requestAddStatusUpdate(activityMessage, this.requestor);
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
      this.addIntegrationEvent(ViolationTicketUpdatedEvent, { id: this.props.id });
    }
  }
}
