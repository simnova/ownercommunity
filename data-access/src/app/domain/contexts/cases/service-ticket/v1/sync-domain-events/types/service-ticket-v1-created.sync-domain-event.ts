import { SyncDomainEventImpl, SyncDomainEventPayloadBaseType } from "../../../../../../../../../seedwork/event-bus-seedwork-node/sync-domain-event-bus";
import { ServiceTicketV1, ServiceTicketV1Props } from "../../service-ticket-v1";
import { MemberEntityReference } from "../../../../../community/member/member";
import { ActivityDetail } from "../../activity-detail";
import * as ActivityDetailValueObjects from '../../activity-detail.value-objects';

// define the event
export interface ServiceTicketV1CreatedSyncDomainEventPayload extends SyncDomainEventPayloadBaseType {
    requestor: MemberEntityReference
}
export class ServiceTicketV1CreatedSyncDomainEvent extends SyncDomainEventImpl<ServiceTicketV1CreatedSyncDomainEventPayload> {}

// handle the event
type DomainType = ServiceTicketV1<ServiceTicketV1Props>;

export function serviceTicketV1CreatedSyncDomainEventHandler (this: DomainType, payload: ServiceTicketV1CreatedSyncDomainEventPayload): void {
    // Implement event processing logic here
    console.log("ServiceTicketV1CreatedSyncDomainEvent processed");
    let activityDetail = this.props.activityLog.getNewItem();
    let newActivity = new ActivityDetail(activityDetail, this);
    newActivity.ActivityType = ActivityDetailValueObjects.ActivityTypeCodes.Created;
    newActivity.ActivityDescription = 'Created from Sync Domain Event Class 8';
    newActivity.ActivityBy = payload.requestor;
}