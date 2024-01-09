import { Member as MemberDO, MemberProps } from '../../contexts/community/member';
import { MemberRepository } from '../../contexts/community/member.repository';
import { Member } from '../../../infrastructure/data-sources/cosmos-db/models/member';
import { MongoRepositoryBase } from '../core/mongo/mongo-repository';
import { DomainExecutionContext } from '../../contexts/context';
import { CommunityEntityReference } from '../../contexts/community/community';

export class MongoMemberRepository<PropType extends MemberProps>
  extends MongoRepositoryBase<DomainExecutionContext, Member, PropType, MemberDO<PropType>>
  implements MemberRepository<PropType>
{
  async getNewInstance(name: string, community: CommunityEntityReference): Promise<MemberDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return MemberDO.getNewInstance(adapter, name, community, this.context);
  }

  async getById(id: string): Promise<MemberDO<PropType>> {
    let member = await this.model.findById(id).populate('community').exec();
    return this.typeConverter.toDomain(member, this.context);
  }
  async getAssignedToRole(roleId: string): Promise<MemberDO<PropType>[]> {
    let members = await this.model.find({ role: roleId }).exec();
    return members.map((member) => this.typeConverter.toDomain(member, this.context));
  }
}
