import { UnitOfWork } from '../../shared/unit-of-work';
import { DomainExecutionContext } from '../context';
import { Member, MemberProps } from './member';
import { MemberRepository } from './member.repository';

export interface MemberUnitOfWork extends UnitOfWork<DomainExecutionContext, MemberProps, Member<MemberProps>, MemberRepository<MemberProps>> {
}
