import { UnitOfWork } from '../../../../../../seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../../../domain-execution-context';
import { CommunityVisa } from '../community.visa';
import { Member, MemberProps } from './member';
import { MemberRepository } from './member.repository';

export interface MemberUnitOfWork extends UnitOfWork<DomainExecutionContext, MemberProps, CommunityVisa, Member<MemberProps>, MemberRepository<MemberProps>> {
}
