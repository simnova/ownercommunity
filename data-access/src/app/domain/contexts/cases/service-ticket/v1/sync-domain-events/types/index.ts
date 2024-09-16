// // import { CustomDomainEvent } from "../../../../../../../../../seedwork/domain-seedwork/domain-event";
// import { AggregateRoot } from "../../../../../../../../../seedwork/domain-seedwork/aggregate-root";
// import { BaseDomainExecutionContext } from "../../../../../../../../../seedwork/domain-seedwork/base-domain-execution-context";
// import { DomainEntity, DomainEntityProps } from "../../../../../../../../../seedwork/domain-seedwork/domain-entity";
// import { CustomDomainEvent, DomainEvent } from "../../../../../../../../../seedwork/domain-seedwork/domain-event";
// import { Visa } from "../../../../../../../../../seedwork/passport-seedwork/visa";
// import { DomainExecutionContext } from "../../../../../../domain-execution-context";
// import { MemberEntityReference } from "../../../../../community/member/member";
// import { ServiceTicketV1, ServiceTicketV1Props } from "../../service-ticket-v1";
// import { ServiceTicketV1Visa } from "../../service-ticket.visa";
// // import { ServiceTicketV1CreatedSyncDomainEvent, ServiceTicketV1CreatedSyncDomainEventProps } from "./service-ticket-v1-created";

// // export const ServiceTicketV1SyncDomainEventClass = {
// //     ServiceTicketV1Created: ServiceTicketV1CreatedSyncDomainEvent
// // }

// //  const addSyncDomainEventFunc1 = function<EventPayloadType, T extends CustomDomainEvent<EventPayloadType>>(this: ServiceTicketV1<ServiceTicketV1Props>, syncDomainEvent: new (aggregateId: string) => T, payload: T['payload']): void {
// //     let syncDomainEventToAdd = new syncDomainEvent(this.props.id);
// //     syncDomainEventToAdd.payload = payload;
// //     this.addEventToSyncDomainEvents(syncDomainEventToAdd);
// //   }

// //   const addSyncDomainEventFunc = function<EventPayloadType, T extends CustomDomainEvent<EventPayloadType>> (this: ServiceTicketV1<ServiceTicketV1Props>, syncDomainEvent: new (aggregateId: string) => T, payload: T['payload']): void {
// //     let syncDomainEventToAdd = new syncDomainEvent(this.props.id);
// //     syncDomainEventToAdd.payload = payload;
// //     this.addEventToSyncDomainEvents(syncDomainEventToAdd);
// //   }

// //   export const addSyncDomainEventForServiceTicketV1= {
// //     // ServiceTicketV1Created: function<ServiceTicketV1CreatedSyncDomainEvent>(this: ServiceTicketV1<ServiceTicketV1Props>, syncDomainEvent: new (aggregateId: string) => ServiceTicketV1CreatedSyncDomainEvent, payload: ServiceTicketV1CreatedSyncDomainEventProps): void {
// //     //     const syncDomainEventToAdd = new syncDomainEvent(this.props.id);
// //     //     syncDomainEventToAdd.payload = payload;
// //     //     this.addEventToSyncDomainEvents(syncDomainEventToAdd);
// //     //   }
// //     //   ServiceTicketV1Created: function(this: ServiceTicketV1<ServiceTicketV1Props>, payload: ServiceTicketV1CreatedSyncDomainEventProps): void {
// //     //     // const syncDomainEventToAdd = new ServiceTicketV1CreatedSyncDomainEvent(this.props.id);
// //     //     // syncDomainEventToAdd.payload = payload;
// //     //     // this.addEventToSyncDomainEvents(syncDomainEventToAdd);
// //     //     addSyncDomainEventFunc(this, ServiceTicketV1CreatedSyncDomainEvent, payload);
// //     //   },
// //       ServiceTicketV1Created: function(this: ServiceTicketV1<ServiceTicketV1Props>, payload: ServiceTicketV1CreatedSyncDomainEventProps) {
// //         // addSyncDomainEventFunc(this, ServiceTicketV1CreatedSyncDomainEvent, payload);
// //         this.addEventToSyncDomainEvents(ServiceTicketV1CreatedSyncDomainEvent, payload);
// //     }
// // }

// export interface SyncDomainEvenType<T> extends SyncDomainEventBaseType{
//     get payload(): T;
//     set payload(payload: T);
//   }
  
//   export interface SyncDomainEventBaseType {
//     processEvent(): void;
//   }
  
// //   export abstract class DomainEventBase implements DomainEvent {
// //     constructor(private readonly _aggregateId: string) {}
// //     get aggregateId(): string {
// //       return this._aggregateId;
// //     }
// //   }
  
//   export abstract class SyncDomainEventImpl<T> implements SyncDomainEvenType<T> {
//     private _payload: T;
//     get payload(): T {
//       return this._payload;
//     }
//     set payload(payload: T) {
//       this._payload = payload;
//     }
//     abstract processEvent(): void;

//     // public constructor(addEventToBus: () => void) {}
//   }

// type PropType = ServiceTicketV1Props;
// type ContextType = DomainExecutionContext;
// type VisaType = ServiceTicketV1Visa;
// type AggregateRootType = AggregateRoot<PropType, ContextType, VisaType>
// type DomainType = ServiceTicketV1<PropType>;



// ///////////////// Base Abstract Bus ///////////////////////
// export abstract class SyncDomainEventBus <
// PropType extends DomainEntityProps,
// ContextType extends BaseDomainExecutionContext,
// VisaType extends Visa,
// // AggregateRootType extends AggregateRoot<PropType, ContextType, VisaType>
// >{
//     private _syncDomainEvents: SyncDomainEventBaseType[];
//     // private _events: DomainEvent[] = [];
//     // public registerEventClass(event: DomainEvent) { this._events.push(event); }

//     // protected addEvent<EventPayloadType, T extends CustomDomainEvent<EventPayloadType>>(this: AggregateRootType, syncDomainEvent: new (aggregateId: string) => T, payload: EventPayloadType) {
//     //     this.addEventToSyncDomainEvents(syncDomainEvent, payload);
//     // }
//     // abstract register(this: AggregateRootType): void;
//     protected initialize(root: AggregateRoot<PropType, ContextType, VisaType>) {
//         this._syncDomainEvents = [];
//         this.registerEvents(root, this.funcToAddNewEventItemToBus);
//     }
//     protected abstract registerEvents(
//         root: AggregateRoot<PropType, ContextType, VisaType>, 
//         funcToAddNewEventItemToBus: (syncDomainEvent: new () => SyncDomainEvenType<any>, payload: any) => void
//     ): void;

//     protected addEvent<EventPayloadType, T extends SyncDomainEvenType<EventPayloadType>>(
//         // this: AggregateRootType,
//         syncDomainEvent: new () => T, 
//         payload: EventPayloadType
//     ) {
//         let syncDomainEventToAdd = new syncDomainEvent();
//         syncDomainEventToAdd.payload = payload;
//         this._syncDomainEvents.push(syncDomainEventToAdd);
//         // this.addEventToSyncDomainEvents(syncDomainEvent, payload);
//     }

//     funcToAddNewEventItemToBus = (
//         syncDomainEvent: new () => SyncDomainEvenType<any>, payload: any
//     ) => {
//         let syncDomainEventToAdd = new syncDomainEvent();
//         syncDomainEventToAdd.payload = payload;
//         this._syncDomainEvents.push(syncDomainEventToAdd);
//         // this.addEventToSyncDomainEvents(syncDomainEvent, payload);
//     }

//     protected process(root: AggregateRoot<PropType, ContextType, VisaType>) {
//         this._syncDomainEvents.forEach(event => event.processEvent());
//     }
// }


// ///////////////// ServiceTicket Bus ///////////////////////
// export class ServiceTicketV1SyncDomainEventBus extends SyncDomainEventBus<
//     ServiceTicketV1Props,
//     DomainExecutionContext,
//     ServiceTicketV1Visa
//     // ServiceTicketV1<ServiceTicketV1Props>
// > {
//     public readonly serviceTicketV1CreatedSyncDomainEvent : ServiceTicketV1CreatedSyncDomainEvent<ServiceTicketV1Props, DomainExecutionContext, ServiceTicketV1Visa>;
//     public readonly serviceTicketV1UpdatedSyncDomainEvent : ServiceTicketV1UpdatedSyncDomainEvent<ServiceTicketV1Props, DomainExecutionContext, ServiceTicketV1Visa>;

//     constructor () {
//         super();
//         this.serviceTicketV1CreatedSyncDomainEvent = new ServiceTicketV1CreatedSyncDomainEvent();
//         this.serviceTicketV1UpdatedSyncDomainEvent = new ServiceTicketV1UpdatedSyncDomainEvent();
//     }
//     registerEvents(
//         root: ServiceTicketV1<ServiceTicketV1Props>,
//         // funcToAddNewEventItemToBus: (syncDomainEvent: new () => SyncDomainEvenType<any>, payload: any) => void
//     ){
//         this.serviceTicketV1CreatedSyncDomainEvent.processEvent.bind(root);
//         this.serviceTicketV1UpdatedSyncDomainEvent.processEvent.bind(root);
//     }

//     public addServiceTicketV1CreatedEvent(props: ServiceTicketV1CreatedSyncDomainEventProps) {
//         this.addEvent(ServiceTicketV1CreatedSyncDomainEvent, props);
//     }

//     public addServiceTicketV1UpdatedEvent(props: ServiceTicketV1UpdatedSyncDomainEventProps) {
//         this.addEvent(ServiceTicketV1UpdatedSyncDomainEvent, props);
//     }

// //     public addServiceTicketV1CreatedEvent(
// //         // this: ServiceTicketV1<ServiceTicketV1Props>, 
// //         props: ServiceTicketV1CreatedSyncDomainEventProps
// //     ) {
// //         this.addEvent(ServiceTicketV1CreatedSyncDomainEvent, props);
// //     }
// }



// //////////// Event 1
// export interface ServiceTicketV1CreatedSyncDomainEventProps {
//     requestor: MemberEntityReference
// }
// export class ServiceTicketV1CreatedSyncDomainEvent<
//     PropType extends DomainEntityProps,
//     ContextType extends BaseDomainExecutionContext,
//     VisaType extends Visa,
//     > extends SyncDomainEventImpl<ServiceTicketV1CreatedSyncDomainEventProps> 
// {
//     // constructor(private readonly _funcToAddNewEventItemToBus: (syncDomainEvent: new () => SyncDomainEvenType<any>, payload: any) => void) {
//     //     super();
//     // }
//     // processEvent(this: AggregateRoot<ServiceTicketV1Props, DomainExecutionContext, ServiceTicketV1Visa>): void {
//     processEvent(this: ServiceTicketV1<ServiceTicketV1Props>): void {
//         // Implement event processing logic here
//         console.log("ServiceTicketV1CreatedSyncDomainEvent processed");
//     }

//     // addNewEventItemToBus(payload: ServiceTicketV1CreatedSyncDomainEventProps) {
//     //     this._funcToAddNewEventItemToBus(this, payload);
//     // }

// }

// //////////// Event 2
// export interface ServiceTicketV1UpdatedSyncDomainEventProps {
//     requestor: MemberEntityReference
// }
// export class ServiceTicketV1UpdatedSyncDomainEvent<
//     PropType extends DomainEntityProps,
//     ContextType extends BaseDomainExecutionContext,
//     VisaType extends Visa,
//     > extends SyncDomainEventImpl<ServiceTicketV1UpdatedSyncDomainEventProps> 
// {
//     // processEvent(this: AggregateRoot<ServiceTicketV1Props, DomainExecutionContext, ServiceTicketV1Visa>): void {
//     processEvent(this: ServiceTicketV1<ServiceTicketV1Props>): void {
//         // Implement event processing logic here
//         console.log("ServiceTicketV1UpdatedSyncDomainEvent processed");
//     }

// }