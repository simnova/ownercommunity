import { ClientSession, Document, Model } from 'mongoose';
import { AggregateRoot } from '../../domain-seedwork/aggregate-root';
import { DomainEvent } from '../../domain-seedwork/domain-event';
import { DomainEntityProps } from '../../domain-seedwork/domain-entity';
import { EventBus } from '../../domain-seedwork/event-bus';
import { BaseDomainExecutionContext } from '../../domain-seedwork/base-domain-execution-context';
import { Repository } from '../../domain-seedwork/repository';
import { TypeConverter } from '../../domain-seedwork/type-converter';
import { Visa } from '../../passport-seedwork/visa';
import { InfrastructureContextBase } from '../../infrastructure-seedwork/infrastructure-context-base';

export abstract class MongoRepositoryBase<
  DomainExecutionContextType extends BaseDomainExecutionContext,
  MongoType extends Document,
  PropType extends DomainEntityProps,
  VisaType extends Visa,
  DomainType extends AggregateRoot<PropType, DomainExecutionContextType, VisaType>,
  InfrastructureContextType extends InfrastructureContextBase
> implements Repository<DomainType>
{
  protected itemsInTransaction: DomainType[] = [];
  constructor(
    protected eventBus: EventBus,
    protected model: Model<MongoType>,
    public typeConverter: TypeConverter<MongoType, DomainType, PropType, DomainExecutionContextType, InfrastructureContextType>,
    protected session: ClientSession,
    protected domainExecutionContext: DomainExecutionContextType,
    protected infrastructureContext: InfrastructureContextType,
  ) {}

  async get(id: string): Promise<DomainType> {
    return this.typeConverter.toDomain(await this.model.findById(id).exec(), this.infrastructureContext, this.domainExecutionContext);
  }

  async save(item: DomainType): Promise<DomainType> {
    item.onSave(this.typeConverter.toPersistence(item).isModified());

    console.log('saving item');
    item.processSyncDomainEvents();
    this.itemsInTransaction.push(item);
    try {
      if (item.isDeleted === true) {
        await this.model.deleteOne({ _id: item.id }, { session: this.session }).exec();
        return item;
      } else {
        console.log('saving item id', item.id);
        const mongoObj = this.typeConverter.toPersistence(item);
        return this.typeConverter.toDomain(await mongoObj.save({ session: this.session }), this.infrastructureContext, this.domainExecutionContext);
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
    DomainExecutionContextType extends BaseDomainExecutionContext,
    MongoType extends Document,
    PropType extends DomainEntityProps,
    VisaType extends Visa,
    DomainType extends AggregateRoot<PropType, DomainExecutionContextType, VisaType>,
    InfrastructureContextType extends InfrastructureContextBase,
    RepoType extends MongoRepositoryBase<DomainExecutionContextType, MongoType, PropType, VisaType, DomainType, InfrastructureContextType>,
  >(
    bus: EventBus,
    model: Model<MongoType>,
    typeConverter: TypeConverter<MongoType, DomainType, PropType, DomainExecutionContextType, InfrastructureContextType>,
    session: ClientSession,
    domainExecutionContext: DomainExecutionContextType,
    infrastructureContext: InfrastructureContextType,
    repoClass: new (
      bus: EventBus,
      model: Model<MongoType>,
      typeConverter: TypeConverter<MongoType, DomainType, PropType, DomainExecutionContextType, InfrastructureContextType>,
      session: ClientSession,
      domainExecutionContext: DomainExecutionContextType,
      infrastructureContext: InfrastructureContextType,
    ) => RepoType
  ): RepoType {
    return new repoClass(bus, model, typeConverter, session, domainExecutionContext, infrastructureContext);
  }
}
