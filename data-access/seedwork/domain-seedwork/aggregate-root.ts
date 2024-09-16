// import { ServiceTicketV1CreatedSyncDomainEvent, ServiceTicketV1CreatedSyncDomainEventHandlers } from '../../src/app/domain/contexts/cases/service-ticket/v1/sync-domain-events/service-ticket-v1-created';
// import { ServiceTicketV1SyncDomainEvents, SyncDomainEventBase } from '../../src/app/domain/contexts/cases/service-ticket/v1/sync-domain-events/types';
import { SyncDomainEventBus, SyncDomainEventBusImpl, SyncDomainEventType } from '../event-bus-seedwork-node/sync-domain-event-bus';
import { Visa } from '../passport-seedwork/visa';
import { BaseDomainExecutionContext } from './base-domain-execution-context';
import { DomainEntity, DomainEntityProps } from './domain-entity';
import { CustomDomainEvent, DomainEvent } from './domain-event';

export interface RootEventRegistry<
  PropType extends DomainEntityProps,
  ContextType extends BaseDomainExecutionContext,
  VisaType extends Visa
> {
  addDomainEvent<EventProps, T extends CustomDomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']);
  addIntegrationEvent<EventProps, T extends CustomDomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']);
  get visa(): Visa;
  // get syncDomainEventBus(): SyncDomainEventBus<PropType, ContextType, VisaType>;
  processSyncDomainEventBus(root: AggregateRoot<PropType, ContextType, VisaType>): void;
  // getSyncDomainEventBus<T extends SyncDomainEventBusImpl<PropType, ContextType, VisaType>>(): T; 
  // getSyncDomainEventBus<T extends SyncDomainEventBusImpl<PropType, ContextType, VisaType>>(): T; 
  //SyncDomainEventBase<any, any, any>;
  // get syncDomainEventMap(): any; //{[key: string]: EventMap<any, any>} 
  // addEventToSyncDomainEvents<EventPayloadType, T extends CustomDomainEvent<EventPayloadType>> (syncDomainEvent: new (aggregateId: string) => T, payload: T['payload']): void;
  // get addSyncDomainEventFor(): {ServiceTicketV1Created: (payload: any) => void};
}

// export interface EventHandler <EventPayloadType, T extends CustomDomainEvent<EventPayloadType>>{
//   eventClass: new (aggregateId: string) => T;
//   eventHandler: ((event: T) => void);
// }

// export type EventHandlerTuple <EventPayloadType, T extends CustomDomainEvent<EventPayloadType>> = [
//   new (aggregateId: string) => T, //eventClass
//   ((event: T) => void), //eventHandler
// ]


export  class AggregateRoot<
  PropType extends DomainEntityProps,
  ContextType extends BaseDomainExecutionContext,
  VisaType extends Visa
> extends DomainEntity<PropType> implements RootEventRegistry<PropType, ContextType, VisaType> {
  private _executionContext: ContextType;
  // private readonly _syncDomainEventMap: Map<string, Array<(event: any) => void>> = new Map<string, Array<(event: any) => void>>();
  private readonly _syncDomainEventBus: SyncDomainEventBus<PropType, ContextType, VisaType>;

  constructor(
    props: PropType, 
    private readonly _domainExecutionContext: ContextType,
    private readonly _systemExecutionContext: ContextType,
    private readonly _visaFunc: (executionContext: ContextType) => VisaType,
    // private readonly _syncDomainEventBus: SyncDomainEventBus<PropType, ContextType, VisaType>, //SyncDomainEventBusImpl<PropType, ContextType, VisaType>,
    // private readonly _syncDomainEventClass: ServiceTicketV1SyncDomainEvents, //SyncDomainEventBase<PropType, ContextType, VisaType>,
    // private readonly _addSyncDomainEventFor: any,
    private readonly _syncDomainEventHandlers: any,
    // private readonly _syncDomainEventHandlers: EventHandlerTuple<any, any>[], //{[key: string]: ((event: any) => void)[]},
    // private readonly _syncDomainEventMap: any //{[key: string]: EventMap<any, any>} 
    // private readonly _aggregateRootSyncDomainEventMap: {[key: string]: EventHandler<any, any>} 
  ) {
    super(props);
    this._executionContext = this._domainExecutionContext;
    this._syncDomainEventBus = new SyncDomainEventBusImpl<PropType, ContextType, VisaType>();
    // this._syncDomainEventBus.initialize.bind(this);
    // this.registerSyncDomainEvents(this._syncDomainEventClass);
    // this._syncDomainEventHandlers.forEach((eventHandlerTuple) => { //[eventClass, eventHandler]
    //   eventHandlerTuple[1].bind(this);
    //   // value['eventHandlers'].forEach(f => f.bind(this));
    //   // this._syncDomainEventMap.set(key, value);
    // });
  }

  // protected initializeSyncDomainEventBus(syncDomainEventBus: SyncDomainEventBus<PropType, ContextType, VisaType>): void {
  //   // this.__syncDomainEventBus = syncDomainEventBus;
  //   // this.__syncDomainEventBus.initialize.bind(this);
  //   syncDomainEventBus.initialize(this);
  // }
  // public processSyncDomainEventBus(this: AggregateRoot<PropType, ContextType, VisaType>): void {
  //   this._executionContext = this._systemExecutionContext;
  //   this.__syncDomainEventBus.syncDomainEvents.forEach(event => event.processEvent(this));
  //   this._executionContext = this._domainExecutionContext;
// }
  // registerSyncDomainEvents(syncDomainEventClass: SyncDomainEventBase<PropType, ContextType, VisaType>) {
  //   // Loop through all properties of syncDomainEventClass' prototype to bind methods
  //   Object.getOwnPropertyNames(Object.getPrototypeOf(syncDomainEventClass))
  //     .filter(prop => typeof syncDomainEventClass[prop] === 'function')
  //     .forEach(method => {
  //       // Bind each method to the current instance of AggregateRoot
  //       (this as any)[method] = syncDomainEventClass[method].bind(this);
  //     });
  // }

  // public get addSyncDomainEventFor(): typeof this._addSyncDomainEventFor {
  //   return this._addSyncDomainEventFor as typeof this._addSyncDomainEventFor;
  // }
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

  protected get syncDomainEventBus(): SyncDomainEventBus<PropType, ContextType, VisaType> {
    return this._syncDomainEventBus;
  }
  // public getSyncDomainEventBus<T extends SyncDomainEventBusImpl<PropType, ContextType, VisaType>>(): T {
  //   return this._syncDomainEventBus;
  // }
  // private _syncDomainEvents: DomainEvent[] = [];
  // public addEventToSyncDomainEvents(event: DomainEvent): void {
  //   this._syncDomainEvents.push(event);
  //   }
  //   private getSyncDomainEvents(): DomainEvent[] {
  //     return this._syncDomainEvents;
  //   }
    
    // public addSyncDomainEventFor(){
  //   return this._addSyncDomainEventFor;
  // }
  // public addEventToSyncDomainEvents<EventPayloadType, T extends CustomDomainEvent<EventPayloadType>> (syncDomainEvent: new (aggregateId: string) => T, payload: T['payload']): void {
  //   let syncDomainEventToAdd = new syncDomainEvent(this.props.id);
  //   syncDomainEventToAdd.payload = payload;
  //   this._syncDomainEvents.push(syncDomainEventToAdd);
  // }
  // private clearSyncDomainEvents (): void {
  //   this._syncDomainEvents.splice(0, this._syncDomainEvents.length);
  // }
  
  public processSyncDomainEventBus() {
    this._executionContext = this._systemExecutionContext;
    while (this._syncDomainEventBus.events.length > 0){
      // Create a copy of the array to preserve the original domain events
      const syncDomainEventsToProcess: SyncDomainEventType<any>[] = [...this._syncDomainEventBus.events];

      // Clear the internal list of domain events
      this._syncDomainEventBus.clearEvents();

      syncDomainEventsToProcess.forEach((event) => this.dispatchSyncDomainEvent(event));
      // for await (let event of item.getDomainEvents()) {
      //   console.log(`Repo dispatching DomainEvent : ${JSON.stringify(event)}`);
      //   await this.domainEventBus.dispatch(event as any, event['payload']);
      // }
    } ;
  }
  private dispatchSyncDomainEvent(event: SyncDomainEventType<any>): void {
    const payload = event.payload;
    const eventClassName = event.constructor.name;
    const eventHandler = this._syncDomainEventHandlers[eventClassName];
    if (eventHandler) {
      eventHandler.bind(this)(payload);
    }
    // if (currentEventMap) {
    //   // const handlers: any[] = this.handlersMap[eventClassName];
    //   for (let handler of currentEventMap.eventHandlers!) {
    //     handler.bind(this)(event);
    //   }
    // }
    // event.processEvent.bind(this)(payload);
  }
    /*
    // const currentEventMap = this._syncDomainEventMap[eventClassName];
    // if (currentEventMap) {
    //   // const handlers: any[] = this.handlersMap[eventClassName];
    //   for (let handler of currentEventMap.eventHandlers!) {
    //     handler.bind(this)(event);
    //   }
    // }
  }
  // public get syncDomainEventMap(): any {// {[key: string]: EventMap<any, any>} {
  //   return this._syncDomainEventMap;
  // }
  public get syncDomainEventClass() {
      return this._syncDomainEventClass;
      // const __syncDomainEventClass = {}
      // const syncDomainEventMap = new Map<any, any>();
      // syncDomainEventMap.set(ServiceTicketV1CreatedSyncDomainEvent, ServiceTicketV1CreatedSyncDomainEventHandlers);
      // //get all the keys of the map
      // syncDomainEventMap.forEach((value, key) => {
      //   __syncDomainEventClass[key.name] = key;
      // });
      // return __syncDomainEventClass;
  }
*/
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
