import { MongoUserUnitOfWork } from '../../../domain-impl/services/datastore/mongodb/infrastructure/user.uow';
import { MongoCommunityUnitOfWork } from '../../../domain-impl/services/datastore/mongodb/infrastructure/community.mongo-uow';
import { MongoMemberUnitOfWork } from '../../../domain-impl/services/datastore/mongodb/infrastructure/member.mongo-uow';
import { MongoRoleUnitOfWork } from '../../../domain-impl/services/datastore/mongodb/infrastructure/role.mongo-uow';
import { MongoPropertyUnitOfWork } from '../../../domain-impl/services/datastore/mongodb/infrastructure/property.mongo-uow';
import { MongoServiceUnitOfWork } from '../../../domain-impl/services/datastore/mongodb/infrastructure/service.uow';
import { MongoServiceTicketUnitOfWork } from '../../../domain-impl/services/datastore/mongodb/infrastructure/service-ticket.uow';

import { Users } from './users';
import { Communities } from './communities';
import { Members } from './members';
import { Roles } from './roles';
import { Properties } from './properties';
import { Services } from './services';
import { ServiceTickets } from './service-tickets';

export {
  Users as UserDomainAPI,
  MongoUserUnitOfWork as UserUnitOfWork,
  Communities as CommunityDomainAPI,
  MongoCommunityUnitOfWork as CommunityUnitOfWork,
  Members as MemberDomainAPI,
  MongoMemberUnitOfWork as MemberUnitOfWork,
  Roles as RoleDomainAPI,
  MongoRoleUnitOfWork as RoleUnitOfWork,
  Properties as PropertyDomainAPI,
  MongoPropertyUnitOfWork as PropertyUnitOfWork,
  Services as ServiceDomainAPI,
  MongoServiceUnitOfWork as ServiceUnitOfWork,
  ServiceTickets as ServiceTicketDomainAPI,
  MongoServiceTicketUnitOfWork as ServiceTicketUnitOfWork
}