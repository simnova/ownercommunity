import { UnitOfWork } from '../../../../../../seedwork/domain-seedwork/unit-of-work';
import { InfrastructureContext } from '../../../../init/infrastructure-context';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { StaffUser, StaffUserProps } from './staff-user';
import { StaffUserRepository } from './staff-user.repository';
import { StaffUserVisa } from './staff-user.visa';

export interface StaffUserUnitOfWork extends UnitOfWork<DomainExecutionContext, StaffUserProps, StaffUserVisa, StaffUser<StaffUserProps>, StaffUserRepository<StaffUserProps>, InfrastructureContext> {
}
