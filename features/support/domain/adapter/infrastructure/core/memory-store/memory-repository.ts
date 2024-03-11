import { AggregateRoot } from "../../../../../../../domain/shared/aggregate-root";
import { EntityProps } from "../../../../../../../domain/shared/entity";
import { Repository } from "../../../../../../../domain/shared/repository";
import { nanoid } from "nanoid";
import { ExecutionContext } from "../../../../../../../domain/shared/execution-context";
import { EventBus } from "../../../../../../../domain/shared/event-bus";
import { DomainEvent } from "../../../../../../../domain/shared/domain-event";

export class MemoryRepositoryBase<
  ContextType extends ExecutionContext,
  PropType extends EntityProps,
  DomainType extends AggregateRoot<PropType>,
  > implements Repository<DomainType> {

  private itemsInTransaction: DomainType[] = [];
  protected memoryStore = new MemoryStore<PropType>();
  constructor(
    protected eventBus: EventBus,
    protected domainClass: new (args: PropType, context: ContextType) => DomainType,
    protected context: ContextType
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
      (item.props as any).id = nanoid(); 
      this.memoryStore.save(item.props);
    }
    return Promise.resolve(item);
  }

  async getIntegrationEvents(): Promise<DomainEvent[]> {
    const integrationEventsGroup = this.itemsInTransaction.map((item) => {
      const integrationEvents = item.getIntegrationEvents();
      item.clearIntegrationEvents();
      return integrationEvents;
    });
    return integrationEventsGroup.reduce((acc, curr) => acc.concat(curr), []);
  }

  private async dispatchDomainEvents(item: DomainType) {
    for await (let event of item.getDomainEvents()) {
      await this.eventBus.dispatch(event as any, event['payload']);
    }
    item.clearDomainEvents();
  }

  static create<
    ContextType extends ExecutionContext,
    PropType extends EntityProps,
    DomainType extends AggregateRoot<PropType>,
    RepoType extends MemoryRepositoryBase<ContextType, PropType, DomainType>
  >(
    eventBus: EventBus,
    domainClass: new (args: PropType, context: ContextType) => DomainType,
    context: ContextType,
    repoClass: new (eventBus: EventBus, domainClass:new (args: PropType, context: ContextType) => DomainType, context: ContextType) => RepoType
  ): RepoType {
    return new repoClass(eventBus, domainClass, context);
  }

}

class MemoryStore<PropType extends EntityProps> {
  private memoryStore: PropType[] = [];

  get(id: string): PropType { 
    return this.memoryStore.find((item) => item.id === id);
  }
  save(item: PropType): PropType {
    const existingItem = this.memoryStore.find((i) => i.id === item.id);
    if (existingItem) {
      const index = this.memoryStore.indexOf(existingItem);
      this.memoryStore[index] = item;
    } else {
      this.memoryStore.push(item);
    }
    return item;
  }
  delete(id: string): void {
    this.memoryStore = this.memoryStore.filter((i) => i.id !== id);
  }
  getAll(): PropType[] {
    return this.memoryStore;
  }
}