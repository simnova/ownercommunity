// community
import { CommunityDomainApplicationServiceImpl } from "./community";
import { CommunityUnitOfWork } from "../../domain/contexts/community/community.uow";
// role
import { RoleDomainApplicationServiceImpl } from "./role";
import { RoleUnitOfWork } from "../../domain/contexts/community/role.uow";
// user
import { UserDomainApplicationServiceImpl } from "./user";
import { UserUnitOfWork } from "../../domain/contexts/user/user.uow";
// service
import { ServiceDomainApplicationServiceImpl } from "./service";
import { ServiceUnitOfWork } from "../../domain/contexts/service-ticket/service.uow";
// service-ticket
import { ServiceTicketDomainApplicationServiceImpl } from "./service-ticket";
import { ServiceTicketUnitOfWork } from "../../domain/contexts/service-ticket/service-ticket.uow";
// member
import { MemberDomainApplicationServiceImpl } from "./member";
import { MemberUnitOfWork } from "../../domain/contexts/community/member.uow";
// property
import { PropertyDomainApplicationServiceImpl } from "./property";
import { PropertyUnitOfWork } from "../../domain/contexts/property/property.uow";

export {
  CommunityDomainApplicationServiceImpl as CommunityDomainApiImpl,
  CommunityUnitOfWork,
  RoleDomainApplicationServiceImpl as RoleDomainApiImpl,
  RoleUnitOfWork,
  UserDomainApplicationServiceImpl as UserDomainApiImpl,
  UserUnitOfWork,
  ServiceDomainApplicationServiceImpl as ServiceDomainApiImpl,
  ServiceUnitOfWork,
  ServiceTicketDomainApplicationServiceImpl as ServiceTicketDomainApiImpl,
  ServiceTicketUnitOfWork,
  MemberDomainApplicationServiceImpl as MemberDomainApiImpl,
  MemberUnitOfWork,
  PropertyDomainApplicationServiceImpl as PropertyDomainApiImpl,
  PropertyUnitOfWork,
}