import { AggregateRoot } from "../../domain-seedwork/aggregate-root";
import { DomainEventBase } from "../../domain-seedwork/domain-event";
import { DomainEntityProps } from "../../domain-seedwork/domain-entity";
import { EventBus } from "../../domain-seedwork/event-bus";
import { BaseDomainExecutionContext } from "../../domain-seedwork/base-domain-execution-context";
import { PersistanceUnitOfWork } from "../../domain-seedwork/unit-of-work";
import { MemoryRepositoryBase } from "./memory-repository";
import { MemoryStore } from "./memory-store";
import { SyncDomainEventBus } from "../../event-bus-seedwork-node/sync-domain-event-bus";

export class MemoryUnitOfWork<
  ContextType extends BaseDomainExecutionContext,
  PropType extends DomainEntityProps, 
  DomainType extends AggregateRoot<PropType>,
  RepoType extends MemoryRepositoryBase<ContextType, PropType, DomainType>
  > extends PersistanceUnitOfWork<ContextType,PropType,DomainType,RepoType> {
  
  async withTransaction(context:ContextType, func: (repository: RepoType) => Promise<void>): Promise<void> {
    let repoEvents: DomainEventBase[] = [];
    let repo = MemoryRepositoryBase.create(this.syncDomainEventBus, this.domainClass, context, this.memoryStore, this.repoClass);
    try {
      await func(repo);
    }catch(e){
      console.log('func failed'); 
      throw e;
    }
    repoEvents = await repo.getIntegrationEvents();
    for await(let event of repoEvents){
      await this.integrationEventBus.dispatch(event as any,event['payload'])
    }
  }
  
  constructor(
    private syncDomainEventBus : SyncDomainEventBus, 
    private integrationEventBus: EventBus,
    private domainClass : new (args: PropType, context: ContextType) => DomainType,
    private memoryStore: MemoryStore<PropType>,
    private repoClass : new(syncDomainEventBus: SyncDomainEventBus, domainClass: new (args: PropType, context: ContextType) => DomainType, context: ContextType, databaseAggregateRoot: MemoryStore<PropType>) => RepoType,
  ){
    super();
  }

}