import { UserUnitOfWork } from '../../../domain-impl-mongo/user.uow';
import { MongoCommunityUnitOfWork } from '../../../domain-impl-mongo/community.mongo-uow';
import { MongoMemberUnitOfWork } from '../../../domain-impl-mongo/member.mongo-uow';
import { MongoRoleUnitOfWork } from '../../../domain-impl-mongo/role.mongo-uow';
import { PropertyUnitOfWork } from '../../../domain-impl-mongo/property.uow';
import { ServiceUnitOfWork } from '../../../domain-impl-mongo/service.uow';
import { ServiceTicketUnitOfWork } from '../../../domain-impl-mongo/service-ticket.uow';

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