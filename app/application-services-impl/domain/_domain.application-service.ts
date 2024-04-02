import { BaseApplicationService, ApplicationServiceConfig, BaseApplicationServiceExecutionContext } from '../_base.application-service';
import { AggregateRoot } from '../../../seedwork/domain-seedwork/aggregate-root';
import { EntityProps } from '../../../seedwork/domain-seedwork/entity';
import { Repository } from '../../../seedwork/domain-seedwork/repository';
import { UnitOfWork } from '../../../seedwork/domain-seedwork/unit-of-work';
import { DomainApplicationService } from './_domain.interface';

export class DomainApplicationServiceImpl<
  Context extends BaseApplicationServiceExecutionContext,
  PropType extends EntityProps,
  Root extends AggregateRoot<PropType>, 
  RepoType extends Repository<Root>,
  > extends BaseApplicationService<Context> 
  implements DomainApplicationService<PropType, Root, RepoType>
{
  private unitOfWork: UnitOfWork<Context, PropType, Root, RepoType>;
  
  constructor(options: { unitOfWork: UnitOfWork<Context, PropType, Root, RepoType> } & ApplicationServiceConfig<Context>) {
    super(options);
    this.unitOfWork = options.unitOfWork;
  }

  // public get context(): Context { return this._context;}

  public async withTransaction(func:(repo:RepoType) => Promise<void>): Promise<void> {
    const executionContext:Context = {
      passport: this.context.passport
    } as Context;

    console.log('withTransaction',this.context.passport);
    return this.unitOfWork.withTransaction(executionContext,(repo:RepoType) => func(repo));
  }
}