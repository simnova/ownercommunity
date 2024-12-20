import { AggregateRoot } from "../../domain-seedwork/aggregate-root";
import { DomainEntityProps } from "../../domain-seedwork/domain-entity";
import { Repository } from "../../domain-seedwork/repository";
import { BaseDomainExecutionContext } from "../../domain-seedwork/base-domain-execution-context";
import { EventBus } from "../../domain-seedwork/event-bus";
import { DomainEvent } from "../../domain-seedwork/domain-event";
import { MemoryStore } from "./memory-store";
import { Visa } from "../../passport-seedwork/visa";
import { InfrastructureContextBase } from "../../infrastructure-seedwork/infrastructure-context-base";

export class MemoryRepositoryBase<
  DomaineExecutionContextType extends BaseDomainExecutionContext,
  PropType extends DomainEntityProps,
  VisaType extends Visa,
  DomainType extends AggregateRoot<PropType, DomaineExecutionContextType, VisaType>,
  InfrastructureContextType extends InfrastructureContextBase
  > implements Repository<DomainType> {

  private itemsInTransaction: DomainType[] = [];
  // protected memoryStore = new MemoryStore<PropType>();
  constructor(
    protected eventBus: EventBus,
    protected domainClass: new (args: PropType, context: DomaineExecutionContextType) => DomainType,
    protected context: DomaineExecutionContextType,
    protected infrastructureContext: InfrastructureContextType,
    protected memoryStore: MemoryStore<PropType>,
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
    DomainExecutionContextType extends BaseDomainExecutionContext,
    PropType extends DomainEntityProps,
    VisaType extends Visa,
    DomainType extends AggregateRoot<PropType, DomainExecutionContextType, VisaType>,
    InfrastructureContextType extends InfrastructureContextBase,
    RepoType extends MemoryRepositoryBase<DomainExecutionContextType, PropType, VisaType, DomainType, InfrastructureContextType>
  >(
    eventBus: EventBus,
    domainClass: new (args: PropType, context: DomainExecutionContextType) => DomainType,
    domainExecutionContext: DomainExecutionContextType,
    infrastructureContext: InfrastructureContextType,
    memoryStore: MemoryStore<PropType>,
    repoClass: new (
      eventBus: EventBus, 
      domainClass:new (args: PropType, context: DomainExecutionContextType) => DomainType, 
      domainExecutionContext: DomainExecutionContextType, 
      infrastructureContext: InfrastructureContextType,
      databaseAggregateRoot: MemoryStore<PropType>) => RepoType,
  ): RepoType {
    return new repoClass(eventBus, domainClass, domainExecutionContext, infrastructureContext, memoryStore);
  }

}

