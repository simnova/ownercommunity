import { ActivityDetail, Photo } from '../../../../models/cases/service-ticket';
import { AdhocTransaction, Approval, FinanceDetails, FinanceReference, GlTransaction, RevenueRecognition, Submission, Transaction, TransactionReference, ViolationTicket, ViolationTicketMessage, ViolationTicketRevisionRequest, ViolationTicketRevisionRequestedChanges } from '../../../../models/cases/violation-ticket';
import { ViolationTicketV1 as ViolationTicketDO, ViolationTicketV1Props } from '../../../../../../../components/domain/contexts/cases/violation-ticket/v1/violation-ticket';
import { MongooseDomainAdapter, MongoosePropArray } from '../../../../../../../../framework/seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-domain-adapter';
import { MongoTypeConverter } from '../../../../../../../../framework/seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-type-converter';
import { DomainExecutionContext } from '../../../../../../../../framework/domain/domain-execution-context';
import { CommunityEntityReference } from '../../../../../../../components/domain/contexts/community/community/community';
import { CommunityDomainAdapter } from '../../../../../../../components/community/mongo-impl/community.mongo-domain-adapter';
import { PropertyDomainAdapter } from '../../../property/property.domain-adapter';
import { PropertyEntityReference } from '../../../../../../../components/domain/contexts/property/property/property';
import { MemberEntityReference } from '../../../../../../../components/domain/contexts/community/member/member';
import { MemberDomainAdapter } from '../../../member/member.domain-adapter';
import { ActivityDetailProps } from '../../../../../../../components/domain/contexts/cases/service-ticket/v1/activity-detail';
import { ViolationTicketV1MessageProps } from '../../../../../../../components/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-message';
import { PhotoProps } from '../../../../../../../components/domain/contexts/cases/service-ticket/v1/photo';
import { nanoid } from 'nanoid';
import { ServiceDomainAdapter } from '../../../service/service.domain-adapter';
import { ServiceEntityReference } from '../../../../../../../components/domain/contexts/community/service/service';
import { AdhocTransactionsProps } from '../../../../../../../components/domain/contexts/cases/violation-ticket/v1/finance-details-adhoc-transactions';
import { ViolationTicketV1FinanceDetailProps } from '../../../../../../../components/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-finance-details';
import { TransactionsProps } from '../../../../../../../components/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-finance-details-transactions';
import { SubmissionProps } from '../../../../../../../components/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-finance-details-transactions-submission';
import { TransactionReferenceProps } from '../../../../../../../components/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-finance-details-transactions-submission-transaction-reference';
import { ViolationTicketV1RevisionRequestProps } from '../../../../../../../components/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-revision-request';
import { ViolationTicketV1RevisionRequestedChangesProps } from '../../../../../../../components/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-revision-requested-changes';
import { RevenueRecognitionProps } from '../../../../../../../components/domain/contexts/cases/violation-ticket/v1/finance-detail-revenue-recognition';
import { GlTransactionProps } from '../../../../../../../components/domain/contexts/cases/violation-ticket/v1/finance-detail-revenue-recognition-gl-transaction';
import { FinanceReferenceProps } from '../../../../../../../components/domain/contexts/cases/violation-ticket/v1/finance-detail-adhoc-transactions-finance-reference';
import { ApprovalProps } from '../../../../../../../components/domain/contexts/cases/violation-ticket/v1/finance-details-adhoc-transactions-approval';

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

export class ApprovalDomainAdapter implements ApprovalProps {
  constructor(public readonly props: Approval) {}

  get isApplicantApprovalRequired() {
    return this.props.isApplicantApprovalRequired;
  }

  set isApplicantApprovalRequired(isApplicantApprovalRequired) {
    this.props.isApplicantApprovalRequired = isApplicantApprovalRequired;
  }

  get isApplicantApproved() {
    return this.props.isApplicantApproved;
  }

  set isApplicantApproved(isApplicantApproved) {
    this.props.isApplicantApproved = isApplicantApproved;
  }

  get applicantRespondedAt() {
    return this.props.applicantRespondedAt;
  }

  set applicantRespondedAt(applicantRespondedAt) {
    this.props.applicantRespondedAt = applicantRespondedAt;
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
    if(!this.doc.approval) {
      this.doc.set('approval', {});
    }
    return new ApprovalDomainAdapter(this.doc.approval);
  }

  get transactionReference() {
    if(!this.doc.transactionReference) {
      this.doc.set('transactionReference', {});
    }
    return new TransactionReferenceDomainAdapter(this.doc.transactionReference);
  }

  get financeReference() {
    if(!this.doc.financeReference) {
      this.doc.set('financeReference', {});
    }
    return new FinanceReferenceDomainAdapter(this.doc.financeReference);
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



export class FinanceDetailDomainAdapter implements ViolationTicketV1FinanceDetailProps {
  constructor(public readonly doc: FinanceDetails) {}

  get serviceFee() {
    return this.doc.serviceFee;
  }

  set serviceFee(serviceFee) {
    this.doc.serviceFee = serviceFee;
  }
  
  get transactions() {
    if (!this.doc?.transactions) {
      this.doc.set('transactions', {});
    }
    return new TransactionDomainAdapter(this.doc.transactions);
  }

  get revenueRecognition() {
    if (!this.doc?.revenueRecognition) {
      this.doc.set('revenueRecognition', {});
    }
    return new RevenueRecognitionDomainAdapter(this.doc.revenueRecognition);
  }
}

export class TransactionDomainAdapter implements TransactionsProps {
  constructor(public readonly doc: Transaction) {}

  get submission() {
    return new SubmissionDomainAdapter(this.doc.submission);
  }
  
  get adhocTransactions() {
    if (!this.doc.adhocTransactions) {
      this.doc.set('adhocTransactions', []);
    }
    return new MongoosePropArray(this.doc.adhocTransactions, AdhocTransactionDomainAdapter);
  }
}

export class RevenueRecognitionDomainAdapter implements RevenueRecognitionProps {
  constructor(public readonly doc: RevenueRecognition) {}

  get submission() {
    if(!this.doc.submission) {
      this.doc.set('submission', {});
    }
    return new GlTransactionDomainAdapter(this.doc.submission);
  }

  get recognition() {
    if(!this.doc.recognition) {
      this.doc.set('recognition', {});
    }
    return new GlTransactionDomainAdapter(this.doc.recognition);
  }
}

export class GlTransactionDomainAdapter implements GlTransactionProps {
  constructor(public readonly doc: GlTransaction) {}

  get debitGlAccount() {
    return this.doc.debitGlAccount;
  }
  set debitGlAccount(debitGlAccount) {
    this.doc.debitGlAccount = debitGlAccount;
  }

  get creditGlAccount() {
    return this.doc.creditGlAccount;
  }
  set creditGlAccount(creditGlAccount) {
    this.doc.creditGlAccount = creditGlAccount;
  }

  get amount() {
    return this.doc.amount;
  }
  set amount(amount) {
    this.doc.amount = amount;
  }

  get recognitionDate() {
    return this.doc.recognitionDate;
  }
  set recognitionDate(recognitionDate) {
    this.doc.recognitionDate = recognitionDate;
  }

  get completedOn() {
    return this.doc.completedOn;
  }
  set completedOn(completedOn) {
    this.doc.completedOn = completedOn;
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
  set referenceId(referenceId) {
    this.doc.referenceId = referenceId;
  }

  set completedOn(completedOn) {
    this.doc.completedOn = completedOn;
  }

  set vendor(vendor) {
    this.doc.vendor = vendor;
  }
}

export class FinanceReferenceDomainAdapter implements FinanceReferenceProps {
  constructor(public readonly doc: FinanceReference) {}

  get debitGlAccount() {
    return this.doc.debitGlAccount;
  }
  set debitGlAccount(debitGlAccount) {
    this.doc.debitGlAccount = debitGlAccount;
  }

  get creditGlAccount() {
    return this.doc.creditGlAccount;
  }
  set creditGlAccount(creditGlAccount) {
    this.doc.creditGlAccount = creditGlAccount;
  }

  get completedOn() {
    return this.doc.completedOn;
  }
  set completedOn(completedOn) {
    this.doc.completedOn = completedOn;
  }
}
export class SubmissionDomainAdapter implements SubmissionProps {
  constructor(public readonly doc: Submission) {}

  get amount() {
    return this.doc.amount;
  }

  set amount(amount) {
   this.doc.amount = amount;
  }

  get transactionReference() {
    return new TransactionReferenceDomainAdapter(this.doc.transactionReference);
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

