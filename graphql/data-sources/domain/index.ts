import { UserUnitOfWork } from '../../../domain-impl-mongodb/user.uow';
import { MongoCommunityUnitOfWork } from '../../../domain-impl-mongodb/community.mongo-uow';
import { MongoMemberUnitOfWork } from '../../../domain-impl-mongodb/member.mongo-uow';
import { MongoRoleUnitOfWork } from '../../../domain-impl-mongodb/role.mongo-uow';
import { PropertyUnitOfWork } from '../../../domain-impl-mongodb/property.uow';
import { ServiceUnitOfWork } from '../../../domain-impl-mongodb/service.uow';
import { ServiceTicketUnitOfWork } from '../../../domain-impl-mongodb/service-ticket.uow';

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