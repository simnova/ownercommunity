import { SyncDomainEventBus, SyncDomainEventBusImpl } from "../../../../../../../../seedwork/event-bus-seedwork-node/sync-domain-event-bus";
import { DomainExecutionContext } from "../../../../../domain-execution-context";
import { ServiceTicketV1, ServiceTicketV1Props } from "../service-ticket-v1";
import { ServiceTicketV1Visa } from "../service-ticket.visa";
import { ServiceTicketV1CreatedSyncDomainEvent, ServiceTicketV1CreatedSyncDomainEventPayload } from "./service-ticket-v1-created.sync-domain-event";

type PropType = ServiceTicketV1Props;
type ContextType = DomainExecutionContext;
type VisaType = ServiceTicketV1Visa;

export interface ServiceTicketV1SyncDomainEventFactory 
// extends SyncDomainEventBus<PropType, ContextType, VisaType> 
{
    // registerEvents(root: ServiceTicketV1<ServiceTicketV1Props>): void;
    addServiceTicketV1CreatedEvent(props: ServiceTicketV1CreatedSyncDomainEventPayload): void
}

export class ServiceTicketV1SyncDomainEventFactoryImpl 
// extends SyncDomainEventBusImpl<
//     ServiceTicketV1Props,
//     DomainExecutionContext,
//     ServiceTicketV1Visa
// > 
implements ServiceTicketV1SyncDomainEventFactory{
    // public serviceTicketV1CreatedSyncDomainEvent : ServiceTicketV1CreatedSyncDomainEvent;

    constructor (private readonly _syncDomainEventBus: SyncDomainEventBus<PropType, ContextType, VisaType>) {
        // super();
        // this.serviceTicketV1CreatedSyncDomainEvent = new ServiceTicketV1CreatedSyncDomainEvent();
    }
    // registerEvents(root: ServiceTicketV1<ServiceTicketV1Props>): void {
    //     // this.serviceTicketV1CreatedSyncDomainEvent.processEvent.bind(root);
    // }

    public addServiceTicketV1CreatedEvent(props: ServiceTicketV1CreatedSyncDomainEventPayload): void {
        this._syncDomainEventBus.addEvent(ServiceTicketV1CreatedSyncDomainEvent, props);
    }
}