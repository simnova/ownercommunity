import { MemoryBaseAdapter } from "../../../../../domain-impl-seedwork-datastore-memorydb/memory-base-adapter";
import { MemoryRepositoryBase } from "../../../../../domain-impl-seedwork-datastore-memorydb/memory-repository";
import { DomainExecutionContext } from "../../../../../domain/contexts/execution-context";
import { Community, CommunityProps } from "../../../../../domain/contexts/community/community";
import { CommunityRepository } from "../../../../../domain/contexts/community/community.repository";
import { UserEntityReference, UserProps } from "../../../../../domain/contexts/user/user";

export class MemoryCommunity extends MemoryBaseAdapter implements CommunityProps {
  name: string;
  domain: string;
  whiteLabelDomain: string;
  handle: string;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
  createdBy: UserProps;
  setCreatedByRef(user: UserEntityReference): void {
    this.createdBy = user
  }
} 

export class MemoryCommunityRepository<
  PropType extends CommunityProps, 
  DomainType extends Community<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
    implements CommunityRepository<PropType> 
  {
  async getNewInstance(name: string, user: UserEntityReference): Promise<Community<PropType>> {
    return Community.getNewInstance(new MemoryCommunity as unknown as PropType, name, user, this.context);
  }

  async getByIdWithCreatedBy(id: string): Promise<Community<PropType>> {
    const community = await this.get(id);
    return community;
  }
}