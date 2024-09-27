import { violationTicketV1ActivityLogCreatedSyncDomainEventHandler } from "./types/violation-ticket-v1-activity-log-created.sync-domain-event";
import { violationTicketV1CreatedSyncDomainEventHandler } from "./types/violation-ticket-v1-created.sync-domain-event";

export const ViolationTicketV1SyncDomainEventHandlers = {
    ViolationTicketV1CreatedSyncDomainEvent: violationTicketV1CreatedSyncDomainEventHandler,
    ViolationTicketV1ActivityLogCreatedSyncDomainEvent: violationTicketV1ActivityLogCreatedSyncDomainEventHandler,
}
