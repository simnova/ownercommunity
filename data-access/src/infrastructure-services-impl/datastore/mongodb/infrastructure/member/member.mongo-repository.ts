import { Member as MemberDO, MemberProps } from '../../../../../app/domain/contexts/community/member/member';
import { MemberRepository } from '../../../../../app/domain/contexts/community/member/member.repository';
import { Member } from '../../models/member';
import { MongoRepositoryBase } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../../app/domain/domain-execution-context';
import { CommunityEntityReference } from '../../../../../app/domain/contexts/community/community/community';
import { CommunityVisa } from '../../../../../app/domain/contexts/community/community.visa';
import { InfrastructureContext } from '../../../../../app/init/infrastructure-context';

export class MongoMemberRepository<PropType extends MemberProps>
  extends MongoRepositoryBase<DomainExecutionContext, Member, PropType, CommunityVisa, MemberDO<PropType>, InfrastructureContext>
  implements MemberRepository<PropType>
{
  async getNewInstance(name: string, community: CommunityEntityReference): Promise<MemberDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model(), this.infrastructureContext);
    return MemberDO.getNewInstance(adapter, name, community, this.domainExecutionContext);
  }

  async getById(id: string): Promise<MemberDO<PropType>> {
    let member = await this.model.findById(id).populate('community').exec();
    return this.typeConverter.toDomain(member, this.infrastructureContext, this.domainExecutionContext);
  }
  async getAssignedToRole(roleId: string): Promise<MemberDO<PropType>[]> {
    let members = await this.model.find({ role: roleId }).exec();
    return members.map((member) => this.typeConverter.toDomain(member, this.infrastructureContext, this.domainExecutionContext));
  }

  async getAll(): Promise<MemberDO<PropType>[]> {
    let members = await this.model.find().populate('community').exec();
    return members.map((member) => this.typeConverter.toDomain(member, this.infrastructureContext, this.domainExecutionContext));
  }
}
