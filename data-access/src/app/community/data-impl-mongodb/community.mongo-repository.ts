import { Community as CommunityDO, CommunityProps } from '../../../../../app/domain/contexts/community/community/community';
import { CommunityRepository } from '../domain/community.repository';
import { Community } from '../../../infrastructure-services-impl/datastore/mongodb/models/community';
import { MongoRepositoryBase } from '../../../../framework/seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../framework/domain/domain-execution-context';
import { EndUserEntityReference } from '../../domain/contexts/users/end-user/end-user';

export class MongoCommunityRepository<PropType extends CommunityProps>
  extends MongoRepositoryBase<DomainExecutionContext, Community, PropType, CommunityDO<PropType>>
  implements CommunityRepository<PropType>
{
  async getNewInstance(name: string, user: EndUserEntityReference): Promise<CommunityDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return CommunityDO.getNewInstance(adapter, name, user, this.context);
  }

  async getByIdWithCreatedBy(id: string): Promise<CommunityDO<PropType>> {
    const mongoCommunity = await this.model.findById(id).populate('createdBy').exec();
    return this.typeConverter.toDomain(mongoCommunity,this.context);
  }
}
