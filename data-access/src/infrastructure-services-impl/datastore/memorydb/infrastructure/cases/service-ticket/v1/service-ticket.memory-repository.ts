import { CommunityEntityReference, CommunityProps } from "../../../../../../../app/domain/contexts/community/community/community";
import { MemberEntityReference, MemberProps } from "../../../../../../../app/domain/contexts/community/member/member";
import { DomainExecutionContext } from "../../../../../../../app/domain/domain-execution-context";
import { PropertyEntityReference, PropertyProps } from "../../../../../../../app/domain/contexts/property/property/property";
import { ActivityDetailProps } from "../../../../../../../app/domain/contexts/cases/service-ticket/v1/activity-detail";
import { PhotoProps } from "../../../../../../../app/domain/contexts/cases/service-ticket/v1/photo";
import { ServiceEntityReference, ServiceProps } from "../../../../../../../app/domain/contexts/community/service/service";
import { ServiceTicketV1, ServiceTicketV1Props } from "../../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket";
import { ServiceTicketV1Repository } from "../../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket.repository";
import { MemoryBaseAdapter } from "../../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter";
import { MemoryPropArray } from "../../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-prop-array";
import { MemoryRepositoryBase } from "../../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository";
import {v4 as uuidV4} from 'uuid';

class MemoryActivityDetail extends MemoryBaseAdapter implements ActivityDetailProps {
  activityType: string;
  activityDescription: string;
  activityBy: MemberProps;
  setActivityByRef(activityBy: MemberEntityReference) : void {
    this.activityBy = activityBy['props'] as MemberProps;
  };
}

class MemoryPhoto extends MemoryBaseAdapter implements PhotoProps {
  documentId: string;
  description: string;
  getNewDocumentId(): string {
    return uuidV4();
  }
}

class MemoryServiceTicketV1 extends MemoryBaseAdapter implements ServiceTicketV1Props  {
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
  status: string;
  priority: number;
  private _activityLog: ActivityDetailProps[] = [];
  get activityLog() {
    return new MemoryPropArray(this._activityLog, MemoryActivityDetail);
  };
  private _photos: PhotoProps[] = [];
  get photos() {
    return new MemoryPropArray(this._photos, MemoryPhoto);
  };
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
  hash: string;
  lastIndexed: Date; // success
  updateIndexFailedDate: Date; // failure
}

export class MemoryServiceTicketV1Repository<
  PropType extends ServiceTicketV1Props, 
  DomainType extends ServiceTicketV1<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
    implements ServiceTicketV1Repository<PropType> 
    {

      async getNewInstance(
        title: string,
        description: string,
        community: CommunityEntityReference,
        property: PropertyEntityReference,
        requestor: MemberEntityReference
      ): Promise<ServiceTicketV1<PropType>> {
        return ServiceTicketV1.getNewInstance(new MemoryServiceTicketV1 as unknown as PropType, title, description, community, property, requestor, this.context); // [MG-TBD]
      }
      async getById(id: string): Promise<ServiceTicketV1<PropType>>{
        const serviceTicket = await this.get(id);
        return serviceTicket;
      }
      }