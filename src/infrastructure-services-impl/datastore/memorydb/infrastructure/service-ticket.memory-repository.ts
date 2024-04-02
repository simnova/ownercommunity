import { CommunityEntityReference, CommunityProps } from "../../../../app/domain/contexts/community/community";
import { MemberEntityReference, MemberProps } from "../../../../app/domain/contexts/community/member";
import { DomainExecutionContext } from "../../../../app/domain/contexts/domain-execution-context";
import { PropertyEntityReference, PropertyProps } from "../../../../app/domain/contexts/property/property";
import { ActivityDetailProps } from "../../../../app/domain/contexts/service-ticket/activity-detail";
import { PhotoProps } from "../../../../app/domain/contexts/service-ticket/photo";
import { ServiceEntityReference, ServiceProps } from "../../../../app/domain/contexts/service-ticket/service";
import { ServiceTicket, ServiceTicketProps } from "../../../../app/domain/contexts/service-ticket/service-ticket";
import { ServiceTicketRepository } from "../../../../app/domain/contexts/service-ticket/service-ticket.repository";
import { MemoryBaseAdapter } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter";
import { MemoryPropArray } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-prop-array";
import { MemoryRepositoryBase } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository";
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

class MemoryServiceTicket extends MemoryBaseAdapter implements ServiceTicketProps  {
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

export class MemoryServiceTicketRepository<
  PropType extends ServiceTicketProps, 
  DomainType extends ServiceTicket<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
    implements ServiceTicketRepository<PropType> 
    {

      async getNewInstance(
        title: string,
        description: string,
        community: CommunityEntityReference,
        property: PropertyEntityReference,
        requestor: MemberEntityReference
      ): Promise<ServiceTicket<PropType>> {
        return ServiceTicket.getNewInstance(new MemoryServiceTicket as unknown as PropType, title, description, community, property, requestor, this.context); // [MG-TBD]
      }
      async getById(id: string): Promise<ServiceTicket<PropType>>{
        const serviceTicket = await this.get(id);
        return serviceTicket;
      }
  }