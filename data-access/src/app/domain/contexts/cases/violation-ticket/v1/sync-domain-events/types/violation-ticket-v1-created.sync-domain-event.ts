import { SyncDomainEventImpl, SyncDomainEventPayloadBaseType } from "../../../../../../../../../seedwork/event-bus-seedwork-node/sync-domain-event-bus";
import { ViolationTicketV1, ViolationTicketV1Props } from "../../violation-ticket";
import { MemberEntityReference } from "../../../../../community/member/member";
import { ActivityDetail } from "../../activity-detail";
import * as ActivityDetailValueObjects from '../../activity-detail.value-objects';

// define the event
export interface ViolationTicketV1CreatedSyncDomainEventPayload extends SyncDomainEventPayloadBaseType {
    requestor: MemberEntityReference
}
export class ViolationTicketV1CreatedSyncDomainEvent extends SyncDomainEventImpl<ViolationTicketV1CreatedSyncDomainEventPayload> {}

// handle the event
type DomainType = ViolationTicketV1<ViolationTicketV1Props>;

export function violationTicketV1CreatedSyncDomainEventHandler (this: DomainType, payload: ViolationTicketV1CreatedSyncDomainEventPayload): void {
    // Implement event processing logic here
    console.log("ViolationTicketV1CreatedSyncDomainEvent processed");
    let activityDetail = this.props.activityLog.getNewItem();
    let newActivity = new ActivityDetail(activityDetail, this.context, this.visa);
    newActivity.ActivityType = ActivityDetailValueObjects.ActivityTypeCodes.Created;
    newActivity.ActivityDescription = 'Created from Sync Domain Event Class';
    newActivity.setActivityBy();
}
