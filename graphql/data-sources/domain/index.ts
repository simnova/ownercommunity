import { UserUnitOfWork } from '../../../domain/infrastructure/persistance/repositories';
import { CommunityUnitOfWork } from '../../../domain/infrastructure/persistance/repositories';
import { MemberUnitOfWork } from '../../../domain/infrastructure/persistance/repositories';

import { Users } from './users';
import { Communities } from './communities';
import { Members } from './members';

export const Domain  = {
  userDomainAPI: new Users(UserUnitOfWork),
  communityDomainAPI: new Communities(CommunityUnitOfWork),
  memberDomainAPI: new Members(MemberUnitOfWork)
}

export type DomainType = typeof Domain;