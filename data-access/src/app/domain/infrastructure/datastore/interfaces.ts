import { ServiceTicketV1UnitOfWork } from '../../contexts/cases/service-ticket/v1/service-ticket.uow';
import { CommunityUnitOfWork } from '../../contexts/community/community/community.uow';
import { MemberUnitOfWork } from '../../contexts/community/member/member.uow';
import { EndUserRoleUnitOfWork } from '../../contexts/community/roles/end-user-role/end-user-role.uow';
import { StaffRoleUnitOfWork } from '../../contexts/community/roles/staff-role/staff-role.uow';
import { PropertyUnitOfWork } from '../../contexts/property/property/property.uow';
import { ServiceUnitOfWork } from '../../contexts/community/service/service.uow';
import { UserUnitOfWork } from '../../contexts/user/user/user.uow';
import { ViolationTicketV1UnitOfWork } from '../../contexts/cases/violation-ticket/v1/violation-ticket.uow';

export interface DatastoreDomain {
  communityUnitOfWork: CommunityUnitOfWork;
  memberUnitOfWork: MemberUnitOfWork;
  endUserRoleUnitOfWork: EndUserRoleUnitOfWork;
  staffRoleUnitOfWork: StaffRoleUnitOfWork;
  propertyUnitOfWork: PropertyUnitOfWork;
  serviceUnitOfWork: ServiceUnitOfWork;
  userUnitOfWork: UserUnitOfWork;
  serviceTicketV1UnitOfWork: ServiceTicketV1UnitOfWork;
  violationTicketV1UnitOfWork: ViolationTicketV1UnitOfWork;
}

export interface DatastoreDomainInitializeable {
  startup(): Promise<void>;
  shutdown(): Promise<void>;
}