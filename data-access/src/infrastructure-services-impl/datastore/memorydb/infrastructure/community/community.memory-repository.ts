import { MemoryBaseAdapter } from "../../../../../../framework/seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter";
import { MemoryRepositoryBase } from "../../../../../../framework/seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository";
import { DomainExecutionContext } from "../../../../../../framework/domain/domain-execution-context";
import { Community, CommunityProps } from "../../../../../components/domain/contexts/community/community/community";
import { CommunityRepository } from "../../../../../components/community/domain/community.repository";
import { EndUserProps, EndUserEntityReference } from "../../../../../components/domain/contexts/users/end-user/end-user";

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
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
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