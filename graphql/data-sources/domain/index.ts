import { UserUnitOfWork } from '../../../domain/infrastructure/persistence/user.uow';
import { CommunityUnitOfWork } from '../../../domain/infrastructure/persistence/community.uow';
import { MemberUnitOfWork } from '../../../domain/infrastructure/persistence/member.uow';
import { RoleUnitOfWork } from '../../../domain/infrastructure/persistence/role.uow';
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

// export const Domain = {
//   userDomainAPI: new Users({ unitOfWork: UserUnitOfWork, context: {} as any }),
//   communityDomainAPI: new Communities({ unitOfWork: CommunityUnitOfWork, context: {} as any }),
//   memberDomainAPI: new Members({ unitOfWork: MemberUnitOfWork, context: {} as any }),
//   roleDomainAPI: new Roles({ unitOfWork: RoleUnitOfWork, context: {} as any }),
//   propertyDomainAPI: new Properties({ unitOfWork: PropertyUnitOfWork, context: {} as any }),
//   serviceDomainAPI: new Services({ unitOfWork: ServiceUnitOfWork, context: {} as any }),
//   serviceTicketDomainAPI: new ServiceTickets({ unitOfWork: ServiceTicketUnitOfWork, context: {} as any }),
// };

export {
  Users as UserDomainAPI,
  UserUnitOfWork,
  Communities as CommunityDomainAPI,
  CommunityUnitOfWork,
  Members as MemberDomainAPI,
  MemberUnitOfWork,
  Roles as RoleDomainAPI,
  RoleUnitOfWork,
  Properties as PropertyDomainAPI,
  PropertyUnitOfWork,
  Services as ServiceDomainAPI,
  ServiceUnitOfWork,
  ServiceTickets as ServiceTicketDomainAPI,
  ServiceTicketUnitOfWork
}