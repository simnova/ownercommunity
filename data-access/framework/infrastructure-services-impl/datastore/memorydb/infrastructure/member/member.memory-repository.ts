import { MemberAccountProps } from '../../../../../app/domain/contexts/community/member/member-account';
import { CommunityEntityReference, CommunityProps } from '../../../../../app/domain/contexts/community/community/community';
import { MemberCustomViewProps } from '../../../../../app/domain/contexts/community/member/member-custom-view';
import { Member, MemberProps } from '../../../../../app/domain/contexts/community/member/member';
import { MemberRepository } from '../../../../../app/domain/contexts/community/member/member.repository';
import { MemberProfileProps } from '../../../../../app/domain/contexts/community/member/member-profile';
import { EndUserRoleEntityReference, EndUserRoleProps } from '../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role';
import { DomainExecutionContext } from '../../../../../../framework/domain/domain-execution-context';
import { EndUserProps } from '../../../../../app/domain/contexts/users/end-user/end-user';
import { DomainEntityProps } from '../../../../../seedwork/domain-seedwork/domain-entity';
import { MemoryBaseAdapter } from '../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter';
import { MemoryPropArray } from '../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-prop-array';
import { MemoryRepositoryBase } from '../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository';

class MemoryProfile implements MemberProfileProps {
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
class MemoryCustomView extends MemoryBaseAdapter implements DomainEntityProps {
  name: string;
  type: string;
  filters: string[];
  sortOrder: string;
  columnsToDisplay: string[];
}

class MemoryAccount extends MemoryBaseAdapter implements MemberAccountProps {
  firstName: string;
  lastName: string;
  user: EndUserProps;
  setUserRef(user: EndUserProps): void {
    this.user = user;
  }
  statusCode: string;
  createdBy: EndUserProps;
  setCreatedByRef(createdBy: EndUserProps): void {
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
  private _accounts: MemberAccountProps[] = [];
  get accounts() {
    return new MemoryPropArray(this._accounts, MemoryAccount);
  }
  role: EndUserRoleProps;
  setRoleRef(role: EndUserRoleEntityReference): void {
    this.role = role as EndUserRoleProps;
  }
  private _profile: MemberProfileProps;
  get profile() {
    if (!this._profile) {
      this._profile = new MemoryProfile();
    }
    return this._profile;
  }
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
  private _customViews: MemberCustomViewProps[] = [];
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
