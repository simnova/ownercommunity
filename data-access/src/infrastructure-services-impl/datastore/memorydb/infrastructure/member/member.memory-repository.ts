import { AccountProps } from '../../../../../app/domain/contexts/community/member/account';
import { CommunityEntityReference, CommunityProps } from '../../../../../app/domain/contexts/community/community/community';
import { CustomViewProps } from '../../../../../app/domain/contexts/community/member/custom-view';
import { Member, MemberProps } from '../../../../../app/domain/contexts/community/member/member';
import { MemberRepository } from '../../../../../app/domain/contexts/community/member/member.repository';
import { ProfileProps } from '../../../../../app/domain/contexts/community/member/profile';
import { EndUserRoleEntityReference, EndUserRoleProps } from '../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role';
import { DomainExecutionContext } from '../../../../../app/domain/domain-execution-context';
import { UserProps } from '../../../../../app/domain/contexts/user/user/user';
import { EntityProps } from '../../../../../../seedwork/domain-seedwork/entity';
import { MemoryBaseAdapter } from '../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter';
import { MemoryPropArray } from '../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-prop-array';
import { MemoryRepositoryBase } from '../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository';

class MemoryProfile implements ProfileProps {
  name: string;
  email: string;
  bio: string;
  avatarDocumentId: string;
  interests: string[];
  showInterests: boolean;
  showEmail: boolean;
  showProfile: boolean;
  showLocation: boolean;
  showProperties: boolean;
}
class MemoryCustomView extends MemoryBaseAdapter implements EntityProps {
  name: string;
  type: string;
  filters: string[];
  sortOrder: string;
  columnsToDisplay: string[];
}

class MemoryAccount extends MemoryBaseAdapter implements AccountProps {
  firstName: string;
  lastName: string;
  user: UserProps;
  setUserRef(user: UserProps): void {
    this.user = user;
  }
  statusCode: string;
  createdBy: UserProps;
  setCreatedByRef(createdBy: UserProps): void {
    this.createdBy = createdBy;
  }
}

class MemoryMember extends MemoryBaseAdapter implements MemberProps {
  memberName: string;
  cybersourceCustomerId: string;
  community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference): void {
    this.community = community as CommunityProps;
  }
  private _accounts: AccountProps[] = [];
  get accounts() {
    return new MemoryPropArray(this._accounts, MemoryAccount);
  }
  role: EndUserRoleProps;
  setRoleRef(role: EndUserRoleEntityReference): void {
    this.role = role as EndUserRoleProps;
  }
  private _profile: ProfileProps;
  get profile() {
    if (!this._profile) {
      this._profile = new MemoryProfile();
    }
    return this._profile;
  }
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
  private _customViews: CustomViewProps[] = [];
  get customViews() {
    return new MemoryPropArray(this._customViews, MemoryCustomView);
  }
}

export class MemoryMemberRepository<PropType extends MemberProps, DomainType extends Member<PropType>>
  extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType>
  implements MemberRepository<PropType>
{
  async getNewInstance(name: string, community: CommunityEntityReference): Promise<Member<PropType>> {
    return Member.getNewInstance(new MemoryMember() as unknown as PropType, name, community, this.context); // [MG-TBD]
  }
  async getById(id: string): Promise<Member<PropType>> {
    return await this.get(id);

  }
  async getAssignedToRole(roleId: string): Promise<Member<PropType>[]> {
    return (await this.getAll())?.filter((member) => member.role.id === roleId);

  }
}
