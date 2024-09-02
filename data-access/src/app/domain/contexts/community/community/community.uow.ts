import { UnitOfWork } from '../../../../../../seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../../../../../../framework/domain/domain-execution-context';
import { Community, CommunityProps } from './community';
import { CommunityRepository } from './community.repository';

export interface CommunityUnitOfWork extends UnitOfWork<DomainExecutionContext, CommunityProps, Community<CommunityProps>, CommunityRepository<CommunityProps>> {
}
