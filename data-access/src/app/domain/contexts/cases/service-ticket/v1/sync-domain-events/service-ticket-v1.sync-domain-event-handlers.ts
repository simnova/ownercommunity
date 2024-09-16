import { serviceTicketV1ActivityLogCreatedSyncDomainEventHandler } from "./types/service-ticket-v1-activity-log-created.sync-domain-event";
import { serviceTicketV1CreatedSyncDomainEventHandler } from "./types/service-ticket-v1-created.sync-domain-event";

export const ServiceTicketV1SyncDomainEventHandlers= {
    ServiceTicketV1CreatedSyncDomainEvent: serviceTicketV1CreatedSyncDomainEventHandler,
    ServiceTicketV1ActivityLogCreatedSyncDomainEvent: serviceTicketV1ActivityLogCreatedSyncDomainEventHandler,

}




