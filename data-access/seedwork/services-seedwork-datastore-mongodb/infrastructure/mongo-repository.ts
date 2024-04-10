import { ClientSession, Document, Model } from 'mongoose';
import { AggregateRoot } from '../../domain-seedwork/aggregate-root';
import { DomainEvent } from '../../domain-seedwork/domain-event';
import { EntityProps } from '../../domain-seedwork/entity';
import { EventBus } from '../../domain-seedwork/event-bus';
import { BaseDomainExecutionContext } from '../../domain-seedwork/base-domain-execution-context';
import { Repository } from '../../domain-seedwork/repository';
import { TypeConverter } from '../../domain-seedwork/type-converter';

export abstract class MongoRepositoryBase<
  ContextType extends BaseDomainExecutionContext,
  MongoType extends Document,
  PropType extends EntityProps,
  DomainType extends AggregateRoot<PropType>
> implements Repository<DomainType>
{
  protected itemsInTransaction: DomainType[] = [];
  constructor(
    protected eventBus: EventBus,
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
    for await (let event of item.getDomainEvents()) {
      console.log(`Repo dispatching DomainEvent : ${JSON.stringify(event)}`);
      await this.eventBus.dispatch(event as any, event['payload']);
    }
    item.clearDomainEvents();
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

  async getIntegrationEvents(): Promise<DomainEvent[]> {
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
    PropType extends EntityProps,
    DomainType extends AggregateRoot<PropType>,
    RepoType extends MongoRepositoryBase<ContextType, MongoType, PropType, DomainType>
  >(
    bus: EventBus,
    model: Model<MongoType>,
    typeConverter: TypeConverter<MongoType, DomainType, PropType, ContextType>,
    session: ClientSession,
    context: ContextType,
    repoClass: new (
      bus: EventBus,
      model: Model<MongoType>,
      typeConverter: TypeConverter<MongoType, DomainType, PropType, ContextType>,
      session: ClientSession,
      context: ContextType
    ) => RepoType
  ): RepoType {
    return new repoClass(bus, model, typeConverter, session, context);
  }
}
