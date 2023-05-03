import { DataSource, DataSourceConfig } from '../data-source';
import { MongoUnitOfWork } from '../../../domain/infrastructure/core/mongo/mongo-unit-of-work';
import { MongoRepositoryBase } from '../../../domain/infrastructure/core/mongo/mongo-repository';
import { AggregateRoot } from '../../../domain/shared/aggregate-root';
import { EntityProps } from '../../../domain/shared/entity';
import { Document } from 'mongoose';
import { DomainExecutionContext } from '../../../domain/contexts/context';
import { Context as GraphQLContext } from '../../context';

export class DomainDataSource<Context extends GraphQLContext,MongoType extends Document,PropType extends EntityProps,DomainType extends AggregateRoot<PropType>, RepoType extends MongoRepositoryBase<DomainExecutionContext, MongoType,PropType,DomainType>> extends DataSource<Context> {
  
  constructor(private unitOfWork: MongoUnitOfWork<DomainExecutionContext,MongoType,PropType,DomainType,RepoType>) {
    super();
  }

  public get context(): Context { return this._context;}

  public async withTransaction(func:(repo:RepoType) => Promise<void>): Promise<void> {
    const executionContext:DomainExecutionContext = {
      passport: this._context.passport
    }

    console.log('withTransaction',this.context.passport);
    return this.unitOfWork.withTransaction(executionContext,(repo:RepoType) => func(repo));
  }

  public initialize(config: DataSourceConfig<Context>): void {
    this._context = config?.context;
  }
  
}