import { InfrastructureContextBase } from '../infrastructure-seedwork/infrastructure-context-base';
import { BaseDomainExecutionContext } from './base-domain-execution-context';

export interface TypeConverter<PersistenceType, DomainType, DomainPropType, DomainExecutionContextType extends BaseDomainExecutionContext, InfrastructureContextType extends InfrastructureContextBase> {
  toDomain(persistenceType: PersistenceType, infrastructureContext: InfrastructureContextType, domainExecutionContext: DomainExecutionContextType): DomainType
  toPersistence(domainType: DomainType): PersistenceType; 
  toAdapter(persistenceType: PersistenceType | DomainType, infrastructureContext: InfrastructureContextType): DomainPropType;
}
