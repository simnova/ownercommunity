import { ServiceTicketUnitOfWork } from '../../contexts/service-ticket/service-ticket.uow';
import { CommunityUnitOfWork } from '../../contexts/community/community.uow';
import { MemberUnitOfWork } from '../../contexts/community/member.uow';
import { RoleUnitOfWork } from '../../contexts/community/role.uow';
import { PropertyUnitOfWork } from '../../contexts/property/property.uow';
import { ServiceUnitOfWork } from '../../contexts/service-ticket/service.uow';
import { UserUnitOfWork } from '../../contexts/user/user.uow';

export interface DatastoreDomain {
  communityUnitOfWork: CommunityUnitOfWork;
  memberUnitOfWork: MemberUnitOfWork;
  roleUnitOfWork: RoleUnitOfWork;
  propertyUnitOfWork: PropertyUnitOfWork;
  serviceUnitOfWork: ServiceUnitOfWork;
  serviceTicketUnitOfWork: ServiceTicketUnitOfWork;
  userUnitOfWork: UserUnitOfWork;
}

export interface DatastoreDomainInitializeable {
  startup(): Promise<void>;
  shutdown(): Promise<void>;
}