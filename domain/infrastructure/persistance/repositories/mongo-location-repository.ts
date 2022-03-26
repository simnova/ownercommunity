import { Location as LocationDO, LocationProps } from '../../../contexts/property/location';
import { LocationRepository } from '../../../contexts/property/location-repository';
import { Location, LocationModel }from '../../../../infrastructure/data-sources/cosmos-db/models/location';
import { MongoRepositoryBase } from '../mongo-repository';
import { TypeConverter } from '../../../shared/type-converter';
import { ClientSession } from 'mongoose';
import { EventBus } from '../../../shared/event-bus';
import { DomainExecutionContext } from '../../../contexts/context';

export class MongoLocationRepository<PropType extends LocationProps> extends MongoRepositoryBase<DomainExecutionContext, Location,PropType,LocationDO<PropType>> implements LocationRepository<PropType> {
  constructor(
    eventBus: EventBus,
    modelType: typeof LocationModel, 
    typeConverter: TypeConverter<Location, LocationDO<PropType>,PropType, DomainExecutionContext>,
    session: ClientSession,
    context: DomainExecutionContext
  ) {
    super(eventBus,modelType,typeConverter,session,context);
  }
  
}