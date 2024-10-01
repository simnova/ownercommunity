import { PersistanceUnitOfWork } from '../../domain-seedwork/unit-of-work';
import { AggregateRoot } from '../../domain-seedwork/aggregate-root';
import mongoose, { ClientSession,Model,Document } from 'mongoose';
import { MongoRepositoryBase } from './mongo-repository';
import { TypeConverter } from '../../domain-seedwork/type-converter';
import { DomainEntityProps } from '../../domain-seedwork/domain-entity';
import { EventBus } from '../../domain-seedwork/event-bus';
import { DomainEvent } from '../../domain-seedwork/domain-event';
import { BaseDomainExecutionContext } from '../../domain-seedwork/base-domain-execution-context';
import { Visa } from '../../passport-seedwork/visa';
import { InfrastructureContextBase } from '../../infrastructure-seedwork/infrastructure-context-base';

export class MongoUnitOfWork<
  DomainExecutionContextType extends BaseDomainExecutionContext, 
  MongoType extends Document,
  PropType extends DomainEntityProps, 
  VisaType extends Visa,
  DomainType  extends AggregateRoot<PropType, DomainExecutionContextType, VisaType>, 
  InfrastructureContextType extends InfrastructureContextBase,
  RepoType extends MongoRepositoryBase<DomainExecutionContextType, MongoType,PropType, VisaType, DomainType, InfrastructureContextType>,
> extends PersistanceUnitOfWork<DomainExecutionContextType,PropType, VisaType, DomainType,RepoType,InfrastructureContextType> {
  async withTransaction(domainExecutionContext: DomainExecutionContextType, infrastructureContext: InfrastructureContextType, func: (repository: RepoType) => Promise<void>): Promise<void> {
      let repoEvents: DomainEvent[] = [];
      console.log('withTransaction');
    
      await mongoose.connection.transaction(async (session:ClientSession) => {
        console.log('transaction');
        let repo = MongoRepositoryBase.create(this.bus, this.model, this.typeConverter, session, domainExecutionContext, infrastructureContext, this.repoClass);
        console.log('repo created');
        try {
          await func(repo);
          // console.log('func done');
        }
        catch(e) {
          console.log('func failed');
          console.log(e);
          throw e;
        }
        repoEvents = await repo.getIntegrationEvents();
      });
      console.log('integration events');
      //Send integration events after transaction is completed
      for await(let event of repoEvents){
        await this.integrationEventBus.dispatch(event as any,event['payload'])
      }
      
  }
  
  constructor(
      private bus : EventBus,
      private integrationEventBus: EventBus,
      private model : Model<MongoType>, 
      private typeConverter : TypeConverter<MongoType,DomainType,PropType, DomainExecutionContextType, InfrastructureContextType>,
      private repoClass : new(
        bus: EventBus, 
        model: Model<MongoType>, 
        typeConverter: TypeConverter<MongoType, DomainType, PropType, DomainExecutionContextType, InfrastructureContextType>, 
        session: ClientSession, 
        domainExecutionContext: DomainExecutionContextType,
        infrastructureContext: InfrastructureContextType,
      ) => RepoType
    ){
      super();
    }
}