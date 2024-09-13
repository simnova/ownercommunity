import { Visa } from '../passport-seedwork/visa';
import { BaseDomainExecutionContext } from './base-domain-execution-context';
import { DomainEntity, DomainEntityProps } from './domain-entity';
import { CustomDomainEvent, DomainEvent } from './domain-event';

export interface RootEventRegistry {
  addDomainEvent<EventProps, T extends CustomDomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']);
  addIntegrationEvent<EventProps, T extends CustomDomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']);
  get visa(): Visa;
  get syncDomainEventClass(): any;
}

export  class AggregateRoot<
  PropType extends DomainEntityProps,
  ContextType extends BaseDomainExecutionContext,
  VisaType extends Visa
> extends DomainEntity<PropType> implements RootEventRegistry {
  private _executionContext: ContextType;
  private readonly _syncDomainEventMap: Map<string, Array<(event: any) => void>> = new Map<string, Array<(event: any) => void>>();

  constructor(
    props: PropType, 
    private readonly _domainExecutionContext: ContextType,
    private readonly _systemExecutionContext: ContextType,
    private readonly _visaFunc: (executionContext: ContextType) => VisaType,
    private readonly _syncDomainEventHandlers: {[key: string]: ((event: any) => void)[]},
    private readonly _syncDomainEventClass: any
  ) {
    super(props);
    this._executionContext = this._domainExecutionContext;
    Object.entries(this._syncDomainEventHandlers).forEach(([key, value]) => {
      value.forEach(f => f.bind(this));
      this._syncDomainEventMap.set(key, value);
    });
  }

  public get context(): ContextType {
    return this._executionContext;
  }
  public get visa(): VisaType {
    return this._visaFunc(this._executionContext);
  }

  private _isDeleted: boolean = false;
  public get isDeleted(): boolean {
    return this._isDeleted;
  }
  protected set isDeleted(value: boolean) {
    this._isDeleted = value;
  }

  private _syncDomainEvents: DomainEvent[] = [];
  public addSyncDomainEvent<EventPayloadType, T extends CustomDomainEvent<EventPayloadType>> (syncDomainEvent: new (aggregateId: string) => T, payload: T['payload']): void {
    let syncDomainEventToAdd = new syncDomainEvent(this.props.id);
    syncDomainEventToAdd.payload = payload;
    this._syncDomainEvents.push(syncDomainEventToAdd);
  }
  public clearSyncDomainEvents (): void {
    this._syncDomainEvents.splice(0, this._syncDomainEvents.length);
  }
  public getSyncDomainEvents(): DomainEvent[] {
    return this._syncDomainEvents;
  }
  public processSyncDomainEvents() {
    this._executionContext = this._systemExecutionContext;
    do{
      // Create a copy of the array to preserve the original domain events
      const syncDomainEventsToProcess: DomainEvent[] = [...this.getSyncDomainEvents()];

      // Clear the internal list of domain events
      this.clearSyncDomainEvents();

      syncDomainEventsToProcess.forEach((event: DomainEvent) => this.dispatchSyncDomainEvent(event));
      // for await (let event of item.getDomainEvents()) {
      //   console.log(`Repo dispatching DomainEvent : ${JSON.stringify(event)}`);
      //   await this.domainEventBus.dispatch(event as any, event['payload']);
      // }
    } while (this.getSyncDomainEvents().length > 0);
  }
  private dispatchSyncDomainEvent<T extends DomainEvent> (event: T): void {
    const eventClassName: string = event.constructor.name;

    if (this._syncDomainEventMap.has(eventClassName)) {
      // const handlers: any[] = this.handlersMap[eventClassName];
      for (let handler of this._syncDomainEventMap.get(eventClassName)!) {
        handler.bind(this)(event);
      }
    }
  }
  public get syncDomainEventClass(): any {
      return this._syncDomainEventClass;
  }

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

  public onSave(isModified: boolean): void {
    //override this method to do something on save
  }
}
