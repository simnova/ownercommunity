import { Repository } from './repository';
import { AggregateRoot } from './aggregate-root';
import { DomainEntityProps } from './domain-entity';
import { BaseDomainExecutionContext } from './base-domain-execution-context';
import { Visa } from '../passport-seedwork/visa';
import { InfrastructureContextBase } from '../infrastructure-seedwork/infrastructure-context-base';

export interface UnitOfWork<
  DomainExecutionContextType extends BaseDomainExecutionContext, 
  PropType extends DomainEntityProps, 
  VisaType extends Visa, 
  Root extends AggregateRoot<PropType, DomainExecutionContextType, VisaType>, 
  RepoType extends Repository<Root>,
  InfrastructureContextType extends InfrastructureContextBase
> {
  withTransaction(domainExecutionContext: DomainExecutionContextType, infrastructureContext: InfrastructureContextType, func: (repository:RepoType) => Promise<void>): Promise<void>;
}

export abstract class PersistanceUnitOfWork<
  DomainExecutionContextType extends BaseDomainExecutionContext, 
  PropType extends DomainEntityProps, 
  VisaType extends Visa, 
  Root extends AggregateRoot<PropType, DomainExecutionContextType, VisaType>, 
  RepoType extends Repository<Root>,
  InfrastructureContextType extends InfrastructureContextBase
> implements UnitOfWork<DomainExecutionContextType,PropType, VisaType, Root,RepoType, InfrastructureContextType> {
  abstract withTransaction(domainExecutionContext: DomainExecutionContextType, infrastructureContext: InfrastructureContextType, func: (repository:RepoType) => Promise<void>): Promise<void>;
}