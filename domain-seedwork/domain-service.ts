import { DataSource, DataSourceConfig } from '../data-source-seedwork/data-source';
import { AggregateRoot } from './aggregate-root';
import { EntityProps } from './entity';
import { DomainExecutionContext } from '../domain/contexts/execution-context';
import { Repository } from './repository';
import { UnitOfWork } from './unit-of-work';

export class DomainService<
  Context extends DomainExecutionContext,
  PropType extends EntityProps,
  Root extends AggregateRoot<PropType>, 
  RepoType extends Repository<Root>,
> extends DataSource<Context> {
  private unitOfWork: UnitOfWork<Context, PropType, Root, RepoType>;
  
  constructor(options: { unitOfWork: UnitOfWork<Context, PropType, Root, RepoType> } & DataSourceConfig<Context>) {
    super(options);
    this.unitOfWork = options.unitOfWork;
  }

  public get context(): Context { return this._context;}

  public async withTransaction(func:(repo:RepoType) => Promise<void>): Promise<void> {
    const executionContext:Context = {
      passport: this._context.passport
    } as Context;

    console.log('withTransaction',this.context.passport);
    return this.unitOfWork.withTransaction(executionContext,(repo:RepoType) => func(repo));
  }
}