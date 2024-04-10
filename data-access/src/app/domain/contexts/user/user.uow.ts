import { UnitOfWork } from '../../../../../seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../domain-execution-context';
import { User, UserProps } from './user';
import { UserRepository } from './user.repository';

export interface UserUnitOfWork extends UnitOfWork<DomainExecutionContext, UserProps, User<UserProps>, UserRepository<UserProps>> {
}
