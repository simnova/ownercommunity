import { SyncDomainEventImpl, SyncDomainEventPayloadBaseType } from "../../../../../../../../../seedwork/event-bus-seedwork-node/sync-domain-event-bus";
import { ViolationTicketV1, ViolationTicketV1Props } from "../../violation-ticket-v1";

// define the event
export interface ViolationTicketV1ActivityLogCreatedSyncDomainEventPayload extends SyncDomainEventPayloadBaseType {
}
export class ViolationTicketV1ActivityLogCreatedSyncDomainEvent extends SyncDomainEventImpl<ViolationTicketV1ActivityLogCreatedSyncDomainEventPayload> {}

// handle the event
type DomainType = ViolationTicketV1<ViolationTicketV1Props>;

export function violationTicketV1ActivityLogCreatedSyncDomainEventHandler (this: DomainType, payload: ViolationTicketV1ActivityLogCreatedSyncDomainEventPayload): void {
    // Implement event processing logic here
    console.log("violationTicketV1ActivityLogCreatedSyncDomainEvent processed");
}
