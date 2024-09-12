import { UnitOfWork } from '../../../../../../../seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../../../../domain-execution-context';
import { CommunityVisa } from '../../community.visa';
import { StaffRole, StaffRoleProps } from './staff-role';
import { StaffRoleRepository } from './staff-role.repository';

export interface StaffRoleUnitOfWork extends UnitOfWork<DomainExecutionContext, StaffRoleProps, CommunityVisa, StaffRole<StaffRoleProps>, StaffRoleRepository<StaffRoleProps>> {
}
