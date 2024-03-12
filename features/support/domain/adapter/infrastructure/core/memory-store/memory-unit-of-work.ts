import { AggregateRoot } from "../../../../../../../domain/shared/aggregate-root";
import { DomainEvent } from "../../../../../../../domain/shared/domain-event";
import { EntityProps } from "../../../../../../../domain/shared/entity";
import { EventBus } from "../../../../../../../domain/shared/event-bus";
import { ExecutionContext } from "../../../../../../../domain/shared/execution-context";
import { PersistanceUnitOfWork } from "../../../../../../../domain/shared/unit-of-work";
import { MemoryRepositoryBase } from "./memory-repository";
import { MemoryStore } from "./memory-store";

export class MemoryUnitOfWork<
  ContextType extends ExecutionContext,
  PropType extends EntityProps, 
  DomainType extends AggregateRoot<PropType>,
  RepoType extends MemoryRepositoryBase<ContextType, PropType, DomainType>
  > extends PersistanceUnitOfWork<ContextType,PropType,DomainType,RepoType> {
  
  async withTransaction(context:ContextType, func: (repository: RepoType) => Promise<void>): Promise<void> {
    let repoEvents: DomainEvent[] = [];
    let repo = MemoryRepositoryBase.create(this.bus, this.domainClass, context, this.memoryStore, this.repoClass);
    try {
      await func(repo);
      console.log('func done');
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
    private bus : EventBus, 
    private integrationEventBus: EventBus,
    private domainClass : new (args: PropType, context: ContextType) => DomainType,
    private memoryStore: MemoryStore<PropType>,
    private repoClass : new(bus: EventBus, domainClass: new (args: PropType, context: ContextType) => DomainType, context: ContextType, databaseAggregateRoot: MemoryStore<PropType>) => RepoType,
  ){
    super();
  }

}