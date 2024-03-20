import { ServiceTicketUnitOfWork } from '../../contexts/service-ticket/service-ticket.uow';
import { CommunityUnitOfWork } from '../../contexts/community/community.uow';
import { MemberUnitOfWork } from '../../contexts/community/member.uow';
import { RoleUnitOfWork } from '../../contexts/community/role.uow';
import { PropertyUnitOfWork } from '../../contexts/property/property.uow';
import { ServiceUnitOfWork } from '../../contexts/service-ticket/service.uow';

export interface DataStoreDomain {
  communityUnitOfWork: CommunityUnitOfWork;
  memberUnitOfWork: MemberUnitOfWork;
  roleUnitOfWork: RoleUnitOfWork;
  // [MG-TBD] - optional params are for bdd wip testing, make following required when done
  propertyUnitOfWork: PropertyUnitOfWork;
  serviceTicketUnitOfWork?: ServiceTicketUnitOfWork;
  serviceUnitOfWork?: ServiceUnitOfWork;
}
