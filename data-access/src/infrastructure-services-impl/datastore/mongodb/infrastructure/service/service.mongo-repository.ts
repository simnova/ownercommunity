import { Service as ServiceDO, ServiceProps } from '../../../../../app/domain/contexts/community/service/service';
import { ServiceRepository } from '../../../../../app/domain/contexts/community/service/service.repository';
import { Service } from '../../models/service';
import { MongoRepositoryBase } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../../app/domain/domain-execution-context';
import { CommunityEntityReference } from '../../../../../app/domain/contexts/community/community/community';
import { ServiceVisa } from '../../../../../app/domain/contexts/community/service/service.visa';
import { InfrastructureContext } from '../../../../../app/init/infrastructure-context';

export class MongoServiceRepository<PropType extends ServiceProps>
  extends MongoRepositoryBase<DomainExecutionContext, Service, PropType, ServiceVisa, ServiceDO<PropType>, InfrastructureContext>
  implements ServiceRepository<PropType>
{
  async getNewInstance(serviceName: string, description: string, community: CommunityEntityReference): Promise<ServiceDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model(), this.infrastructureContext);
    return ServiceDO.getNewInstance(adapter, serviceName, description, community, this.domainExecutionContext);
  }

  async getById(id: string): Promise<ServiceDO<PropType>> {
    let member = await this.model.findById(id).populate(['community']).exec();
    return this.typeConverter.toDomain(member, this.infrastructureContext, this.domainExecutionContext);
  }
}
