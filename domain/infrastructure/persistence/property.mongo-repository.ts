import { Property as PropertyDO, PropertyProps } from '../../contexts/property/property';
import { PropertyRepository } from '../../contexts/property/property.repository';
import { Property } from '../../../infrastructure/data-sources/cosmos-db/models/property';
import { MongoRepositoryBase } from '../core/mongo/mongo-repository';
import { DomainExecutionContext } from '../../contexts/context';
import { CommunityEntityReference } from '../../contexts/community/community';

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
