import { Community, CommunityProps } from "../../../../../../domain/contexts/community/community";
import { CommunityRepository } from "../../../../../../domain/contexts/community/community.repository";
import { DomainExecutionContext } from "../../../../../../domain/contexts/context";
import { UserEntityReference } from "../../../../../../domain/contexts/user/user";
import { MemoryRepositoryBase } from "../core/memory-store/memory-repository";


class MemoryCommunity implements CommunityProps {
  id: string;
  name: string;
  domain: string;
  whiteLabelDomain: string;
  handle: string;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
  createdBy: UserEntityReference;
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
    return Community.getNewInstance(new MemoryCommunity as PropType, name, user, this.context);
  }
}