import { ActivityDetail, Photo } from '../../../models/service-ticket';
import { ViolationTicket } from '../../../models/violation-ticket';
import { ViolationTicketV1 as ViolationTicketV1DO, ViolationTicketV1Props } from '../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket';
import { MongooseDomainAdapter, MongoosePropArray } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';
import { DomainExecutionContext } from '../../../../../../app/domain/contexts/domain-execution-context';
import { CommunityEntityReference } from '../../../../../../app/domain/contexts/community/community';
import { CommunityDomainAdapter } from '../../community';
import { PropertyDomainAdapter } from '../../property.domain-adapter';
import { PropertyEntityReference } from '../../../../../../app/domain/contexts/property/property';
import { MemberEntityReference } from '../../../../../../app/domain/contexts/community/member';
import { MemberDomainAdapter } from '../../member.domain-adapter';
import { nanoid } from 'nanoid';
import { ServiceDomainAdapter } from '../../service.domain-adapter';
import { ServiceEntityReference } from '../../../../../../app/domain/contexts/service/service';
import { ViolationTicketV1ActivityDetailProps } from '../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket-activity-detail';
import { ViolationTicketV1PhotoProps } from '../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket-photo';

export class ViolationTicketV1Converter extends MongoTypeConverter<
  DomainExecutionContext,
  ViolationTicket,
  ViolationTicketV1DomainAdapter,
  ViolationTicketV1DO<ViolationTicketV1DomainAdapter>
> {
  constructor() {
    super(ViolationTicketV1DomainAdapter, ViolationTicketV1DO);
  }
}

export class ViolationTicketV1DomainAdapter extends MongooseDomainAdapter<ViolationTicket> implements ViolationTicketV1Props {
  get community() {
    if (this.doc.community) {
      return new CommunityDomainAdapter(this.doc.community);
    }
  }
  public setCommunityRef(community: CommunityEntityReference) {
    this.doc.set('community', community.id);
  }

  get property() {
    if (this.doc.property) {
      return new PropertyDomainAdapter(this.doc.property);
    }
  }
  public setPropertyRef(property: PropertyEntityReference) {
    this.doc.set('property', property.id);
  }

  get requestor() {
    if (this.doc.requestor) {
      return new MemberDomainAdapter(this.doc.requestor);
    }
  }
  public setRequestorRef(requestor: MemberEntityReference) {
    this.doc.set('requestor', requestor ? requestor['props']['doc'] : null);
  }

  get assignedTo() {
    if (this.doc.assignedTo) {
      return this.doc.assignedTo ? new MemberDomainAdapter(this.doc.assignedTo) : undefined;
    }
  }
  public setAssignedToRef(assignedTo: MemberEntityReference) {
    this.doc.set('assignedTo', assignedTo ? assignedTo['props']['doc'] : null);
  }

  get service() {
    return this.doc.service ? new ServiceDomainAdapter(this.doc.service) : undefined;
  }
  public setServiceRef(service: ServiceEntityReference) {
    this.doc.set('service', service ? service['props']['doc'] : null);
  }

  get title() {
    return this.doc.title;
  }
  set title(title) {
    this.doc.title = title;
  }

  get description() {
    return this.doc.description;
  }
  set description(description) {
    this.doc.description = description;
  }

  get status() {
    return this.doc.status;
  }
  set status(status) {
    this.doc.status = status;
  }

  get priority() {
    return this.doc.priority;
  }
  set priority(priority) {
    this.doc.priority = priority;
  }

  get activityLog() {
    return new MongoosePropArray(this.doc.activityLog, ViolationTicketV1ActivityDetailDomainAdapter);
  }

  get photos() {
    return new MongoosePropArray(this.doc.photos, ViolationTicketV1PhotoDomainAdapter);
  }

  get hash() {
    return this.doc.hash;
  }
  set hash(hash) {
    this.doc.hash = hash;
  }

  get lastIndexed() {
    return this.doc.lastIndexed;
  }
  set lastIndexed(lastIndexed) {
    this.doc.lastIndexed = lastIndexed;
  }

  get updateIndexFailedDate() {
    return this.doc.updateIndexFailedDate;
  }

  set updateIndexFailedDate(updateIndexFailedDate) {
    this.doc.updateIndexFailedDate = updateIndexFailedDate;
  }

  set penaltyAmount(penaltyAmount) {
    this.doc.penaltyAmount = penaltyAmount;
  }

  get penaltyAmount () {
    return this.doc.penaltyAmount;  
  }

  set penaltyPaidDate(penaltyPaidDate) {
    this.doc.penaltyPaidDate = penaltyPaidDate;
  }

  get penaltyPaidDate () {
    return this.doc.penaltyPaidDate;  
  }

  get ticketType() {
    return this.doc.ticketType;  
  }
}

export class ViolationTicketV1ActivityDetailDomainAdapter implements ViolationTicketV1ActivityDetailProps {
  constructor(public readonly props: ActivityDetail) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }

  get activityType() {
    return this.props.activityType;
  }
  set activityType(activityType) {
    this.props.activityType = activityType;
  }

  get activityDescription() {
    return this.props.activityDescription;
  }
  set activityDescription(description) {
    this.props.activityDescription = description;
  }

  get activityBy() {
    if (this.props.activityBy) {
      return new MemberDomainAdapter(this.props.activityBy);
    }
  }
  public setActivityByRef(activityBy: MemberEntityReference) {
    this.props.set('activityBy', activityBy['props']['doc']);
  }
}

export class ViolationTicketV1PhotoDomainAdapter implements ViolationTicketV1PhotoProps {
  constructor(public readonly props: Photo) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }

  get documentId() {
    return this.props.documentId;
  }
  set documentId(documentId) {
    this.props.documentId = documentId;
  }

  get description() {
    return this.props.description;
  }
  set description(description) {
    this.props.description = description;
  }

  getNewDocumentId(): string {
    return nanoid();
  }
}
