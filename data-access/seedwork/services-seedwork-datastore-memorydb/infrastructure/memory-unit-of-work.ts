import { AggregateRoot } from "../../domain-seedwork/aggregate-root";
import { DomainEvent } from "../../domain-seedwork/domain-event";
import { DomainEntityProps } from "../../domain-seedwork/domain-entity";
import { EventBus } from "../../domain-seedwork/event-bus";
import { BaseDomainExecutionContext } from "../../domain-seedwork/base-domain-execution-context";
import { PersistanceUnitOfWork } from "../../domain-seedwork/unit-of-work";
import { MemoryRepositoryBase } from "./memory-repository";
import { MemoryStore } from "./memory-store";
import { Visa } from "../../passport-seedwork/visa";
import { InfrastructureContextBase } from "../../infrastructure-seedwork/infrastructure-context-base";

export class MemoryUnitOfWork<
  DomainExecutionContextType extends BaseDomainExecutionContext,
  PropType extends DomainEntityProps, 
  VisaType extends Visa,
  DomainType extends AggregateRoot<PropType, DomainExecutionContextType, VisaType>,
  InfrastructureContextType extends InfrastructureContextBase,
  RepoType extends MemoryRepositoryBase<DomainExecutionContextType, PropType, VisaType, DomainType, InfrastructureContextType>
  > extends PersistanceUnitOfWork<DomainExecutionContextType,PropType, VisaType, DomainType,RepoType,InfrastructureContextType> {
  
  async withTransaction(domainExecutionContext:DomainExecutionContextType, infrastructureContext: InfrastructureContextType, func: (repository: RepoType) => Promise<void>): Promise<void> {
    let repoEvents: DomainEvent[] = [];
    let repo = MemoryRepositoryBase.create(this.bus, this.domainClass, domainExecutionContext, infrastructureContext, this.memoryStore, this.repoClass);
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
    private bus : EventBus, 
    private integrationEventBus: EventBus,
    private domainClass : new (args: PropType, context: DomainExecutionContextType) => DomainType,
    private memoryStore: MemoryStore<PropType>,
    private repoClass : new(
      bus: EventBus, 
      domainClass: new (args: PropType, context: DomainExecutionContextType) => DomainType, 
      domainExecutionContext: DomainExecutionContextType, 
      infrastructureContext: InfrastructureContextType, 
      databaseAggregateRoot: MemoryStore<PropType>) => RepoType,
  ){
    super();
  }

}