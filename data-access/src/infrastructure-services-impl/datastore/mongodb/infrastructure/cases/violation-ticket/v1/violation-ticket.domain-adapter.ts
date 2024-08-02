import { ActivityDetail, Photo } from '../../../../models/cases/service-ticket';
import { AdhocTransaction, FinanceDetails, Submission, Transaction, TransactionReference, ViolationTicket, ViolationTicketMessage } from '../../../../models/cases/violation-ticket';
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
import { AdhocTransactionsProps } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/finance-details-adhoc-transactions';
import { FinanceDetailProps } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/finance-details';
import { TransactionsProps } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-finance-details-transactions';
import { SubmissionProps } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-finance-details-transactions-submission';
import { TransactionReferenceProps } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-finance-details-transactions-submission-transaction-reference';

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
      return new MemberDomainAdapter(this.doc.assignedTo);
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

  get ticketType() {
    return this.doc.ticketType;
  }

  get financeDetails() {
    if (!this.doc.financeDetails) {
      this.doc.set('financeDetails', {});
    }
    return new FinanceDetailDomainAdapter(this.doc.financeDetails);
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

export class AdhocTransactionDomainAdapter implements AdhocTransactionsProps {
  constructor(public readonly doc: AdhocTransaction) {}

  public get id(): string {
    return this.doc.id.valueOf() as string;
  }

  get amount() {
    return this.doc.amount;
  }

  get requestedOn() {
    return this.doc.requestedOn;
  }
  get reason() {
    return this.doc.reason;
  }
  get approval() {
    return this.doc.approval;
  }
  get transactionReference() {
    return this.doc.transactionReference;
  }
  get createdAt() {
    return this.doc.createdAt;
  }
  get updatedAt() {
    return this.doc.updatedAt;
  }

  get requestedBy() {
    if (this.doc.requestedBy) {
      return new (this.doc.requestedBy);
    }
  }

  // setters for AdhocTransaction
  set amount(amount) {
    this.doc.amount = amount;
  }

  public setRequestedByRef(requestedBy: MemberEntityReference) {
    this.doc.requestedBy = requestedBy['props']['doc'];
  }

  set requestedOn(requestedOn) {
    this.doc.requestedOn = requestedOn;
  }

  set reason(reason) {
    this.doc.reason = reason;
  }
}



export class FinanceDetailDomainAdapter implements FinanceDetailProps {
  constructor(public readonly doc: FinanceDetails) {}

  get serviceFee() {
    return this.doc.serviceFee;
  }

  get transactions() {
    return new TransactionDomainAdapter(this.doc.transactions);
  }

  // setters for FinanceDetails
  set serviceFee(serviceFee) {
    this.doc.serviceFee = serviceFee;
  }

  public setTransactions(transactions: TransactionsProps) {
    this.doc.transactions = transactions['props']['doc'];
  }
}

export class TransactionDomainAdapter implements TransactionsProps {
  constructor(public readonly doc: Transaction) {}

  get submission() {
    return new SubmissionDomainAdapter(this.doc.submission);
  }
  
}

export class TransactionReferenceDomainAdapter implements TransactionReferenceProps {
  constructor(public readonly doc: TransactionReference) {}

  get referenceId() {
    return this.doc.referenceId;
  }

  get completedOn() {
    return this.doc.completedOn;
  }

  get vendor() {
    return this.doc.vendor;
  }

  // setters for TransactionReference
  set ReferenceId(referenceId) {
    this.doc.referenceId = referenceId;
  }

  set CompletedOn(completedOn) {
    this.doc.completedOn = completedOn;
  }

  set Vendor(vendor) {
    this.doc.vendor = vendor;
  }
}

export class SubmissionDomainAdapter implements SubmissionProps {
  constructor(public readonly doc: Submission) {}

  get amount() {
    return this.doc.amount;
  }

  set Amount(amount) {
   this.doc.amount = amount;
  }

  get transactionReference() {
    if(!this.doc.transactionReference) {
      this.doc.transactionReference = {}
    }
    return new TransactionReferenceDomainAdapter(this.doc.transactionReference);
  }

  get adhocTransactions() {
    return new MongoosePropArray(this.doc.adhocTransactions, AdhocTransactionDomainAdapter);
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
