import { UnitOfWork } from '../../../../../../framework/seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../../../../../../framework/domain/domain-execution-context';
import { EndUser, EndUserProps } from './end-user';
import { EndUserRepository } from './end-user.repository';

export interface EndUserUnitOfWork extends UnitOfWork<DomainExecutionContext, EndUserProps, EndUser<EndUserProps>, EndUserRepository<EndUserProps>> {
}
