import { Community as CommunityDO, CommunityProps } from '../../../../app/domain/contexts/community/community';
import { CommunityRepository } from '../../../../app/domain/contexts/community/community.repository';
import { Community } from '../models/community';
import { MongoRepositoryBase } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../app/domain/contexts/domain-execution-context';
import { UserEntityReference } from '../../../../app/domain/contexts/user/user';

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
