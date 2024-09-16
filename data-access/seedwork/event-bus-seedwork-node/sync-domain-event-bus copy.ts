import { AggregateRoot } from "../domain-seedwork/aggregate-root";
import { BaseDomainExecutionContext } from "../domain-seedwork/base-domain-execution-context";
import { DomainEntityProps } from "../domain-seedwork/domain-entity";
import { Visa } from "../passport-seedwork/visa";

//// Sync Domain Event
export interface SyncDomainEvenType<PropType extends DomainEntityProps,
ContextType extends BaseDomainExecutionContext,
VisaType extends Visa,T> extends SyncDomainEventBaseType<PropType, ContextType, VisaType> {
    get payload(): T;
    set payload(payload: T);
}
  
export interface SyncDomainEventBaseType<
PropType extends DomainEntityProps,
ContextType extends BaseDomainExecutionContext,
VisaType extends Visa
> {
    processEvent(root: AggregateRoot<PropType, ContextType, VisaType>): void;
}
  
export abstract class SyncDomainEventImpl<PropType extends DomainEntityProps,
ContextType extends BaseDomainExecutionContext,
VisaType extends Visa,T> implements SyncDomainEvenType<PropType, ContextType, VisaType,T> {
    private _payload: T;
    get payload(): T {
      return this._payload;
    }
    set payload(payload: T) {
      this._payload = payload;
    }
    abstract processEvent(root: AggregateRoot<PropType, ContextType, VisaType>): void;
}


//// Sync Domain Event Bus
export interface SyncDomainEventBus <
    PropType extends DomainEntityProps,
    ContextType extends BaseDomainExecutionContext,
    VisaType extends Visa,
> {
    initialize(root: AggregateRoot<PropType, ContextType, VisaType>): void;
    get syncDomainEvents(): SyncDomainEventBaseType<PropType, ContextType, VisaType>[];
    // processAllEvents(root: AggregateRoot<PropType, ContextType, VisaType>): void;
}

export abstract class SyncDomainEventBusImpl <
    PropType extends DomainEntityProps,
    ContextType extends BaseDomainExecutionContext,
    VisaType extends Visa,
> implements SyncDomainEventBus<PropType, ContextType, VisaType> {
    private _syncDomainEvents: SyncDomainEventBaseType<PropType, ContextType, VisaType>[];
    // private _executionContext: ContextType;
    
    // constructor(
    //     private readonly _domainExecutionContext: ContextType,
    //     private readonly _systemExecutionContext: ContextType,
    //     private readonly _visaFunc: (executionContext: ContextType) => VisaType,
    // ) {
    //     this._executionContext = this._domainExecutionContext;
    // }

    protected abstract registerEvents(root: AggregateRoot<PropType, ContextType, VisaType>): void;

    public initialize(root: AggregateRoot<PropType, ContextType, VisaType>): void {
        this._syncDomainEvents = [];
        this.registerEvents(root);
    }

    public get syncDomainEvents(): SyncDomainEventBaseType<PropType, ContextType, VisaType>[] {
        return this._syncDomainEvents;
    }

    protected addEvent<EventPayloadType, T extends SyncDomainEvenType<PropType, ContextType, VisaType, EventPayloadType>>(
        syncDomainEvent: new () => T, 
        payload: EventPayloadType
    ) {
        let syncDomainEventToAdd = new syncDomainEvent();
        syncDomainEventToAdd.payload = payload;
        this._syncDomainEvents.push(syncDomainEventToAdd);
    }

    // public processAllEvents(this: AggregateRoot<PropType, ContextType, VisaType>): void {
    //     this._executionContext = this._systemExecutionContext;
    //     this._syncDomainEvents.forEach(event => event.processEvent());
    //     this._executionContext = this._domainExecutionContext;
    // }
}
