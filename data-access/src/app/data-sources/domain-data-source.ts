import { DataSource, DataSourceConfig } from '../../../seedwork/datasource-seedwork/data-source';
import { MongoUnitOfWork } from '../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { MongoRepositoryBase } from '../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-repository';
import { AggregateRoot } from '../../../seedwork/domain-seedwork/aggregate-root';
import { DomainEntityProps } from '../../../seedwork/domain-seedwork/domain-entity';
import { Document } from 'mongoose';
import { DomainExecutionContext } from '../domain/domain-execution-context';
import { AppContext } from '../init/app-context-builder';
import { Visa } from '../../../seedwork/passport-seedwork/visa';
import { InfrastructureContext } from '../init/infrastructure-context';

export class DomainDataSource<
  Context extends AppContext,
  MongoType extends Document,
  PropType extends DomainEntityProps,
  VisaType extends Visa,
  DomainType extends AggregateRoot<PropType, DomainExecutionContext, VisaType>, 
  RepoType extends MongoRepositoryBase<DomainExecutionContext, MongoType, PropType, VisaType, DomainType, InfrastructureContext>
> extends DataSource<Context> {
  private unitOfWork: MongoUnitOfWork<DomainExecutionContext, MongoType, PropType, VisaType, DomainType, InfrastructureContext, RepoType>;
  
  constructor(options: { unitOfWork: MongoUnitOfWork<DomainExecutionContext, MongoType, PropType, VisaType, DomainType, InfrastructureContext, RepoType> } & DataSourceConfig<Context>) {
    super(options);
    this.unitOfWork = options.unitOfWork;
  }

  public get context(): Context { return this._context;}

  public async withTransaction(func:(repo:RepoType) => Promise<void>): Promise<void> {
    const domainExecutionContext = {
      domainVisa: this._context.passport.domainVisa
    }
    const infrastructureContext:InfrastructureContext = {
      auditContext: this._context.auditContext
    }

    console.log('withTransaction',this.context.passport.domainVisa);
    return this.unitOfWork.withTransaction(domainExecutionContext, infrastructureContext,(repo:RepoType) => func(repo));
  }
}