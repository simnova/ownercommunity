import { nanoid } from 'nanoid';
import { MongooseDomainAdapter, MongoosePropArray } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';
import { ServiceTicketV1 as ServiceTicketV1DO, ServiceTicketV1Props } from '../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket';
import { ServiceTicketV1ActivityDetail, ServiceTicketV1ActivityDetailProps } from '../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket-activity-detail';
import { ServiceTicketV1PhotoProps, ServiceTicketV1Photo } from '../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket-photo';
import { CommunityEntityReference } from '../../../../../../app/domain/contexts/community/community';
import { MemberEntityReference } from '../../../../../../app/domain/contexts/community/member';
import { DomainExecutionContext } from '../../../../../../app/domain/contexts/domain-execution-context';
import { PropertyEntityReference } from '../../../../../../app/domain/contexts/property/property';
import { ServiceEntityReference } from '../../../../../../app/domain/contexts/service/service';
import { ServiceTicket, ActivityDetail, Photo } from '../../../models/service-ticket';
import { CommunityDomainAdapter } from '../../community';
import { MemberDomainAdapter } from '../../member.domain-adapter';
import { PropertyDomainAdapter } from '../../property.domain-adapter';
import { ServiceDomainAdapter } from '../../service.domain-adapter';

export class ServiceTicketV1Converter extends MongoTypeConverter<
  DomainExecutionContext,
  ServiceTicket,
  ServiceTicketV1DomainAdapter,
  ServiceTicketV1DO<ServiceTicketV1DomainAdapter>
> {
  constructor() {
    super(ServiceTicketV1DomainAdapter, ServiceTicketV1DO);
  }
}

export class ServiceTicketV1DomainAdapter extends MongooseDomainAdapter<ServiceTicket> implements ServiceTicketV1Props {
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
    return new MongoosePropArray(this.doc.activityLog, ServiceTicketV1ActivityDetailDomainAdapter);
  }

  get photos() {
    return new MongoosePropArray(this.doc.photos, ServiceTicketV1PhotoDomainAdapter);
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

  get ticketType() {
    return this.doc.ticketType;  
  }
}

export class ServiceTicketV1ActivityDetailDomainAdapter implements ServiceTicketV1ActivityDetailProps {
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

export class ServiceTicketV1PhotoDomainAdapter implements ServiceTicketV1PhotoProps {
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
