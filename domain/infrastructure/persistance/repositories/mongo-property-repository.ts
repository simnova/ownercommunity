import { Property as PropertyDO, PropertyProps } from '../../../../domain/contexts/property/property';
import { PropertyRepository } from '../../../contexts/property/property-repository';
import { Property, PropertyModel }from '../../../../infrastructure/data-sources/cosmos-db/models/property';
import { MongoRepositoryBase } from '../mongo-repository';
import { TypeConverter } from '../../../shared/type-converter';
import { ClientSession } from 'mongoose';
import { EventBus } from '../../../shared/event-bus';
import { DomainExecutionContext } from '../../../contexts/context';

export class MongoPropertyRepository<PropType extends PropertyProps> extends MongoRepositoryBase<DomainExecutionContext, Property,PropType,PropertyDO<PropType>> implements PropertyRepository<PropType> {
  constructor(
    eventBus: EventBus,
    modelType: typeof PropertyModel, 
    typeConverter: TypeConverter<Property, PropertyDO<PropType>,PropType, DomainExecutionContext>,
    session: ClientSession,
    context: DomainExecutionContext
  ) {
    super(eventBus,modelType,typeConverter,session,context);
  }
  
}