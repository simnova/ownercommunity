import { DataSource, DataSourceConfig } from '../data-source';
import { MongoUnitOfWork } from '../../../domain-seedwork-mongodb/mongo-unit-of-work';
import { MongoRepositoryBase } from '../../../domain-seedwork-mongodb/mongo-repository';
import { AggregateRoot } from '../../../domain-seedwork/aggregate-root';
import { EntityProps } from '../../../domain-seedwork/entity';
import { Document } from 'mongoose';
import { DomainExecutionContext } from '../../../domain/contexts/execution-context';
import { Context as GraphQLContext } from '../../context';

export class DomainDataSource<Context extends GraphQLContext,MongoType extends Document,PropType extends EntityProps,DomainType extends AggregateRoot<PropType>, RepoType extends MongoRepositoryBase<DomainExecutionContext, MongoType,PropType,DomainType>> extends DataSource<Context> {
  private unitOfWork: MongoUnitOfWork<DomainExecutionContext,MongoType,PropType,DomainType,RepoType>;
  
  constructor(options: { unitOfWork: MongoUnitOfWork<DomainExecutionContext,MongoType,PropType,DomainType,RepoType> } & DataSourceConfig<Context>) {
    super(options);
    this.unitOfWork = options.unitOfWork;
  }

  public get context(): Context { return this._context;}

  public async withTransaction(func:(repo:RepoType) => Promise<void>): Promise<void> {
    const executionContext:DomainExecutionContext = {
      passport: this._context.passport
    }

    console.log('withTransaction',this.context.passport);
    return this.unitOfWork.withTransaction(executionContext,(repo:RepoType) => func(repo));
  }
}