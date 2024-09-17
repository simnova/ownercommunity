import { SyncDomainEventPayloadBaseType, SyncDomainEventType } from '../event-bus-seedwork-node/sync-domain-event-bus';
import { Visa } from '../passport-seedwork/visa';
import { BaseDomainExecutionContext } from './base-domain-execution-context';
import { DomainEntity, DomainEntityProps } from './domain-entity';
import { CustomDomainEvent, DomainEvent } from './domain-event';

// creating separate interfaces to be used in different contexts
export interface AggregateRootTypeForApplicationService <ContextType extends BaseDomainExecutionContext>{
  addDomainEvent<EventProps, T extends CustomDomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']);
  addIntegrationEvent<EventProps, T extends CustomDomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']);
  get context(): ContextType;
  get visa(): Visa;
}

export interface AggregateRootTypeForSyncDomainEvent {
  addSyncDomainEvent<EventPayloadType extends SyncDomainEventPayloadBaseType, T extends SyncDomainEventType<EventPayloadType>>(event: new () => T, payload: EventPayloadType) : void;
}
export interface AggregateRootTypeForInfrastructureService {
  processSyncDomainEvents(): void;
}

export  class AggregateRoot<PropType extends DomainEntityProps, ContextType extends BaseDomainExecutionContext, VisaType extends Visa> 
  extends DomainEntity<PropType> 
  implements AggregateRootTypeForApplicationService<ContextType>, AggregateRootTypeForInfrastructureService, AggregateRootTypeForSyncDomainEvent
{
  private _executionContext: ContextType;
  private _syncDomainEvents: SyncDomainEventType<any>[] = [];

  constructor(
    props: PropType, 
    private readonly _domainExecutionContext: ContextType,
    private readonly _systemExecutionContext: ContextType,
    private readonly _visaFunc: (executionContext: ContextType) => VisaType,
    private readonly _syncDomainEventHandlers: any,
  ) {
    super(props);
    this._executionContext = this._domainExecutionContext;
  }

  // for context
  public get context(): ContextType {
    return this._executionContext;
  }
  public get systemExecutionContext(): ContextType {
    return this._systemExecutionContext;
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

  // for sync domain event
  public addSyncDomainEvent<EventPayloadType extends SyncDomainEventPayloadBaseType, T extends SyncDomainEventType<EventPayloadType>>(event: new () => T, payload: EventPayloadType) : void {
      let eventToAdd = new event();
      eventToAdd.payload = payload;
      this._syncDomainEvents.push(eventToAdd);
  }
  public get syncDomainEvents(): SyncDomainEventType<any>[] {
      return this._syncDomainEvents;
  }
  public get syncDomainEventHandlers(): any {
      return this._syncDomainEventHandlers;
  }
  public processSyncDomainEvents(maxIterations: number = 100) {
    this._executionContext = this.systemExecutionContext;
    let iterations = 0;
    while (this.syncDomainEvents.length > 0){
      if (iterations >= maxIterations) {
        console.warn("Max iterations reached while processing sync domain events.");
        break;
      }
      iterations++;
      console.log("Processing sync domain events...");

      const event = this.syncDomainEvents.shift();
      if (event) {
        const eventHandler = this.syncDomainEventHandlers[event.constructor.name];
        if (eventHandler) {
          eventHandler.call(this, event.payload);
        }
      }
    } ;
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
