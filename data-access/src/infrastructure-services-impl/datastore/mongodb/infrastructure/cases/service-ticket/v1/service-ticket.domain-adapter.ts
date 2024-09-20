import {
  ActivityDetail,
  ServiceTicket,
  Photo,
  ServiceTicketMessage,
  ServiceTicketRevisionRequest,
  ServiceTicketRevisionRequestChanges,
} from '../../../../models/cases/service-ticket';
import { ServiceTicketV1 as ServiceTicketV1DO, ServiceTicketV1Props } from '../../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket-v1';
import { MongooseDomainAdapter, MongoosePropArray } from '../../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';
import { DomainExecutionContext } from '../../../../../../../app/domain/domain-execution-context';
import { CommunityEntityReference } from '../../../../../../../app/domain/contexts/community/community/community';
import { CommunityDomainAdapter } from '../../../community/community.domain-adapter';
import { PropertyDomainAdapter } from '../../../property/property.domain-adapter';
import { PropertyEntityReference } from '../../../../../../../app/domain/contexts/property/property/property';
import { MemberEntityReference } from '../../../../../../../app/domain/contexts/community/member/member';
import { MemberDomainAdapter } from '../../../member/member.domain-adapter';
import { ActivityDetailProps } from '../../../../../../../app/domain/contexts/cases/service-ticket/v1/activity-detail';
import { ServiceTicketV1MessageProps } from '../../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket-v1-message';
import { PhotoProps } from '../../../../../../../app/domain/contexts/cases/service-ticket/v1/photo';
import { nanoid } from 'nanoid';
import { ServiceDomainAdapter } from '../../../service/service.domain-adapter';
import { ServiceEntityReference } from '../../../../../../../app/domain/contexts/community/service/service';
import {
  ServiceTicketV1RevisionRequestEntityReference,
  ServiceTicketV1RevisionRequestProps,
} from '../../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket-v1-revision-request';
import { ServiceTicketV1RevisionRequestedChangesProps } from '../../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket-v1-revision-requested-changes';
import { ServiceTicketV1Visa } from '../../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket.visa';
import { InfrastructureContext } from '../../../../../../../app/init/infrastructure-context';

export class ServiceTicketV1Converter extends MongoTypeConverter<
  DomainExecutionContext,
  ServiceTicket,
  ServiceTicketV1DomainAdapter,
  ServiceTicketV1Visa,
  ServiceTicketV1DO<ServiceTicketV1DomainAdapter>,
  InfrastructureContext
> {
  constructor() {
    super(ServiceTicketV1DomainAdapter, ServiceTicketV1DO);
  }
}

export class ServiceTicketV1DomainAdapter extends MongooseDomainAdapter<ServiceTicket, InfrastructureContext> implements ServiceTicketV1Props {
  get community() {
    if (this.doc.community) {
      return new CommunityDomainAdapter(this.doc.community, this.infrastructureContext);
    }
  }
  public setCommunityRef(community: CommunityEntityReference) {
    this.doc.set('community', community.id);
  }

  get property() {
    if (this.doc.property) {
      return new PropertyDomainAdapter(this.doc.property, this.infrastructureContext);
    }
  }
  public setPropertyRef(property: PropertyEntityReference) {
    this.doc.set('property', property.id);
  }

  public setRevisionRequestRef(revisionRequest: ServiceTicketV1RevisionRequestEntityReference): void {
    this.doc.set('revisionRequest', revisionRequest);
  }

  get requestor() {
    if (this.doc.requestor) {
      return new MemberDomainAdapter(this.doc.requestor, this.infrastructureContext);
    }
  }
  public setRequestorRef(requestor: MemberEntityReference) {
    this.doc.set('requestor', requestor ? requestor['props']['doc'] : null);
  }

  get assignedTo() {
    if (this.doc.assignedTo) {
      return this.doc.assignedTo ? new MemberDomainAdapter(this.doc.assignedTo, this.infrastructureContext) : undefined;
    }
  }
  public setAssignedToRef(assignedTo: MemberEntityReference) {
    this.doc.set('assignedTo', assignedTo ? assignedTo['props']['doc'] : null);
  }

  get service() {
    return this.doc.service ? new ServiceDomainAdapter(this.doc.service, this.infrastructureContext) : undefined;
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
    return new MongoosePropArray(this.doc.activityLog, ActivityDetailDomainAdapter, this.infrastructureContext);
  }

  get messages() {
    return new MongoosePropArray(this.doc.messages, ServiceTicketV1MessageDomainAdapter, this.infrastructureContext);
  }

  get photos() {
    return new MongoosePropArray(this.doc.photos, PhotoDomainAdapter, this.infrastructureContext);
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

  get revisionRequest() {
    if (!this.doc.revisionRequest) {
      this.doc.set('revisionRequest', {});
    }
    return new ServiceTicketRevisionRequestAdapater(this.doc.revisionRequest, this.infrastructureContext);
  }
}

export class ActivityDetailDomainAdapter implements ActivityDetailProps {
  constructor(public readonly props: ActivityDetail, private readonly infrastructureContext: InfrastructureContext) {}
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
      return this.props.activityBy ? new MemberDomainAdapter(this.props.activityBy, this.infrastructureContext) : undefined;
    }
  }
  public setActivityByRef(activityBy: MemberEntityReference) {
    // this.props.set('activityBy', activityBy['props']['doc']);
    this.props.set('activityBy', this.infrastructureContext.auditContext.funcToGetMemberRef());
  }
}

export class PhotoDomainAdapter implements PhotoProps {
  constructor(public readonly props: Photo, private readonly infrastructureContext: InfrastructureContext) {}
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

export class ServiceTicketV1MessageDomainAdapter implements ServiceTicketV1MessageProps {
  constructor(public readonly props: ServiceTicketMessage, private readonly infrastructureContext: InfrastructureContext) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }

  get sentBy() {
    return this.props.sentBy;
  }
  set sentBy(sentBy) {
    this.props.sentBy = sentBy;
  }

  get initiatedBy() {
    if (this.props.initiatedBy) {
      return new MemberDomainAdapter(this.props.initiatedBy, this.infrastructureContext);
    }
  }
  public setInitiatedByRef(initiatedBy: MemberEntityReference | undefined) {
    this.props.set('initiatedBy', initiatedBy ? initiatedBy['props']['doc'] : undefined);
  }

  get message() {
    return this.props.message;
  }
  set message(message) {
    this.props.message = message;
  }

  get embedding() {
    return this.props.embedding;
  }
  set embedding(embedding) {
    this.props.embedding = embedding;
  }

  get createdAt() {
    return this.props.createdAt;
  }
  set createdAt(createdAt) {
    this.props.createdAt = createdAt;
  }

  get isHiddenFromApplicant() {
    return this.props.isHiddenFromApplicant;
  }
  set isHiddenFromApplicant(isHiddenFromApplicant) {
    this.props.isHiddenFromApplicant = isHiddenFromApplicant;
  }
}

export class ServiceTicketRevisionRequestAdapater implements ServiceTicketV1RevisionRequestProps {
  constructor(public readonly doc: ServiceTicketRevisionRequest, private readonly infrastructureContext: InfrastructureContext) {}

  get requestedAt() {
    return this.doc.requestedAt;
  }

  set requestedAt(requestedAt) {
    this.doc.requestedAt = requestedAt;
  }

  get requestedBy() {
    if (this.doc.requestedBy) {
      return new MemberDomainAdapter(this.doc.requestedBy, this.infrastructureContext);
    }
  }

  public setRequestedByRef(requestedBy: MemberEntityReference) {
    this.doc.requestedBy = requestedBy['props']['doc'];
  }

  get revisionSubmittedAt() {
    return this.doc.revisionSubmittedAt;
  }

  set revisionSubmittedAt(revisionSubmittedAt) {
    this.doc.revisionSubmittedAt = revisionSubmittedAt;
  }

  get revisionSummary() {
    return this.doc.revisionSummary;
  }

  set revisionSummary(revisionSummary) {
    this.doc.revisionSummary = revisionSummary;
  }

  get requestedChanges() {
    if (!this.doc.requestedChanges) {
      this.doc.set('requestedChanges', {});
    }
    return new ServiceTicketV1RevisionRequestedChangesDomainAdapter(this.doc.requestedChanges, this.infrastructureContext);
  }
}

export class ServiceTicketV1RevisionRequestedChangesDomainAdapter implements ServiceTicketV1RevisionRequestedChangesProps {
  constructor(public readonly doc: ServiceTicketRevisionRequestChanges, private readonly infrastructureContext: InfrastructureContext) {}

  get requestUpdatedStatus() {
    return this.doc.requestUpdatedStatus;
  }
  set requestUpdatedStatus(requestUpdatedStatus) {
    this.doc.requestUpdatedStatus = requestUpdatedStatus;
  }

  get requestUpdatedAssignment() {
    return this.doc.requestUpdatedAssignment;
  }
  set requestUpdatedAssignment(requestUpdatedAssignment) {
    this.doc.requestUpdatedAssignment = requestUpdatedAssignment;
  }

  get requestUpdatedProperty() {
    return this.doc.requestUpdatedProperty;
  }
  set requestUpdatedProperty(requestUpdatedProperty) {
    this.doc.requestUpdatedProperty = requestUpdatedProperty;
  }
}
