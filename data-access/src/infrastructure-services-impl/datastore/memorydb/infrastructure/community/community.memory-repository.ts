import { MemoryBaseAdapter } from "../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter";
import { MemoryRepositoryBase } from "../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository";
import { DomainExecutionContext } from "../../../../../app/domain/domain-execution-context";
import { Community, CommunityProps } from "../../../../../app/domain/contexts/community/community/community";
import { CommunityRepository } from "../../../../../app/domain/contexts/community/community/community.repository";
import { EndUserProps, EndUserEntityReference } from "../../../../../app/domain/contexts/users/end-user/end-user";
import { CommunityVisa } from "../../../../../app/domain/contexts/community/community.visa";
import { InfrastructureContext } from "../../../../../app/init/infrastructure-context";

export class MemoryCommunity extends MemoryBaseAdapter implements CommunityProps {
  name: string;
  domain: string;
  whiteLabelDomain: string;
  handle: string;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
  createdBy: EndUserProps;
  setCreatedByRef(user: EndUserEntityReference): void {
    this.createdBy = user
  }
} 

export class MemoryCommunityRepository<
  PropType extends CommunityProps,
  DomainType extends Community<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, CommunityVisa, DomainType, InfrastructureContext> 
    implements CommunityRepository<PropType> 
  {
  async getNewInstance(name: string, user: EndUserEntityReference): Promise<Community<PropType>> {
    return Community.getNewInstance(new MemoryCommunity as unknown as PropType, name, user, this.context);
  }

  async getByIdWithCreatedBy(id: string): Promise<Community<PropType>> {
    const community = await this.get(id);
    return community;
  }
}