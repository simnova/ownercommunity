import { CommunityEntityReference, CommunityProps } from "../../../../app/domain/contexts/community/community";
import { DomainExecutionContext } from "../../../../app/domain/contexts/domain-execution-context";
import { Service, ServiceProps } from "../../../../app/domain/contexts/service-ticket/service";
import { ServiceRepository } from "../../../../app/domain/contexts/service-ticket/service.repository";
import { MemoryBaseAdapter } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter";
import { MemoryRepositoryBase } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository";

class MemoryService extends MemoryBaseAdapter implements ServiceProps  {

  community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference) : void {
    this.community = community as CommunityProps;
  };
  serviceName: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
}

export class MemoryServiceRepository<
  PropType extends ServiceProps, 
  DomainType extends Service<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
    implements ServiceRepository<PropType> 
    {
      async getNewInstance(serviceName: string, description: string, community: CommunityEntityReference): Promise<Service<PropType>> {
        return Service.getNewInstance(new MemoryService as unknown as PropType, serviceName, description, community, this.context); // [MG-TBD]
      }
      async getById(id: string): Promise<Service<PropType>>{
        const service = await this.get(id);
        return service;
      }
  }