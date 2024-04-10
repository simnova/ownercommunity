import { Member, MemberProps } from './member';
import { Repository } from '../../../../../seedwork/domain-seedwork/repository';
import { CommunityEntityReference } from './community';

export interface MemberRepository<props extends MemberProps> extends Repository<Member<props>> {
  getNewInstance(name: string, community: CommunityEntityReference): Promise<Member<props>>;
  getById(id: string): Promise<Member<props>>;
  getAssignedToRole(roleId: string): Promise<Member<props>[]>;
  getAll(): Promise<Member<props>[]>
}