import { Service as ServiceDO, ServiceProps } from '../../../../app/domain/contexts/service-ticket/service';
import { ServiceRepository } from '../../../../app/domain/contexts/service-ticket/service.repository';
import { Service } from '../models/service';
import { MongoRepositoryBase } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../app/domain/contexts/domain-execution-context';
import { CommunityEntityReference } from '../../../../app/domain/contexts/community/community';

export class MongoServiceRepository<PropType extends ServiceProps>
  extends MongoRepositoryBase<DomainExecutionContext, Service, PropType, ServiceDO<PropType>>
  implements ServiceRepository<PropType>
{
  async getNewInstance(serviceName: string, description: string, community: CommunityEntityReference): Promise<ServiceDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return ServiceDO.getNewInstance(adapter, serviceName, description, community, this.context);
  }

  async getById(id: string): Promise<ServiceDO<PropType>> {
    let member = await this.model.findById(id).populate(['community']).exec();
    return this.typeConverter.toDomain(member, this.context);
  }
}
