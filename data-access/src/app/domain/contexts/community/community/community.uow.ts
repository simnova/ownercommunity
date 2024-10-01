import { UnitOfWork } from '../../../../../../seedwork/domain-seedwork/unit-of-work';
import { InfrastructureContext } from '../../../../init/infrastructure-context';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { CommunityVisa } from '../community.visa';
import { Community, CommunityProps } from './community';
import { CommunityRepository } from './community.repository';

export interface CommunityUnitOfWork extends UnitOfWork<DomainExecutionContext, CommunityProps, CommunityVisa, Community<CommunityProps>, CommunityRepository<CommunityProps>, InfrastructureContext> {
}
