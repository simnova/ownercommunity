import { Community as CommunityDO, CommunityProps } from '../domain/contexts/community/community';
import { CommunityRepository } from '../domain/contexts/community/community.repository';
import { Community } from '../infrastructure/data-sources/cosmos-db/models/community';
import { MongoRepositoryBase } from '../domain-seedwork-mongodb/mongo-repository';
import { DomainExecutionContext } from '../domain/contexts/context';
import { UserEntityReference } from '../domain/contexts/user/user';

export class MongoCommunityRepository<PropType extends CommunityProps>
  extends MongoRepositoryBase<DomainExecutionContext, Community, PropType, CommunityDO<PropType>>
  implements CommunityRepository<PropType>
{
  async getNewInstance(name: string, user: UserEntityReference): Promise<CommunityDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return CommunityDO.getNewInstance(adapter, name, user, this.context);
  }

  async getByIdWithCreatedBy(id: string): Promise<CommunityDO<PropType>> {
    const mongoCommunity = await this.model.findById(id).populate('createdBy').exec();
    return this.typeConverter.toDomain(mongoCommunity,this.context);
  }
}
