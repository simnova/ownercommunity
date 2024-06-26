// community
import { CommunityDomainApplicationService } from "./community.interface";
import { CommunityUnitOfWork } from "../../domain/contexts/community/community.uow";
// role
import { RoleDomainApplicationService } from "./role.interface";
import { RoleUnitOfWork } from "../../domain/contexts/community/role.uow";
// user
import { UserDomainApplicationService } from "./user.interface";
import { UserUnitOfWork } from "../../domain/contexts/user/user.uow";
// service
import { ServiceDomainApplicationService } from "./service.interface";
import { ServiceUnitOfWork } from "../../domain/contexts/service-ticket/service.uow";
// service-ticket
import { ServiceTicketDomainApplicationService } from "./service-ticket.interface";
import { ServiceTicketUnitOfWork } from "../../domain/contexts/service-ticket/service-ticket.uow";
// member
import { MemberDomainApplicationService } from "./member.interface";
import { MemberUnitOfWork } from "../../domain/contexts/community/member.uow";
// property
import { PropertyDomainApplicationService } from "./property.interface";
import { PropertyUnitOfWork } from "../../domain/contexts/property/property.uow";

export {
  CommunityDomainApplicationService as CommunityDomainApi,
  CommunityUnitOfWork,
  RoleDomainApplicationService as RoleDomainApi,
  RoleUnitOfWork,
  UserDomainApplicationService as UserDomainApi,
  UserUnitOfWork,
  ServiceDomainApplicationService as ServiceDomainApi,
  ServiceUnitOfWork,
  ServiceTicketDomainApplicationService as ServiceTicketDomainApi,
  ServiceTicketUnitOfWork,
  MemberDomainApplicationService as MemberDomainApi,
  MemberUnitOfWork,
  PropertyDomainApplicationService as PropertyDomainApi,
  PropertyUnitOfWork,
}