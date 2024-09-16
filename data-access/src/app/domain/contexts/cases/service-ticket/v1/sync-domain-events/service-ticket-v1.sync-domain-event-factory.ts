import { SyncDomainEventBus } from "../../../../../../../../seedwork/event-bus-seedwork-node/sync-domain-event-bus";
import { ServiceTicketV1CreatedSyncDomainEvent, ServiceTicketV1CreatedSyncDomainEventPayload } from "./types/service-ticket-v1-created.sync-domain-event";


export interface ServiceTicketV1SyncDomainEventFactory {
    addServiceTicketV1CreatedEvent(props: ServiceTicketV1CreatedSyncDomainEventPayload): void
}

export class ServiceTicketV1SyncDomainEventFactoryImpl implements ServiceTicketV1SyncDomainEventFactory {

    constructor (private readonly _syncDomainEventBus: SyncDomainEventBus) {}

    public addServiceTicketV1CreatedEvent(props: ServiceTicketV1CreatedSyncDomainEventPayload): void {
        this._syncDomainEventBus.addEvent(ServiceTicketV1CreatedSyncDomainEvent, props);
    }
}