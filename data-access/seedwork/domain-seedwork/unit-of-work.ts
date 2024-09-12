import { Repository } from './repository';
import { AggregateRoot } from './aggregate-root';
import { DomainEntityProps } from './domain-entity';
import { BaseDomainExecutionContext } from './base-domain-execution-context';
import { Visa } from '../passport-seedwork/visa';

export interface UnitOfWork<ContextType extends BaseDomainExecutionContext, PropType extends DomainEntityProps, VisaType extends Visa, Root extends AggregateRoot<PropType, ContextType, VisaType>, RepoType extends Repository<Root>> {
  withTransaction(context:ContextType, func: (repository:RepoType) => Promise<void>): Promise<void>;
}

export abstract class PersistanceUnitOfWork<ContextType extends BaseDomainExecutionContext, PropType extends DomainEntityProps, VisaType extends Visa, Root extends AggregateRoot<PropType, ContextType, VisaType>, RepoType extends Repository<Root>> implements UnitOfWork<ContextType,PropType, VisaType, Root,RepoType> {
  abstract withTransaction(context:ContextType, func: (repository:RepoType) => Promise<void>): Promise<void>;
}