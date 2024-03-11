import { ExecutionContext } from './execution-context';

export interface TypeConverter<PersistenceType, DomainType, DomainPropType, ContextType extends ExecutionContext> {
  toDomain(persistenceType: PersistenceType, context: ContextType): DomainType;
  toPersistence(domainType: DomainType): PersistenceType; 
  toAdapter(persistenceType: PersistenceType | DomainType): DomainPropType;
}
