import { CommunityEntityReference, CommunityProps } from "../../../../../../app/domain/contexts/community/community";
import { MemberEntityReference, MemberProps } from "../../../../../../app/domain/contexts/community/member";
import { DomainExecutionContext } from "../../../../../../app/domain/contexts/domain-execution-context";
import { PropertyEntityReference, PropertyProps } from "../../../../../../app/domain/contexts/property/property";
import { ServiceEntityReference, ServiceProps } from "../../../../../../app/domain/contexts/service/service";
import { MemoryBaseAdapter } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter";
import { MemoryPropArray } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-prop-array";
import { MemoryRepositoryBase } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository";
import {v4 as uuidV4} from 'uuid';
import { ViolationTicketV1, ViolationTicketV1Props } from "../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket";
import { ViolationTicketV1Repository } from "../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket.repository";
import { ViolationTicketV1ActivityDetailProps } from "../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket-activity-detail";
import { ViolationTicketV1PhotoProps } from "../../../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket-photo";

class MemoryViolationTicketV1ActivityDetail extends MemoryBaseAdapter implements ViolationTicketV1ActivityDetailProps {
  activityType: string;
  activityDescription: string;
  activityBy: MemberProps;
  setActivityByRef(activityBy: MemberEntityReference) : void {
    this.activityBy = activityBy['props'] as MemberProps;
  };
}

class MemoryViolationTicketV1Photo extends MemoryBaseAdapter implements ViolationTicketV1PhotoProps {
  documentId: string;
  description: string;
  getNewDocumentId(): string {
    return uuidV4();
  }
}

class MemoryViolationTicketV1 extends MemoryBaseAdapter implements ViolationTicketV1Props  {
  community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference) : void {
    this.community = community as CommunityProps;
  };
  property: PropertyProps;
  setPropertyRef(property: PropertyEntityReference) : void {
    this.property = property as unknown as PropertyProps; // [MG-TBD]
  };
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
  penaltyAmount: number;
  penaltyPaidDate: Date;
  status: string;
  priority: number;
  ticketType?: string;
  private _activityLog: ViolationTicketV1ActivityDetailProps[] = [];
  get activityLog() {
    return new MemoryPropArray(this._activityLog, MemoryViolationTicketV1ActivityDetail);
  };
  private _photos: ViolationTicketV1PhotoProps[] = [];
  get photos() {
    return new MemoryPropArray(this._photos, MemoryViolationTicketV1Photo);
  };
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
  hash: string;
  lastIndexed: Date; // success
  updateIndexFailedDate: Date; // failure
}

export class MemoryViolationTicketV1Repository<
  PropType extends ViolationTicketV1Props, 
  DomainType extends ViolationTicketV1<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
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
        return ViolationTicketV1.getNewInstance(new MemoryViolationTicketV1 as unknown as PropType, title, description, community, property, requestor, this.context, penaltyAmount); // [MG-TBD]
      }
      async getById(id: string): Promise<ViolationTicketV1<PropType>>{
        return await this.get(id);
      }
  }