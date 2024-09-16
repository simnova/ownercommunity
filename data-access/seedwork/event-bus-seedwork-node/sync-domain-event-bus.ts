import { AggregateRoot } from "../domain-seedwork/aggregate-root";
import { BaseDomainExecutionContext } from "../domain-seedwork/base-domain-execution-context";
import { DomainEntityProps } from "../domain-seedwork/domain-entity";
import { Visa } from "../passport-seedwork/visa";


//// Sync Domain Event
export interface SyncDomainEventPayloadBaseType {}
// export interface SyncDomainEventBaseType
// <
// PropType extends DomainEntityProps,
// ContextType extends BaseDomainExecutionContext,
// VisaType extends Visa
// > 
// {
// }
export interface SyncDomainEventType<
// PropType extends DomainEntityProps,
// ContextType extends BaseDomainExecutionContext,
// VisaType extends Visa,
EventPayloadType extends SyncDomainEventPayloadBaseType
>
// extends SyncDomainEventBaseType<PropType, ContextType, VisaType> 
{
    get payload(): EventPayloadType;
    set payload(payload: EventPayloadType);
    // processEvent(this: AggregateRoot<PropType, ContextType, VisaType>, payload: EventPayloadType): void;
}
  

  
export abstract class SyncDomainEventImpl
    <
        // PropType extends DomainEntityProps,
        // ContextType extends BaseDomainExecutionContext,
        // VisaType extends Visa,
        EventPayloadType extends SyncDomainEventPayloadBaseType
    > 
    implements SyncDomainEventType<EventPayloadType> //<PropType, ContextType, VisaType, EventPayloadType> 
{
    private _payload: EventPayloadType;
    get payload(): EventPayloadType {
      return this._payload;
    }
    set payload(payload: EventPayloadType) {
      this._payload = payload;
    }

    // static processEvent(this: AggregateRoot<PropType, ContextType, VisaType>, payload: EventPayloadType): void {
    //     throw new Error("Method not implemented.");
    // }
}


//// Sync Domain Event Bus
export interface SyncDomainEventBus <
    PropType extends DomainEntityProps,
    ContextType extends BaseDomainExecutionContext,
    VisaType extends Visa,
> {
    // initialize(root: AggregateRoot<PropType, ContextType, VisaType>): void;
    // get events(): SyncDomainEventType<PropType, ContextType, VisaType, any>[];
    get events(): SyncDomainEventType< any>[];
    // addEvent<EventPayloadType extends SyncDomainEventPayloadBaseType, EventType extends SyncDomainEventType<PropType, ContextType, VisaType, EventPayloadType>>(
    addEvent<EventPayloadType extends SyncDomainEventPayloadBaseType, EventType extends SyncDomainEventType<EventPayloadType>>(
        event: new () => EventType, 
        payload: EventPayloadType
    ) : void
    clearEvents (): void;
    // dispatch(: AggregateRoot<PropType, ContextType, VisaType>): void;
}

export class SyncDomainEventBusImpl <
    PropType extends DomainEntityProps,
    ContextType extends BaseDomainExecutionContext,
    VisaType extends Visa,
> implements SyncDomainEventBus<PropType, ContextType, VisaType> {
    private _events: SyncDomainEventType<any>[] = [];
    // private _events: SyncDomainEventType<PropType, ContextType, VisaType, any>[] = [];
    // private _executionContext: ContextType;
    
    // constructor(
    //     private readonly _domainExecutionContext: ContextType,
    //     private readonly _systemExecutionContext: ContextType,
    //     private readonly _visaFunc: (executionContext: ContextType) => VisaType,
    // ) {
    //     this._executionContext = this._domainExecutionContext;
    // }

    // protected abstract registerEvents(root: AggregateRoot<PropType, ContextType, VisaType>): void;

    // public initialize(root: AggregateRoot<PropType, ContextType, VisaType>): void {
    //     this._syncDomainEvents = [];
    //     // this.registerEvents(root);
    // }

    // public get events(): SyncDomainEventType<PropType, ContextType, VisaType, any>[] {
    public get events(): SyncDomainEventType<any>[] {
        return this._events;
    }

    // public addEvent<EventPayloadType extends any, T extends SyncDomainEventType<PropType, ContextType, VisaType, EventPayloadType>>(
    public addEvent<EventPayloadType extends any, T extends SyncDomainEventType<EventPayloadType>>(
        event: new () => T, 
        payload: EventPayloadType
    ) : void {
        let eventToAdd = new event();
        eventToAdd.payload = payload;
        this._events.push(eventToAdd);
    }

    public clearEvents (): void {
        this._events.splice(0, this._events.length);
    }

    
    // public dispatch(this: AggregateRoot<PropType, ContextType, VisaType>): void {
    //     this._executionContext = this._systemExecutionContext;
    //     this._syncDomainEvents.forEach(event => event.processEvent());
    //     this._executionContext = this._domainExecutionContext;
    // }
}

// //// Sync Domain Event Handler
// export interface SyncDomainEventHandlers <
//     PropType extends DomainEntityProps,
//     ContextType extends BaseDomainExecutionContext,
//     VisaType extends Visa,
//     DomainType extends AggregateRoot<PropType, ContextType, VisaType>,
//     EventPayloadType extends SyncDomainEventPayloadBaseType,
// > {
//     [key: string]: (this: DomainType, payload: EventPayloadType) => void;
// }