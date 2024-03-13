import { UnitOfWork } from '../../shared/unit-of-work';
import { DomainExecutionContext } from '../context';
import { Community, CommunityProps } from './community';
import { CommunityRepository } from './community.repository';

export interface CommunityUnitOfWork extends UnitOfWork<DomainExecutionContext, CommunityProps, Community<CommunityProps>, CommunityRepository<CommunityProps>> {
}
