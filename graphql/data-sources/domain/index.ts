import { UserUnitOfWork } from '../../../domain/infrastructure/persistence/user.uow';
import { MongoCommunityUnitOfWork } from '../../../domain/infrastructure/persistence/community.mongo-uow';
import { MongoMemberUnitOfWork } from '../../../domain/infrastructure/persistence/member.mongo-uow';
import { MongoRoleUnitOfWork } from '../../../domain/infrastructure/persistence/role.mongo-uow';
import { PropertyUnitOfWork } from '../../../domain/infrastructure/persistence/property.uow';
import { ServiceUnitOfWork } from '../../../domain/infrastructure/persistence/service.uow';
import { ServiceTicketUnitOfWork } from '../../../domain/infrastructure/persistence/service-ticket.uow';

import { Users } from './users';
import { Communities } from './communities';
import { Members } from './members';
import { Roles } from './roles';
import { Properties } from './properties';
import { Services } from './services';
import { ServiceTickets } from './service-tickets';

export {
  Users as UserDomainAPI,
  UserUnitOfWork,
  Communities as CommunityDomainAPI,
  MongoCommunityUnitOfWork as CommunityUnitOfWork,
  Members as MemberDomainAPI,
  MongoMemberUnitOfWork as MemberUnitOfWork,
  Roles as RoleDomainAPI,
  MongoRoleUnitOfWork as RoleUnitOfWork,
  Properties as PropertyDomainAPI,
  PropertyUnitOfWork,
  Services as ServiceDomainAPI,
  ServiceUnitOfWork,
  ServiceTickets as ServiceTicketDomainAPI,
  ServiceTicketUnitOfWork
}