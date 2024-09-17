import { AggregateRootTypeForSyncDomainEvent } from "../../../../../../../../seedwork/domain-seedwork/aggregate-root";
import { ServiceTicketV1ActivityLogCreatedSyncDomainEvent } from "./types/service-ticket-v1-activity-log-created.sync-domain-event";
import { ServiceTicketV1CreatedSyncDomainEvent, ServiceTicketV1CreatedSyncDomainEventPayload } from "./types/service-ticket-v1-created.sync-domain-event";


export interface ServiceTicketV1SyncDomainEventFactory {
    addServiceTicketV1CreatedEvent(props: ServiceTicketV1CreatedSyncDomainEventPayload): void
    addServiceTicketV1ActivityLogCreatedEvent(): void
}

export class ServiceTicketV1SyncDomainEventFactoryImpl implements ServiceTicketV1SyncDomainEventFactory {

    constructor (private readonly root: AggregateRootTypeForSyncDomainEvent) {}

    public addServiceTicketV1CreatedEvent(props: ServiceTicketV1CreatedSyncDomainEventPayload): void {
        this.root.addSyncDomainEvent(ServiceTicketV1CreatedSyncDomainEvent, props);
    }
    public addServiceTicketV1ActivityLogCreatedEvent(): void {
        this.root.addSyncDomainEvent(ServiceTicketV1ActivityLogCreatedSyncDomainEvent, {});
    }
}