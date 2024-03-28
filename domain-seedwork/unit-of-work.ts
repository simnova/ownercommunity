import { Repository } from './repository';
import { AggregateRoot } from './aggregate-root';
import { EntityProps } from './entity';
import { BaseDomainExecutionContext } from './base-domain-execution-context';

export interface UnitOfWork<ContextType extends BaseDomainExecutionContext, PropType extends EntityProps,Root extends AggregateRoot<PropType>, RepoType extends Repository<Root>> {
  withTransaction(context:ContextType, func: (repository:RepoType) => Promise<void>): Promise<void>;
}

export abstract class PersistanceUnitOfWork<ContextType extends BaseDomainExecutionContext, PropType extends EntityProps,Root extends AggregateRoot<PropType>, RepoType extends Repository<Root>> implements UnitOfWork<ContextType,PropType,Root,RepoType> {
  abstract withTransaction(context:ContextType, func: (repository:RepoType) => Promise<void>): Promise<void>;
}