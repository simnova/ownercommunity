import { UserUnitOfWork } from '../../../domain/infrastructure/persistence/user.uow';
import { CommunityUnitOfWork } from '../../../domain/infrastructure/persistence/community.uow';
import { MemberUnitOfWork } from '../../../domain/infrastructure/persistence/member.uow';
import { RoleUnitOfWork } from '../../../domain/infrastructure/persistence/role.uow';
import { PropertyUnitOfWork } from '../../../domain/infrastructure/persistence/property.uow';
import { ServiceTicketUnitOfWork } from '../../../domain/infrastructure/persistence/service-ticket.uow';

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