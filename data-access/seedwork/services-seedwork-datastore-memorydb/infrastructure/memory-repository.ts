import { AggregateRoot } from "../../domain-seedwork/aggregate-root";
import { DomainEntityProps } from "../../domain-seedwork/domain-entity";
import { Repository } from "../../domain-seedwork/repository";
import { BaseDomainExecutionContext } from "../../domain-seedwork/base-domain-execution-context";
import { EventBus } from "../../domain-seedwork/event-bus";
import { DomainEventBase } from "../../domain-seedwork/domain-event";
import { MemoryStore } from "./memory-store";
import { SyncDomainEventBus } from "../../event-bus-seedwork-node/sync-domain-event-bus";

export class MemoryRepositoryBase<
  ContextType extends BaseDomainExecutionContext,
  PropType extends DomainEntityProps,
  DomainType extends AggregateRoot<PropType>,
  > implements Repository<DomainType> {

  private itemsInTransaction: DomainType[] = [];
  // protected memoryStore = new MemoryStore<PropType>();
  constructor(
    protected syncDomainEventBus: SyncDomainEventBus,
    protected domainClass: new (args: PropType, context: ContextType) => DomainType,
    protected context: ContextType,
    protected memoryStore: MemoryStore<PropType>
  ) {
  }

  get(id: string): Promise<DomainType> {
    
    const item = this.memoryStore.get(id);
    if (item) {
      return Promise.resolve(new this.domainClass(item, this.context));
    } else {
      return Promise.reject(new Error("Item not found."));
    }
  }
  getAll(): Promise<DomainType[]> {
    const items = this.memoryStore.getAll();
    return Promise.resolve(items.map((item) => new this.domainClass(item, this.context)));
  }
  save(item: DomainType): Promise<DomainType> {
    this.dispatchDomainEvents(item);
    this.itemsInTransaction.push(item);
    const existingItem = this.memoryStore.get(item.id);
    if (existingItem) {
      if(item.isDeleted){
        this.memoryStore.delete(item.id);
      }else{
        this.memoryStore.save(item.props);
      }
    } else {
      this.memoryStore.save(item.props);
    }
    return Promise.resolve(item);
  }

  async getIntegrationEvents(): Promise<DomainEventBase[]> {
    const integrationEventsGroup = this.itemsInTransaction.map((item) => {
      const integrationEvents = item.getIntegrationEvents();
      item.clearIntegrationEvents();
      return integrationEvents;
    });
    return integrationEventsGroup.reduce((acc, curr) => acc.concat(curr), []);
  }

  private async dispatchDomainEvents(item: DomainType) {
    for await (let event of item.getDomainEvents()) {
      await this.syncDomainEventBus.dispatch(event as any);
    }
    item.clearDomainEvents();
  }

  static create<
    ContextType extends BaseDomainExecutionContext,
    PropType extends DomainEntityProps,
    DomainType extends AggregateRoot<PropType>,
    RepoType extends MemoryRepositoryBase<ContextType, PropType, DomainType>
  >(
    syncDomainEventBus: SyncDomainEventBus,
    domainClass: new (args: PropType, context: ContextType) => DomainType,
    context: ContextType,
    memoryStore: MemoryStore<PropType>,
    repoClass: new (syncDomainEventBus: SyncDomainEventBus, domainClass:new (args: PropType, context: ContextType) => DomainType, context: ContextType, databaseAggregateRoot: MemoryStore<PropType>) => RepoType,
  ): RepoType {
    return new repoClass(syncDomainEventBus, domainClass, context, memoryStore);
  }

}

