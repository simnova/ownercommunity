import { UnitOfWork } from '../../../../../../../seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../../../../../../../framework/domain/domain-execution-context';
import { StaffRole, StaffRoleProps } from './staff-role';
import { StaffRoleRepository } from './staff-role.repository';

export interface StaffRoleUnitOfWork extends UnitOfWork<DomainExecutionContext, StaffRoleProps, StaffRole<StaffRoleProps>, StaffRoleRepository<StaffRoleProps>> {
}
