import { SyncDomainEventBus, SyncDomainEventBusImpl, SyncDomainEventType } from '../event-bus-seedwork-node/sync-domain-event-bus';
import { Visa } from '../passport-seedwork/visa';
import { BaseDomainExecutionContext } from './base-domain-execution-context';
import { DomainEntity, DomainEntityProps } from './domain-entity';
import { CustomDomainEvent, DomainEvent } from './domain-event';

export interface RootEventRegistry <ContextType extends BaseDomainExecutionContext>{
  addDomainEvent<EventProps, T extends CustomDomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']);
  addIntegrationEvent<EventProps, T extends CustomDomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']);
  get context(): ContextType;
  get visa(): Visa;
}

export interface RootEventRegistryForRepo {
  processSyncDomainEventBus(): void;
}

export  class AggregateRoot<PropType extends DomainEntityProps, ContextType extends BaseDomainExecutionContext, VisaType extends Visa> 
  extends DomainEntity<PropType> 
  implements RootEventRegistry<ContextType>, RootEventRegistryForRepo
{
  private _executionContext: ContextType;
  private readonly _syncDomainEventBus: SyncDomainEventBus;

  constructor(
    props: PropType, 
    private readonly _domainExecutionContext: ContextType,
    private readonly _systemExecutionContext: ContextType,
    private readonly _visaFunc: (executionContext: ContextType) => VisaType,
    private readonly _syncDomainEventHandlers: any,
  ) {
    super(props);
    this._executionContext = this._domainExecutionContext;
    this._syncDomainEventBus = new SyncDomainEventBusImpl();
  }

  // for context
  public get context(): ContextType {
    return this._executionContext;
  }
  public get visa(): VisaType {
    return this._visaFunc(this._executionContext);
  }

  // for delete
  private _isDeleted: boolean = false;
  public get isDeleted(): boolean {
    return this._isDeleted;
  }
  protected set isDeleted(value: boolean) {
    this._isDeleted = value;
  }

  // for sync domain event bus
  protected get syncDomainEventBus(): SyncDomainEventBus {
    return this._syncDomainEventBus;
  }  
  public processSyncDomainEventBus() {
    this._executionContext = this._systemExecutionContext;
    while (this._syncDomainEventBus.events.length > 0){
      console.log("Processing sync domain events...");
      // Create a copy of the array to preserve the original domain events
      const syncDomainEventsToProcess: SyncDomainEventType<any>[] = [...this._syncDomainEventBus.events];

      // Clear the internal list of domain events
      this._syncDomainEventBus.clearEvents();

      syncDomainEventsToProcess.forEach((event) => this.dispatchSyncDomainEvent(event));
    } ;
  }
  private dispatchSyncDomainEvent(event: SyncDomainEventType<any>): void {
    const payload = event.payload;
    const eventClassName = event.constructor.name;
    const eventHandler = this._syncDomainEventHandlers[eventClassName];
    if (eventHandler) {
      eventHandler.bind(this)(payload);
    }
  }

  // for domain events
  private domainEvents: DomainEvent[] = [];
  public addDomainEvent<EventProps, T extends CustomDomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']) {
    let eventToAdd = new event(this.props.id);
    eventToAdd.payload = props;
    this.domainEvents.push(eventToAdd);
  }
  public clearDomainEvents() {
    this.domainEvents = [];
  }
  public getDomainEvents(): DomainEvent[] {
    return this.domainEvents;
  }

  // for integration events
  private integrationEvents: DomainEvent[] = [];
  public addIntegrationEvent<EventProps, T extends CustomDomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']) {
    let eventToAdd = new event(this.props.id);
    eventToAdd.payload = props;
    this.integrationEvents.push(eventToAdd);
  }
  public clearIntegrationEvents() {
    this.integrationEvents = [];
  }
  public getIntegrationEvents(): DomainEvent[] {
    return this.integrationEvents;
  }

  // for save
  public onSave(isModified: boolean): void {
    //override this method to do something on save
  }
}
