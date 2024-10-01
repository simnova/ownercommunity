import { AggregateRootTypeForSyncDomainEvent } from "../../../../../../../../seedwork/domain-seedwork/aggregate-root";
import { ViolationTicketV1ActivityLogCreatedSyncDomainEvent } from "./types/violation-ticket-v1-activity-log-created.sync-domain-event";
import { ViolationTicketV1CreatedSyncDomainEvent, ViolationTicketV1CreatedSyncDomainEventPayload } from "./types/violation-ticket-v1-created.sync-domain-event";

export interface ViolationTicketV1SyncDomainEventFactory {
    addViolationTicketV1CreatedEvent(props: ViolationTicketV1CreatedSyncDomainEventPayload): void
    addViolationTicketV1ActivityLogCreatedEvent(): void
}

export class ViolationTicketV1SyncDomainEventFactoryImpl implements ViolationTicketV1SyncDomainEventFactory {

    constructor (private readonly root: AggregateRootTypeForSyncDomainEvent) {}

    public addViolationTicketV1CreatedEvent(props: ViolationTicketV1CreatedSyncDomainEventPayload): void {
        this.root.addSyncDomainEvent(ViolationTicketV1CreatedSyncDomainEvent, props);
    }
    public addViolationTicketV1ActivityLogCreatedEvent(): void {
        this.root.addSyncDomainEvent(ViolationTicketV1ActivityLogCreatedSyncDomainEvent, {});
    }
}
