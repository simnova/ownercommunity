import { SyncDomainEventImpl, SyncDomainEventPayloadBaseType } from "../../../../../../../../seedwork/event-bus-seedwork-node/sync-domain-event-bus";
import { ServiceTicketV1Props } from "../service-ticket-v1";
import { MemberEntityReference } from "../../../../community/member/member";
import { ActivityDetail } from "../activity-detail";
import * as ActivityDetailValueObjects from '../activity-detail.value-objects';
import { DomainExecutionContext } from "../../../../../domain-execution-context";
import { ServiceTicketV1Visa } from "../service-ticket.visa";
import { AggregateRoot } from "../../../../../../../../seedwork/domain-seedwork/aggregate-root";



export interface ServiceTicketV1CreatedSyncDomainEventPayload extends SyncDomainEventPayloadBaseType {
    requestor: MemberEntityReference
}
export class ServiceTicketV1CreatedSyncDomainEvent extends SyncDomainEventImpl<
// PropType,
// ContextType,
// VisaType,
ServiceTicketV1CreatedSyncDomainEventPayload> 
{
    // static processEvent(this: DomainType, payload: ServiceTicketV1CreatedSyncDomainEventPayload): void {
    //     // Implement event processing logic here
    //     console.log("ServiceTicketV1CreatedSyncDomainEvent processed");
    //     let activityDetail = this.props.activityLog.getNewItem();
    //     let newActivity = new ActivityDetail(activityDetail, this.context, this.visa);
    //     newActivity.ActivityType = ActivityDetailValueObjects.ActivityTypeCodes.Created;
    //     newActivity.ActivityDescription = 'Created from Sync Domain Event Class';
    //     newActivity.ActivityBy = payload.requestor;
    // }
}

type PropType = ServiceTicketV1Props;
type ContextType = DomainExecutionContext;
type VisaType = ServiceTicketV1Visa;
type DomainType = AggregateRoot<PropType, ContextType, VisaType>;

export function serviceTicketV1CreatedSyncDomainEventHandler (this: DomainType, payload: ServiceTicketV1CreatedSyncDomainEventPayload): void {
    // Implement event processing logic here
    console.log("ServiceTicketV1CreatedSyncDomainEvent processed");
    let activityDetail = this.props.activityLog.getNewItem();
    let newActivity = new ActivityDetail(activityDetail, this.context, this.visa);
    newActivity.ActivityType = ActivityDetailValueObjects.ActivityTypeCodes.Created;
    newActivity.ActivityDescription = 'Created from Sync Domain Event Class 2';
    newActivity.ActivityBy = payload.requestor;
}