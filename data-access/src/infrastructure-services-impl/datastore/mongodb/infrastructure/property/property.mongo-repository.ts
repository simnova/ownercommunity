import { Property as PropertyDO, PropertyProps } from '../../../../../app/domain/contexts/property/property/property';
import { PropertyRepository } from '../../../../../app/domain/contexts/property/property/property.repository';
import { Property } from '../../models/property';
import { MongoRepositoryBase } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { DomainExecutionContext } from '../../../../../app/domain/domain-execution-context';
import { CommunityEntityReference } from '../../../../../app/domain/contexts/community/community/community';
import { PropertyVisa } from '../../../../../app/domain/contexts/property/property/property.visa';
import { InfrastructureContext } from '../../../../../app/init/infrastructure-context';

export class MongoPropertyRepository<PropType extends PropertyProps>
  extends MongoRepositoryBase<DomainExecutionContext, Property, PropType, PropertyVisa, PropertyDO<PropType>, InfrastructureContext>
  implements PropertyRepository<PropType>
{
  async getNewInstance(propertyName: string, community: CommunityEntityReference): Promise<PropertyDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model(), this.infrastructureContext);
    return PropertyDO.getNewInstance(adapter, propertyName, community, this.domainExecutionContext);
  }

  async getById(id: string): Promise<PropertyDO<PropType>> {
    let propertyDTO = await this.model.findById(id).populate(['community', 'owner']).exec();
    return this.typeConverter.toDomain(propertyDTO, this.infrastructureContext, this.domainExecutionContext);
  }

  async getAll(): Promise<PropertyDO<PropType>[]> {
    let propertiesDTO = await this.model.find().populate('community').exec();
    return propertiesDTO.map((property) => this.typeConverter.toDomain(property, this.infrastructureContext, this.domainExecutionContext));
  }
}
