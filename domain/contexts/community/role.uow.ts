import { UnitOfWork } from '../../../domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../execution-context';
import { Role, RoleProps } from './role';
import { RoleRepository } from './role.repository';

export interface RoleUnitOfWork extends UnitOfWork<DomainExecutionContext, RoleProps, Role<RoleProps>, RoleRepository<RoleProps>> {
}
