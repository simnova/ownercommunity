import { UnitOfWork } from '../../../../../../seedwork/domain-seedwork/unit-of-work';
import { InfrastructureContext } from '../../../../init/infrastructure-context';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { EndUser, EndUserProps } from './end-user';
import { EndUserRepository } from './end-user.repository';
import { EndUserVisa } from './end-user.visa';

export interface EndUserUnitOfWork extends UnitOfWork<DomainExecutionContext, EndUserProps, EndUserVisa, EndUser<EndUserProps>, EndUserRepository<EndUserProps>, InfrastructureContext> {
}
