import { PersistanceUnitOfWork } from '../../domain-seedwork/unit-of-work';
import { AggregateRoot } from '../../domain-seedwork/aggregate-root';
import mongoose, { ClientSession,Model,Document } from 'mongoose';
import { MongoRepositoryBase } from './mongo-repository';
import { TypeConverter } from '../../domain-seedwork/type-converter';
import { DomainEntityProps } from '../../domain-seedwork/domain-entity';
import { EventBus } from '../../domain-seedwork/event-bus';
import { DomainEventBase } from '../../domain-seedwork/domain-event';
import { BaseDomainExecutionContext } from '../../domain-seedwork/base-domain-execution-context';
import { SyncDomainEventBus } from '../../event-bus-seedwork-node/sync-domain-event-bus';

export class MongoUnitOfWork<ContextType extends BaseDomainExecutionContext, MongoType extends Document,PropType extends DomainEntityProps, DomainType  extends AggregateRoot<PropType>, RepoType extends MongoRepositoryBase<ContextType, MongoType,PropType,DomainType> > extends PersistanceUnitOfWork<ContextType,PropType,DomainType,RepoType> {
  async withTransaction(context:ContextType, func: (repository: RepoType) => Promise<void>): Promise<void> {
      let repoEvents: DomainEventBase[] = [];
      console.log('withTransaction');
    
      await mongoose.connection.transaction(async (session:ClientSession) => {
        console.log('transaction');
        let repo = MongoRepositoryBase.create(this.syncDomainEventBus, this.model, this.typeConverter, session, context, this.repoClass);
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
      private syncDomainEventBus : SyncDomainEventBus,
      private integrationEventBus: EventBus,
      private model : Model<MongoType>, 
      private typeConverter : TypeConverter<MongoType,DomainType,PropType, ContextType>,
      private repoClass : new(syncDomainEventBus: SyncDomainEventBus, model: Model<MongoType>, typeConverter: TypeConverter<MongoType, DomainType, PropType, ContextType>, session: ClientSession, context: ContextType) => RepoType
    ){
      super();
    }
}