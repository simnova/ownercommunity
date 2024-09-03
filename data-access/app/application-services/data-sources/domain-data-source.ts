import { AppContext } from '@app/main/app-context-builder';
import { DataSource, DataSourceConfig } from '@library/data-source-seedwork/data-source';
import { AggregateRoot } from '@library/domain-seedwork/aggregate-root';
import { DomainEntityProps } from '@library/domain-seedwork/domain-entity';
import { MongoRepositoryBase } from '@library/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { MongoUnitOfWork } from '@library/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { Document } from 'mongoose';
import { DomainExecutionContext } from '@app/application-services/domain/domain-execution-context';

export class DomainDataSource<
  Context extends AppContext,
  MongoType extends Document,
  PropType extends DomainEntityProps,
  DomainType extends AggregateRoot<PropType>, 
  RepoType extends MongoRepositoryBase<DomainExecutionContext, MongoType,PropType,DomainType>
> extends DataSource<Context> {
  private unitOfWork: MongoUnitOfWork<DomainExecutionContext,MongoType,PropType,DomainType,RepoType>;
  
  constructor(options: { unitOfWork: MongoUnitOfWork<DomainExecutionContext,MongoType,PropType,DomainType,RepoType> } & DataSourceConfig<Context>) {
    super(options);
    this.unitOfWork = options.unitOfWork;
  }

  public async withTransaction(func:(repo:RepoType) => Promise<void>): Promise<void> {
    const executionContext:DomainExecutionContext = {
      domainVisa: this._context.passport.domainVisa
    }

    console.log('withTransaction',this._context.passport.domainVisa);
    return this.unitOfWork.withTransaction(executionContext,(repo:RepoType) => func(repo));
  }
}