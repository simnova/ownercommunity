import { ServiceTicketV1UnitOfWork } from '../../src/app/domain/contexts/cases/service-ticket/v1/service-ticket.uow';
import { CommunityUnitOfWork } from '../../src/app/community/domain/community.uow';
import { MemberUnitOfWork } from '../../src/app/domain/contexts/community/member/member.uow';
import { EndUserRoleUnitOfWork } from '../../src/app/domain/contexts/community/roles/end-user-role/end-user-role.uow';
import { StaffRoleUnitOfWork } from '../../src/app/domain/contexts/community/roles/staff-role/staff-role.uow';
import { PropertyUnitOfWork } from '../../src/app/domain/contexts/property/property/property.uow';
import { ServiceUnitOfWork } from '../../src/app/domain/contexts/community/service/service.uow';
import { EndUserUnitOfWork } from '../../src/app/domain/contexts/users/end-user/end-user.uow';
import { StaffUserUnitOfWork } from '../../src/app/domain/contexts/users/staff-user/staff-user.uow';
import { ViolationTicketV1UnitOfWork } from '../../src/app/domain/contexts/cases/violation-ticket/v1/violation-ticket.uow';

export interface DomainBase {
  communityUnitOfWork: CommunityUnitOfWork;
  memberUnitOfWork: MemberUnitOfWork;
  endUserRoleUnitOfWork: EndUserRoleUnitOfWork;
  staffRoleUnitOfWork: StaffRoleUnitOfWork;
  propertyUnitOfWork: PropertyUnitOfWork;
  serviceUnitOfWork: ServiceUnitOfWork;
  endUserUnitOfWork: EndUserUnitOfWork;
  staffUserUnitOfWork: StaffUserUnitOfWork;
  serviceTicketV1UnitOfWork: ServiceTicketV1UnitOfWork;
  violationTicketV1UnitOfWork: ViolationTicketV1UnitOfWork;
}

export interface DomainInitializeable {
  startup(): Promise<void>;
  shutdown(): Promise<void>;
}

export interface DomainInfrastructureService extends DomainBase, DomainInitializeable {
}