// import { BaseDataStructure } from '../interfaces/base';
// import { AggregateRoot } from '../../domain-seedwork/aggregate-root';
// import { TypeConverter } from '../../domain-seedwork/type-converter';
// import { BaseDomainAdapterType } from './base-domain-adapter';

// export abstract class BaseTypeConverter<
//   ContextType, 
//   DataStructure extends BaseDataStructure,
//   DomainPropInterface extends BaseDomainAdapterType<DataStructure>, 
//   DomainType extends AggregateRoot<DomainPropInterface>
//   > implements TypeConverter<DataStructure, DomainType,DomainPropInterface,ContextType> 
// {
//   constructor(
//     private adapter: new(args:DataStructure) => DomainPropInterface,
//     private domainObject: new(args:DomainPropInterface, context:ContextType) => DomainType
//   ) {}

//   toPersistence(domainType: DomainType): DataStructure {
//     return domainType.props.doc;
//   }
//   toDomain(dataObj: DataStructure, context:ContextType): DomainType {
//     if(!dataObj) { return null;}
//     return new this.domainObject(this.toAdapter(dataObj), context);
//   }
//   toAdapter(dataObj: DataStructure | DomainType): DomainPropInterface {
//     if(dataObj instanceof this.domainObject) {
//       return dataObj.props;
//     }
//     return new this.adapter(dataObj as DataStructure);
//   }
// }
{}