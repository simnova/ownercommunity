import { Community as CommunityDO, CommunityProps } from '../../../../../app/domain/contexts/community/community/community';
import { CommunityRepository } from '../../../../../app/domain/contexts/community/community/community.repository';
import { Community } from '../../models/community';
import { MongoRepositoryBase } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../../app/domain/domain-execution-context';
import { EndUserEntityReference } from '../../../../../app/domain/contexts/users/end-user/end-user';
import { CommunityVisa } from '../../../../../app/domain/contexts/community/community.visa';
import { InfrastructureContext } from '../../../../../app/init/infrastructure-context';

export class MongoCommunityRepository<PropType extends CommunityProps>
  extends MongoRepositoryBase<DomainExecutionContext, Community, PropType, CommunityVisa, CommunityDO<PropType>, InfrastructureContext>
  implements CommunityRepository<PropType>
{
  async getNewInstance(name: string, user: EndUserEntityReference): Promise<CommunityDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model(), this.infrastructureContext);
    return CommunityDO.getNewInstance(adapter, name, user, this.domainExecutionContext);
  }

  async getByIdWithCreatedBy(id: string): Promise<CommunityDO<PropType>> {
    const mongoCommunity = await this.model.findById(id).populate('createdBy').exec();
    return this.typeConverter.toDomain(mongoCommunity,this.infrastructureContext, this.domainExecutionContext);
  }
}
