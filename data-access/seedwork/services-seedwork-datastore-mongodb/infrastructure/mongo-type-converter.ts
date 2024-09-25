import { Base } from '../interfaces/base';
import { AggregateRoot } from '../../domain-seedwork/aggregate-root';
import { TypeConverter } from '../../domain-seedwork/type-converter';
import { MongooseDomainAdapterType } from './mongo-domain-adapter';
import { Visa } from '../../passport-seedwork/visa';
import { BaseDomainExecutionContext } from '../../domain-seedwork/base-domain-execution-context';
import { InfrastructureContextBase } from '../../infrastructure-seedwork/infrastructure-context-base';

export abstract class MongoTypeConverter<
  DomainExecutionContextType extends BaseDomainExecutionContext, 
  MongooseModelType extends Base,
  DomainPropInterface extends MongooseDomainAdapterType<MongooseModelType>, 
  VisaType extends Visa, 
  DomainType extends AggregateRoot<DomainPropInterface, DomainExecutionContextType, VisaType>,
  InfrastructureContextType extends InfrastructureContextBase
> implements TypeConverter<MongooseModelType, DomainType,DomainPropInterface,DomainExecutionContextType, InfrastructureContextType> {
  constructor(
    private adapter: new(args:MongooseModelType, infrastructureContext: InfrastructureContextType) => DomainPropInterface,
    private domainObject: new(args:DomainPropInterface, context:DomainExecutionContextType) => DomainType
  ) {}
  toPersistence(domainType: DomainType): MongooseModelType {
    return domainType.props.doc;
  }
  toDomain(mongoType: MongooseModelType, infrastructureContext: InfrastructureContextType, domainExecutionContext: DomainExecutionContextType): DomainType {
    if(!mongoType) { return null;}
    return new this.domainObject(this.toAdapter(mongoType, infrastructureContext), domainExecutionContext);
  }
  toAdapter(mongoType: MongooseModelType | DomainType, infrastructureContext: InfrastructureContextType): DomainPropInterface {
    if(mongoType instanceof this.domainObject) {
      return mongoType.props;
    }
    return new this.adapter(mongoType as MongooseModelType,  infrastructureContext);
  }
}