import { UnitOfWork } from '../../../../../../seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { StaffUser, StaffUserProps } from './staff-user';
import { StaffUserRepository } from './staff-user.repository';

export interface StaffUserUnitOfWork extends UnitOfWork<DomainExecutionContext, StaffUserProps, StaffUser<StaffUserProps>, StaffUserRepository<StaffUserProps>> {
}
