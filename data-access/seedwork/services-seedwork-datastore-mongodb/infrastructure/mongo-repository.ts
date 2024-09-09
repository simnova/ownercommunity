import { ClientSession, Document, Model } from 'mongoose';
import { AggregateRoot } from '../../domain-seedwork/aggregate-root';
import { DomainEventBase } from '../../domain-seedwork/domain-event';
import { DomainEntityProps } from '../../domain-seedwork/domain-entity';
import { BaseDomainExecutionContext } from '../../domain-seedwork/base-domain-execution-context';
import { Repository } from '../../domain-seedwork/repository';
import { TypeConverter } from '../../domain-seedwork/type-converter';
import { SyncDomainEventBus } from '../../event-bus-seedwork-node/sync-domain-event-bus';

export abstract class MongoRepositoryBase<
  ContextType extends BaseDomainExecutionContext,
  MongoType extends Document,
  PropType extends DomainEntityProps,
  DomainType extends AggregateRoot<PropType>
> implements Repository<DomainType>
{
  protected itemsInTransaction: DomainType[] = [];
  constructor(
    protected syncDomainEventBus: SyncDomainEventBus,
    protected model: Model<MongoType>,
    public typeConverter: TypeConverter<MongoType, DomainType, PropType, ContextType>,
    protected session: ClientSession,
    protected context: ContextType
  ) {}

  async get(id: string): Promise<DomainType> {
    return this.typeConverter.toDomain(await this.model.findById(id).exec(), this.context);
  }

  async save(item: DomainType): Promise<DomainType> {
    item.onSave(this.typeConverter.toPersistence(item).isModified());

    console.log('saving item');

    do{
      let syncDomainEventsToProcess: DomainEventBase[] = item.getSyncDomainEvents();
      item.clearSyncDomainEvents();
      syncDomainEventsToProcess.forEach((event: DomainEventBase) => this.syncDomainEventBus.dispatch(event));
      // for await (let event of item.getDomainEvents()) {
      //   console.log(`Repo dispatching DomainEvent : ${JSON.stringify(event)}`);
      //   await this.domainEventBus.dispatch(event as any, event['payload']);
      // }
    } while (item.getSyncDomainEvents().length > 0);
    this.itemsInTransaction.push(item);
    try {
      if (item.isDeleted === true) {
        await this.model.deleteOne({ _id: item.id }, { session: this.session }).exec();
        return item;
      } else {
        console.log('saving item id', item.id);
        const mongoObj = this.typeConverter.toPersistence(item);
        return this.typeConverter.toDomain(await mongoObj.save({ session: this.session }), this.context);
      }
    } catch (error) {
      console.log(`Error saving item : ${error}`);
      throw error;
    }
  }

  async getIntegrationEvents(): Promise<DomainEventBase[]> {
    const integrationEventsGroup = this.itemsInTransaction.map((item) => {
      const integrationEvents = item.getIntegrationEvents();
      item.clearIntegrationEvents();
      return integrationEvents;
    });
    return integrationEventsGroup.reduce((acc, curr) => acc.concat(curr), []);
  }

  static create<
    ContextType extends BaseDomainExecutionContext,
    MongoType extends Document,
    PropType extends DomainEntityProps,
    DomainType extends AggregateRoot<PropType>,
    RepoType extends MongoRepositoryBase<ContextType, MongoType, PropType, DomainType>
  >(
    syncDomainEventBus: SyncDomainEventBus,
    model: Model<MongoType>,
    typeConverter: TypeConverter<MongoType, DomainType, PropType, ContextType>,
    session: ClientSession,
    context: ContextType,
    repoClass: new (
      syncDomainEventBus: SyncDomainEventBus,
      model: Model<MongoType>,
      typeConverter: TypeConverter<MongoType, DomainType, PropType, ContextType>,
      session: ClientSession,
      context: ContextType
    ) => RepoType
  ): RepoType {
    return new repoClass(syncDomainEventBus, model, typeConverter, session, context);
  }
}
