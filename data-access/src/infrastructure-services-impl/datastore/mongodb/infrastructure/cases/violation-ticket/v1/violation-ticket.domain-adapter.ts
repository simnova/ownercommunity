import { ActivityDetail, Photo } from '../../../../models/cases/service-ticket';
import { Transaction, ViolationTicket, ViolationTicketMessage, ViolationTicketRevisionRequest, ViolationTicketRevisionRequestedChanges } from '../../../../models/cases/violation-ticket';
import { ViolationTicketV1 as ViolationTicketDO, ViolationTicketV1Props } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket';
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
import { ViolationTicketV1MessageProps } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-message';
import { PhotoProps } from '../../../../../../../app/domain/contexts/cases/service-ticket/v1/photo';
import { nanoid } from 'nanoid';
import { ServiceDomainAdapter } from '../../../service/service.domain-adapter';
import { ServiceEntityReference } from '../../../../../../../app/domain/contexts/community/service/service';
import { TransactionProps } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/transaction';
import { ViolationTicketV1RevisionRequestEntityReference, ViolationTicketV1RevisionRequestProps } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-revision-request';
import { ViolationTicketV1RevisionRequestedChangesProps } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-revision-requested-changes';

export class ViolationTicketV1Converter extends MongoTypeConverter<
  DomainExecutionContext,
  ViolationTicket,
  ViolationTicketV1DomainAdapter,
  ViolationTicketDO<ViolationTicketV1DomainAdapter>
> {
  constructor() {
    super(ViolationTicketV1DomainAdapter, ViolationTicketDO);
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

  get paymentTransactions() {
    return new MongoosePropArray(this.doc.paymentTransactions, TransactionDomainAdapter);
  }

  get revisionRequest() {
    if (!this.doc.revisionRequest) {
      this.doc.set('revisionRequest', {});
    }
    return new ViolationTicketV1RevisionRequestDomainAdapter(this.doc.revisionRequest);
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
    return new MongoosePropArray(this.doc.activityLog, ActivityDetailDomainAdapter);
  }

  get messages() {
    return new MongoosePropArray(this.doc.messages, ViolationTicketV1MessageDomainAdapter);
  }

  get photos() {
    return new MongoosePropArray(this.doc.photos, PhotoDomainAdapter);
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

  get penaltyAmount() {
    return this.doc.penaltyAmount;
  }

  set penaltyPaidDate(penaltyPaidDate) {
    this.doc.penaltyPaidDate = penaltyPaidDate;
  }

  get penaltyPaidDate() {
    return this.doc.penaltyPaidDate;
  }

  get ticketType() {
    return this.doc.ticketType;
  }
}

export class ActivityDetailDomainAdapter implements ActivityDetailProps {
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

export class PhotoDomainAdapter implements PhotoProps {
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

export class TransactionDomainAdapter implements TransactionProps {
  constructor(public readonly doc: Transaction) {}

  public get id(): string {
    return this.doc.id.valueOf() as string;
  }

  get transactionId() {
    return this.doc.transactionId;
  }

  get type() {
    return this.doc.type;
  }

  set type(type) {
    this.doc.type = type;
  }

  get description() {
    return this.doc.description;
  }

  set description(description) {
    this.doc.description = description;
  }

  set transactionId(transactionId) {
    this.doc.transactionId = transactionId;
  }

  get clientReferenceCode() {
    return this.doc.clientReferenceCode;
  }

  set clientReferenceCode(clientReferenceCode) {
    this.doc.clientReferenceCode = clientReferenceCode;
  }

  get amountDetails() {
    return this.doc.amountDetails;
  }

  set amountDetails(amountDetails) {
    this.doc.amountDetails = amountDetails;
  }

  get status() {
    return this.doc.status;
  }

  set status(status) {
    this.doc.status = status;
  }

  get reconciliationId() {
    return this.doc.reconciliationId;
  }

  set reconciliationId(reconciliationId) {
    this.doc.reconciliationId = reconciliationId;
  }

  get isSuccess() {
    return this.doc.isSuccess;
  }
  set isSuccess(isSuccess) {
    this.doc.isSuccess = isSuccess;
  }

  get transactionTime() {
    return this.doc.transactionTime;
  }
  set transactionTime(transactionTime) {
    this.doc.transactionTime = transactionTime;
  }

  get successTimestamp() {
    return this.doc.successTimestamp;
  }
  set successTimestamp(successTimestamp) {
    this.doc.successTimestamp = successTimestamp;
  }

  get error() {
    return this.doc.error;
  }
  set error(error) {
    this.doc.error = error;
  }
}

export class ViolationTicketV1MessageDomainAdapter implements ViolationTicketV1MessageProps {
  constructor(public readonly props: ViolationTicketMessage) {}
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
      return new MemberDomainAdapter(this.props.initiatedBy);
    }
  }
  public setInitiatedByRef(initiatedBy: MemberEntityReference) {
    this.props.initiatedBy = initiatedBy['props']['doc'];
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

export class ViolationTicketV1RevisionRequestDomainAdapter implements ViolationTicketV1RevisionRequestProps {
  constructor(public readonly doc: ViolationTicketRevisionRequest) {}

  get requestedAt() {
    return this.doc.requestedAt;
  }
  set requestedAt(requestedAt) {
    this.doc.requestedAt = requestedAt;
  }

  get requestedBy() {
    if (this.doc.requestedBy) {
      return new MemberDomainAdapter(this.doc.requestedBy);
    }
  }
  public setRequestedByRef(requestedBy: MemberEntityReference) {
    this.doc.requestedBy = requestedBy['props']['doc'];
  }

  get revisionSummary() {
    return this.doc.revisionSummary;
  }
  set revisionSummary(revisionSummary) {
    this.doc.revisionSummary = revisionSummary;
  }

  get requestedChanges() {
    return new ViolationTicketV1RevisionRequestedChangesDomainAdapter(this.doc.requestedChanges);
  }

  get revisionSubmittedAt() {
    return this.doc.revisionSubmittedAt;
  }
  set revisionSubmittedAt(revisionSubmittedAt) {
    this.doc.revisionSubmittedAt = revisionSubmittedAt;
  }
}

export class ViolationTicketV1RevisionRequestedChangesDomainAdapter implements ViolationTicketV1RevisionRequestedChangesProps {
  constructor(public readonly doc: ViolationTicketRevisionRequestedChanges) {}

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

  get requestUpdatedPaymentTransaction() {
    return this.doc.requestUpdatedPaymentTransaction;
  }
  set requestUpdatedPaymentTransaction(requestUpdatedPaymentTransaction) {
    this.doc.requestUpdatedPaymentTransaction = requestUpdatedPaymentTransaction;
  }
}
