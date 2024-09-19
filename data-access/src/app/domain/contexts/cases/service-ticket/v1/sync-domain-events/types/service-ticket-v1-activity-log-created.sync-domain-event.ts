import { SyncDomainEventImpl, SyncDomainEventPayloadBaseType } from "../../../../../../../../../seedwork/event-bus-seedwork-node/sync-domain-event-bus";
import { ServiceTicketV1, ServiceTicketV1Props } from "../../service-ticket-v1";

// define the event
export interface ServiceTicketV1ActivityLogCreatedSyncDomainEventPayload extends SyncDomainEventPayloadBaseType {
}
export class ServiceTicketV1ActivityLogCreatedSyncDomainEvent extends SyncDomainEventImpl<ServiceTicketV1ActivityLogCreatedSyncDomainEventPayload> {}

// handle the event
type DomainType = ServiceTicketV1<ServiceTicketV1Props>;

export function serviceTicketV1ActivityLogCreatedSyncDomainEventHandler (this: DomainType, payload: ServiceTicketV1ActivityLogCreatedSyncDomainEventPayload): void {
    // Implement event processing logic here
    console.log("serviceTicketV1ActivityLogCreatedSyncDomainEvent processed");
}