import { UnitOfWork } from '../../../domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../execution-context';
import { Member, MemberProps } from './member';
import { MemberRepository } from './member.repository';

export interface MemberUnitOfWork extends UnitOfWork<DomainExecutionContext, MemberProps, Member<MemberProps>, MemberRepository<MemberProps>> {
}
