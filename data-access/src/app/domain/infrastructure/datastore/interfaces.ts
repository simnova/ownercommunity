import { ServiceTicketV1UnitOfWork } from '../../contexts/cases/service-ticket/v1/service-ticket.uow';
import { CommunityUnitOfWork } from '../../contexts/community/community.uow';
import { MemberUnitOfWork } from '../../contexts/community/member.uow';
import { RoleUnitOfWork } from '../../contexts/community/role.uow';
import { PropertyUnitOfWork } from '../../contexts/property/property.uow';
import { ServiceUnitOfWork } from '../../contexts/service/service.uow';
import { UserUnitOfWork } from '../../contexts/user/user.uow';
import { ViolationTicketV1UnitOfWork } from '../../contexts/cases/violation-ticket/v1/violation-ticket.uow';

export interface DatastoreDomain {
  communityUnitOfWork: CommunityUnitOfWork;
  memberUnitOfWork: MemberUnitOfWork;
  roleUnitOfWork: RoleUnitOfWork;
  propertyUnitOfWork: PropertyUnitOfWork;
  serviceUnitOfWork: ServiceUnitOfWork;
  serviceTicketV1UnitOfWork: ServiceTicketV1UnitOfWork;
  // serviceTicketV1UnitOfWork: ServiceTicketV1UnitOfWork;
  // serviceTicketV2UnitOfWork: ServiceTicketV2UnitOfWork;
  userUnitOfWork: UserUnitOfWork;
  violationTicketV1UnitOfWork: ViolationTicketV1UnitOfWork;
  // violationTicketV1UnitOfWork: ViolationTicketV1UnitOfWork;
  // violationTicketV2UnitOfWork: ViolationTicketV2UnitOfWork;
}

export interface DatastoreDomainInitializeable {
  startup(): Promise<void>;
  shutdown(): Promise<void>;
}