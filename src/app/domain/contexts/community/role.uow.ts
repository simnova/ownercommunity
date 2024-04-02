import { UnitOfWork } from '../../../../../seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../domain-execution-context';
import { Role, RoleProps } from './role';
import { RoleRepository } from './role.repository';

export interface RoleUnitOfWork extends UnitOfWork<DomainExecutionContext, RoleProps, Role<RoleProps>, RoleRepository<RoleProps>> {
}
