import { AccountProps } from "../../../../../../domain/contexts/community/account";
import { Community, CommunityEntityReference, CommunityProps } from "../../../../../../domain/contexts/community/community";
import { CommunityRepository } from "../../../../../../domain/contexts/community/community.repository";
import { MemberProps } from "../../../../../../domain/contexts/community/member";
import { DomainExecutionContext } from "../../../../../../domain/contexts/context";
import { UserEntityReference } from "../../../../../../domain/contexts/user/user";
import { PropArray } from "../../../../../../domain/shared/prop-array";
import { MemoryRepositoryBase } from "../core/memory-store/memory-repository";
import { MemoryCommunity } from "./community.memory-repository";


class MemoryMember implements MemberProps {
  id: string;
  memberName: string;
  community: MemoryCommunity;
  setCommunityRef(community: MemoryCommunity) : void {
    this.community = community;
  };
  profile: any;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
  accounts: PropArray<AccountProps>;
  role: any;
  setRoleRef(role: any): void {
    this.role = role;
  }
  customViews: PropArray<any>;
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

  async getByIdWithCreatedBy(id: string): Promise<Community<PropType>> {
    const community = await this.get(id);
    return community;
  }
}