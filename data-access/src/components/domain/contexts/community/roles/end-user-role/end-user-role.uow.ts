import { UnitOfWork } from '../../../../../../../framework/seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../../../../../../../framework/domain/domain-execution-context';
import { EndUserRole, EndUserRoleProps } from './end-user-role';
import { EndUserRoleRepository } from './end-user-role.repository';

export interface EndUserRoleUnitOfWork extends UnitOfWork<DomainExecutionContext, EndUserRoleProps, EndUserRole<EndUserRoleProps>, EndUserRoleRepository<EndUserRoleProps>> {
}
