import { UserUnitOfWork } from '../../../domain/infrastructure/persistance/repositories';
import { CommunityUnitOfWork } from '../../../domain/infrastructure/persistance/repositories';
import { MemberUnitOfWork } from '../../../domain/infrastructure/persistance/repositories';
import { RoleUnitOfWork } from '../../../domain/infrastructure/persistance/repositories';

import { Users } from './users';
import { Communities } from './communities';
import { Members } from './members';
import { Roles } from './roles';

export const Domain  = {
  userDomainAPI: new Users(UserUnitOfWork),
  communityDomainAPI: new Communities(CommunityUnitOfWork),
  memberDomainAPI: new Members(MemberUnitOfWork),
  roleDomainAPI: new Roles(RoleUnitOfWork),
}

export type DomainType = typeof Domain;