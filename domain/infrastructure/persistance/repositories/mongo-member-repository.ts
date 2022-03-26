import { Member as MemberDO, MemberProps } from '../../../../domain/contexts/community/member';
import { MemberRepository } from '../../../contexts/community/member-repository';
import { Member, MemberModel }from '../../../../infrastructure/data-sources/cosmos-db/models/member';
import { MongoRepositoryBase } from '../mongo-repository';
import { TypeConverter } from '../../../shared/type-converter';
import { ClientSession } from 'mongoose';
import { EventBus } from '../../../shared/event-bus';
import { DomainExecutionContext } from '../../../contexts/context';
import { CommunityEntityReference } from '../../../contexts/community/community';

export class MongoMemberRepository<PropType extends MemberProps> extends MongoRepositoryBase<DomainExecutionContext, Member,PropType,MemberDO<PropType>> implements MemberRepository<PropType> {
  constructor(
    eventBus: EventBus,
    modelType: typeof MemberModel, 
    typeConverter: TypeConverter<Member, MemberDO<PropType>,PropType, DomainExecutionContext>,
    session: ClientSession,
    context: DomainExecutionContext
  ) {
    super(eventBus,modelType,typeConverter,session,context);
  }

  async getNewInstance(name:string, community:CommunityEntityReference): Promise<MemberDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return MemberDO.getNewInstance(adapter, name, community, this.context);
  }

  async getById(id: string): Promise<MemberDO<PropType>> {
    let member = await this.model.findOne({ _id: id }).exec();
    return this.typeConverter.toDomain(member, this.context);
  }
  
}