import { Base } from '../interfaces/base';
import { AggregateRoot } from '../../domain-seedwork/aggregate-root';
import { TypeConverter } from '../../domain-seedwork/type-converter';
import { MongooseDomainAdapterType } from './mongo-domain-adapter';

export abstract class MongoTypeConverter<ContextType, MongooseModelType extends Base,DomainPropInterface extends MongooseDomainAdapterType<MongooseModelType>, DomainType extends AggregateRoot<DomainPropInterface>> implements TypeConverter<MongooseModelType, DomainType,DomainPropInterface,ContextType> {
  constructor(
    private adapter: new(args:MongooseModelType) => DomainPropInterface,
    private domainObject: new(args:DomainPropInterface, context:ContextType) => DomainType
  ) {}
  toPersistence(domainType: DomainType): MongooseModelType {
    return domainType.props.doc;
  }
  toDomain(mongoType: MongooseModelType, context:ContextType): DomainType {
    if(!mongoType) { return null;}
    return new this.domainObject(this.toAdapter(mongoType), context);
  }
  toAdapter(mongoType: MongooseModelType | DomainType): DomainPropInterface {
    if(mongoType instanceof this.domainObject) {
      return mongoType.props;
    }
    return new this.adapter(mongoType as MongooseModelType);
  }
}