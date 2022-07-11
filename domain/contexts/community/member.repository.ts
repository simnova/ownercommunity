import { Member, MemberProps } from './member';
import { Repository } from '../../shared/repository';

export interface MemberRepository<props extends MemberProps> extends Repository<Member<props>> {
  
}