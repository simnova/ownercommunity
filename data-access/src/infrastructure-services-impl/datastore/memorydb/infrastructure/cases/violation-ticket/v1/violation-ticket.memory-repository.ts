import { CommunityEntityReference, CommunityProps } from '../../../../../../../app/domain/contexts/community/community/community';
import { MemberEntityReference, MemberProps } from '../../../../../../../app/domain/contexts/community/member/member';
import { DomainExecutionContext } from '../../../../../../../app/domain/domain-execution-context';
import { PropertyEntityReference, PropertyProps } from '../../../../../../../app/domain/contexts/property/property/property';
import { ActivityDetailProps } from '../../../../../../../app/domain/contexts/cases/service-ticket/v1/activity-detail';
import { PhotoProps } from '../../../../../../../app/domain/contexts/cases/service-ticket/v1/photo';
import { ServiceEntityReference, ServiceProps } from '../../../../../../../app/domain/contexts/community/service/service';
import { MemoryBaseAdapter } from '../../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter';
import { MemoryPropArray } from '../../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-prop-array';
import { MemoryRepositoryBase } from '../../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository';
import { v4 as uuidV4 } from 'uuid';
import { ViolationTicketV1, ViolationTicketV1Props } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket';
import { ViolationTicketV1Repository } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket.repository';
import { ViolationTicketV1FinanceDetailProps } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-finance-details';
import { ViolationTicketV1MessageProps } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-message';
import { TransactionsProps } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-finance-details-transactions';
import { ViolationTicketV1RevisionRequestEntityReference, ViolationTicketV1RevisionRequestProps } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-revision-request';
import { ViolationTicketV1RevisionRequestedChangesProps } from '../../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket-v1-revision-requested-changes';

class MemoryViolationTicketV1RevisionRequestedChanges implements ViolationTicketV1RevisionRequestedChangesProps {
  requestUpdatedAssignment: boolean;
  requestUpdatedStatus: boolean;
  requestUpdatedProperty: boolean;
  requestUpdatedPaymentTransaction: boolean;
}

class MemoryViolationTicketV1RevisionRequest implements ViolationTicketV1RevisionRequestProps {
  requestedAt: Date;
  requestedBy: MemberProps;
  setRequestedByRef(requestedBy: MemberEntityReference): void {
    this.requestedBy = requestedBy['props'] as MemberProps;
  }
  revisionSummary: string;
  requestedChanges: MemoryViolationTicketV1RevisionRequestedChanges;
  revisionSubmittedAt?: Date;
}

class MemoryViolationTicketV1Message extends MemoryBaseAdapter implements ViolationTicketV1MessageProps {
  sentBy: string;
  initiatedBy: MemberProps;
  setInitiatedByRef(initiatedBy: MemberEntityReference): void {
    this.initiatedBy = initiatedBy['props'] as MemberProps;
  }
  message: string;
  embedding: string;
  createdAt: Date;
  isHiddenFromApplicant: boolean;
}

class MemoryActivityDetail extends MemoryBaseAdapter implements ActivityDetailProps {
  activityType: string;
  activityDescription: string;
  activityBy: MemberProps;
  setActivityByRef(activityBy: MemberEntityReference): void {
    this.activityBy = activityBy['props'] as MemberProps;
  }
}

class MemoryFinanceDetails extends MemoryBaseAdapter implements ViolationTicketV1FinanceDetailProps {
  serviceFee: number;
  transactions: TransactionsProps
}

class MemoryPhoto extends MemoryBaseAdapter implements PhotoProps {
  documentId: string;
  description: string;
  getNewDocumentId(): string {
    return uuidV4();
  }
}

class MemoryViolationTicketV1 extends MemoryBaseAdapter implements ViolationTicketV1Props {
  community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference): void {
    this.community = community as CommunityProps;
  }
  property: PropertyProps;
  setPropertyRef(property: PropertyEntityReference): void {
    this.property = property as unknown as PropertyProps; // [MG-TBD]
  }
  requestor: MemberProps;
  setRequestorRef(requestor: MemberEntityReference): void {
    this.requestor = requestor as unknown as MemberProps; // [MG-TBD]
  }
  assignedTo: MemberProps;
  setAssignedToRef(assignedTo: MemberEntityReference): void {
    this.assignedTo = assignedTo as unknown as MemberProps; // [MG-TBD]
  }
  service: ServiceProps;
  setServiceRef(service: ServiceEntityReference): void {
    this.service = service as ServiceProps;
  }
  title: string;
  description: string;
  status: string;
  priority: number;
  ticketType?: string;
  private _activityLog: ActivityDetailProps[] = [];
  get activityLog() {
    return new MemoryPropArray(this._activityLog, MemoryActivityDetail);
  }
  private _messages: ViolationTicketV1MessageProps[] = [];
  get messages() {
    return new MemoryPropArray(this._messages, MemoryViolationTicketV1Message);
  }
  private _photos: PhotoProps[] = [];
  get photos() {
    return new MemoryPropArray(this._photos, MemoryPhoto);
  }

  private _financeDetails: ViolationTicketV1FinanceDetailProps;
  get financeDetails() {
    return this._financeDetails;
  }
  private _revisionRequest: ViolationTicketV1RevisionRequestProps;
  get revisionRequest() {
    if(!this._revisionRequest){
      this._revisionRequest = new MemoryViolationTicketV1RevisionRequest();
    }
    return this._revisionRequest;
  };
  setRevisionRequestRef(revisionRequest: ViolationTicketV1RevisionRequestEntityReference): void {
    this._revisionRequest = revisionRequest as unknown as ViolationTicketV1RevisionRequestProps;
  }
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
  hash: string;
  lastIndexed: Date; // success
  updateIndexFailedDate: Date; // failure
}

export class MemoryViolationTicketV1Repository<PropType extends ViolationTicketV1Props, DomainType extends ViolationTicketV1<PropType>>
  extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType>
  implements ViolationTicketV1Repository<PropType>
{
  async getNewInstance(
    title: string,
    description: string,
    community: CommunityEntityReference,
    property: PropertyEntityReference,
    requestor: MemberEntityReference,
    penaltyAmount: number
  ): Promise<ViolationTicketV1<PropType>> {
    return ViolationTicketV1.getNewInstance(new MemoryViolationTicketV1() as unknown as PropType, title, description, community, property, requestor, this.context, penaltyAmount); // [MG-TBD]
  }
  async getById(id: string): Promise<ViolationTicketV1<PropType>> {
    return await this.get(id);
  }
}
