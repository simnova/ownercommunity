// import { SystemExecutionContext } from '../../src/app/domain/domain-execution-context';
// import { communitySyncDomainEventClass } from '../../src/app/domain/contexts/community/community/sync-domain-events';
import { Visa } from '../passport-seedwork/visa';
import { BaseDomainExecutionContext } from './base-domain-execution-context';
import { DomainEntity, DomainEntityProps } from './domain-entity';
import { DomainEvent, DomainEventBase } from './domain-event';

export interface RootEventRegistry {
  addDomainEvent<EventProps, T extends DomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']);
  addIntegrationEvent<EventProps, T extends DomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']);
  get visa(): Visa;
  // get syncDomainEventList(): { [key: string]: (new (...args) => any) };
}

export  class AggregateRoot<
  PropType extends DomainEntityProps, 
  DomainExecutionContext extends BaseDomainExecutionContext,
  VisaType extends Visa
> 
  extends DomainEntity<PropType> 
  implements RootEventRegistry {
  private _executionContext: DomainExecutionContext;
  // private _visa: VisaType;
  // private _t = "temporary text";
  // private readonly _syncDomainEventList: string[];
  // private readonly _syncDomainEventClass: { [key: string]: any } = {};

  

  private readonly _syncDomainEventMap: Map<string, Array<(event: any) => void>> = new Map<string, Array<(event: any) => void>>();
  constructor(
    props: PropType, 
    // private readonly _domainVisa: VisaType,
    // private readonly _systemVisa: VisaType,
    private readonly _domainExecutionContext: DomainExecutionContext,
    private readonly _systemExecutionContext: DomainExecutionContext,
    private readonly _visaFunc: (executionContext: DomainExecutionContext) => VisaType,
    // private readonly _syncDomainEventMap: Map<string, Array<(event: any) => void>>//{[key: string]: []}// Array<() => void>}
    private readonly _syncDomainEventHandlers: {[key: string]: ((event: any) => void)[]} //((event: any) => void)[]
  ) {
    super(props);
    // this._visa = this._domainVisa;
    this._executionContext = this._domainExecutionContext;
    // this._syncDomainEventMap.();
    // const m = new Map<string, Array<() => void>>([
    //   ['AccountPortal', [
    //     () => {console.log(`before ${this._t} after`)}
    //   ]],
    // ])
    // m.get('AccountPortal')?.forEach(f => f.bind(this));
    Object.entries(this._syncDomainEventHandlers).forEach(([key, value]) => {
      value.forEach(f => f.bind(this));
      this._syncDomainEventMap.set(key, value);
    }
    );
    // this._syncDomainEventHandlers.map((value, key) => {
    //   value.forEach(f => f.bind(this));
    //   // this._syncDomainEventClass[cls.name] = cls
    // });
    // this._syncDomainEventList = Array.from(this._syncDomainEventMap.keys());
  }

  // public get syncDomainEventList(): { [key: string]: (new (...args) => any) } {
  //   // return this._syncDomainEventList;
  //   return communitySyncDomainEventClass;
  // }

  public get visa(): VisaType {
    return this._visaFunc(this._executionContext);
    // return this._visa;
  }

  public get _context(): DomainExecutionContext {
    return this._executionContext;
  }

  // public executeAsDomainEvent(func:(() => void)) : void {
  //   this.executionContext = SystemExecutionContext();
  //   func();
  //   this.executionContext = this._domainExecutionContext;
  // }

  public processSyncDomainEvents() {
    this._executionContext = this._systemExecutionContext;
    do{
      let syncDomainEventsToProcess: DomainEventBase[] = this.getSyncDomainEvents();
      this.clearSyncDomainEvents();
      syncDomainEventsToProcess.forEach((event: DomainEventBase) => this.dispatchSyncDomainEvent(event));
      // for await (let event of item.getDomainEvents()) {
      //   console.log(`Repo dispatching DomainEvent : ${JSON.stringify(event)}`);
      //   await this.domainEventBus.dispatch(event as any, event['payload']);
      // }
    } while (this.getSyncDomainEvents().length > 0);
  }

  private dispatchSyncDomainEvent<T extends DomainEventBase> (event: T): void {
    const eventClassName: string = event.constructor.name;

    if (this._syncDomainEventMap.has(eventClassName)) {
      // const handlers: any[] = this.handlersMap[eventClassName];
      for (let handler of this._syncDomainEventMap.get(eventClassName)!) {
        handler(event);
      }
    }
  }

  private _isDeleted: boolean = false;
  public get isDeleted(): boolean {
    return this._isDeleted;
  }
  protected set isDeleted(value: boolean) {
    this._isDeleted = value;
  }

  private _syncDomainEvents: DomainEventBase[] = [];
  public addSyncDomainEvent<EventPayloadType, T extends DomainEvent<EventPayloadType>> (syncDomainEvent: new (aggregateId: string) => T, payload: T['payload']): void {
    let syncDomainEventToAdd = new syncDomainEvent(this.props.id);
    syncDomainEventToAdd.payload = payload;
    this._syncDomainEvents.push(syncDomainEventToAdd);
  }
  public clearSyncDomainEvents (): void {
    this._syncDomainEvents.splice(0, this._syncDomainEvents.length);
  }
  public getSyncDomainEvents(): DomainEventBase[] {
    return this._syncDomainEvents;
  }

  private domainEvents: DomainEventBase[] = [];
  public addDomainEvent<EventProps, T extends DomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']) {
    let eventToAdd = new event(this.props.id);
    eventToAdd.payload = props;
    this.domainEvents.push(eventToAdd);
  }
  public clearDomainEvents() {
    this.domainEvents = [];
  }
  public getDomainEvents(): DomainEventBase[] {
    return this.domainEvents;
  }

  private integrationEvents: DomainEventBase[] = [];
  public addIntegrationEvent<EventProps, T extends DomainEvent<EventProps>>(event: new (aggregateId: string) => T, props: T['payload']) {
    let eventToAdd = new event(this.props.id);
    eventToAdd.payload = props;
    this.integrationEvents.push(eventToAdd);
  }
  public clearIntegrationEvents() {
    this.integrationEvents = [];
  }
  public getIntegrationEvents(): DomainEventBase[] {
    return this.integrationEvents;
  }

  public onSave(isModified: boolean): void {
    //override this method to do something on save
  }
}
