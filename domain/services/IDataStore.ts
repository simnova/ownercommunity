import { CommunityUnitOfWork } from '../contexts/community/community.uow';
import { MemberUnitOfWork } from '../contexts/community/member.uow';
import { RoleUnitOfWork } from '../contexts/community/role.uow';

export interface IDataStore {
  communityUnitOfWork: CommunityUnitOfWork;
  memberUnitOfWork: MemberUnitOfWork;
  roleUnitOfWork: RoleUnitOfWork;
}
