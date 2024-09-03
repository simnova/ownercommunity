import { BaseDomainExecutionContext } from './base-domain-execution-context';

export interface TypeConverter<PersistenceType, DomainType, DomainPropType, ContextType extends BaseDomainExecutionContext> {
  toDomain(persistenceType: PersistenceType, context: ContextType): DomainType;
  toPersistence(domainType: DomainType): PersistenceType; 
  toAdapter(persistenceType: PersistenceType | DomainType): DomainPropType;
}
