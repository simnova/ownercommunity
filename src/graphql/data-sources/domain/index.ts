import { MongoUserUnitOfWork } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/user.uow';
import { MongoCommunityUnitOfWork } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/community.mongo-uow';
import { MongoMemberUnitOfWork } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/member.mongo-uow';
import { MongoRoleUnitOfWork } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/role.mongo-uow';
import { MongoPropertyUnitOfWork } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/property.mongo-uow';
import { MongoServiceUnitOfWork } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/service.uow';
import { MongoServiceTicketUnitOfWork } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/service-ticket.uow';

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