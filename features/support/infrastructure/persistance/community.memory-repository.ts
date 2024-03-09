import { Community, CommunityProps } from "../../../../domain/contexts/community/community";
import { CommunityRepository } from "../../../../domain/contexts/community/community.repository";
import { DomainExecutionContext } from "../../../../domain/contexts/context";
import { UserEntityReference } from "../../../../domain/contexts/user/user";
import { MemoryRepositoryBase } from "../core/memory-store/memory-repository";

export class MemoryCommunityRepository<
  PropType extends CommunityProps, 
  DomainType extends Community<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
    implements CommunityRepository<PropType> 
  {
  async getNewInstance(name: string, user: UserEntityReference): Promise<Community<PropType>> {
    return Community.getNewInstance({} as PropType, name, user, this.context);
  }
}