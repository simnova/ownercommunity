import { AccountProps } from "../../../../../../domain/contexts/community/account";
import { CommunityEntityReference, CommunityProps } from "../../../../../../domain/contexts/community/community";
import { CustomViewProps } from "../../../../../../domain/contexts/community/custom-view";
import { Member, MemberProps } from "../../../../../../domain/contexts/community/member";
import { MemberRepository } from "../../../../../../domain/contexts/community/member.repository";
import { ProfileProps } from "../../../../../../domain/contexts/community/profile";
import { RoleEntityReference, RoleProps } from "../../../../../../domain/contexts/community/role";
import { DomainExecutionContext } from "../../../../../../domain/contexts/context";
import { UserProps } from "../../../../../../domain/contexts/user/user";
import { EntityProps } from "../../../../../../domain/shared/entity";
import { PropArray } from "../../../../../../domain/shared/prop-array";
import { MemoryPropArray } from "../core/memory-store/memory-prop-array";
import { MemoryRepositoryBase } from "../core/memory-store/memory-repository";
import { MemoryCommunity } from "./community.memory-repository";

class MemoryCustomView implements EntityProps {
  id: string;
  name: string;
  type: string;
  filters: string[];
  sortOrder: string;
  columnsToDisplay: string[];
}

class MemoryAccount implements AccountProps {
  id: string;
  firstName: string;
  lastName: string;
  user: UserProps;
  setUserRef(user: UserProps): void { this.user = user; };
  statusCode: string;
  createdBy: UserProps;
  setCreatedByRef(createdBy: UserProps): void { this.createdBy = createdBy; };
}

class MemoryMember implements MemberProps {
  private _accounts: AccountProps[] = [];
  private _customViews: CustomViewProps[] = [];

  id: string;
  memberName: string;
  community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference) : void {
    this.community = community['props'] as CommunityProps;
  };
  get accounts() {
    return new MemoryPropArray(this._accounts, MemoryAccount);
  }
  role: RoleProps;
  setRoleRef(role: RoleEntityReference): void {
    this.role = role['props'] as RoleProps;
  }
  profile: ProfileProps;
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
  get customViews() {
    return new MemoryPropArray(this._customViews, MemoryCustomView);
  }
} 

export class MemoryMemberRepository<
  PropType extends MemberProps, 
  DomainType extends Member<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
    implements MemberRepository<PropType> 
    {

      async getNewInstance(name: string, community: CommunityEntityReference): Promise<Member<PropType>> {
        return Member.getNewInstance(new MemoryMember as unknown as PropType, name, community, this.context); // [MG-TBD]
      }
      async getById(id: string): Promise<Member<PropType>>{
        const member = await this.get(id);
        return member;
      }
      async getAssignedToRole(roleId: string): Promise<Member<PropType>[]>{
        const members = (await this.getAll())?.filter((member) => member.role.id === roleId);
        return members;
      }
  }
