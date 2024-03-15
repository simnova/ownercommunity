import { Property as PropertyDO, PropertyProps } from '../../domain/contexts/property/property';
import { PropertyRepository } from '../../domain/contexts/property/property.repository';
import { Property } from '../../infrastructure/data-sources/cosmos-db/models/property';
import { MongoRepositoryBase } from '../../domain-seedwork-mongodb/mongo-repository';
import { DomainExecutionContext } from '../../domain/contexts/execution-context';
import { CommunityEntityReference } from '../../domain/contexts/community/community';

export class MongoPropertyRepository<PropType extends PropertyProps>
  extends MongoRepositoryBase<DomainExecutionContext, Property, PropType, PropertyDO<PropType>>
  implements PropertyRepository<PropType>
{
  async getNewInstance(propertyName: string, community: CommunityEntityReference): Promise<PropertyDO<PropType>> {
    let adapter = this.typeConverter.toAdapter(new this.model());
    return PropertyDO.getNewInstance(adapter, propertyName, community, this.context);
  }

  async getById(id: string): Promise<PropertyDO<PropType>> {
    let member = await this.model.findById(id).populate('community').exec();
    return this.typeConverter.toDomain(member, this.context);
  }
}
