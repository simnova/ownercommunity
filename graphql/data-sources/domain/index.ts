import { UserUnitOfWork } from '../../../domain/infrastructure/persistance/repositories';
import { CommunityUnitOfWork } from '../../../domain/infrastructure/persistance/repositories';
import { MemberUnitOfWork } from '../../../domain/infrastructure/persistance/repositories';
import { RoleUnitOfWork } from '../../../domain/infrastructure/persistance/repositories';
import { PropertyUnitOfWork } from '../../../domain/infrastructure/persistance/repositories';
import { ServiceTicketUnitOfWork } from '../../../domain/infrastructure/persistance/repositories';

import { Users } from './users';
import { Communities } from './communities';
import { Members } from './members';
import { Roles } from './roles';
import { Properties } from './properties';
import { ServiceTickets } from './service-tickets';

export const Domain  = {
  userDomainAPI: new Users(UserUnitOfWork),
  communityDomainAPI: new Communities(CommunityUnitOfWork),
  memberDomainAPI: new Members(MemberUnitOfWork),
  roleDomainAPI: new Roles(RoleUnitOfWork),
  propertyDomainAPI: new Properties(PropertyUnitOfWork),
  serviceTicketDomainAPI: new ServiceTickets(ServiceTicketUnitOfWork)
}