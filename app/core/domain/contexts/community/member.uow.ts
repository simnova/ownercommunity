import { UnitOfWork } from '../../../../../seedwork/domain-seedwork/unit-of-work';
import { DomainExecutionContext } from '../domain-execution-context';
import { Member, MemberProps } from './member';
import { MemberRepository } from './member.repository';

export interface MemberUnitOfWork extends UnitOfWork<DomainExecutionContext, MemberProps, Member<MemberProps>, MemberRepository<MemberProps>> {
}
