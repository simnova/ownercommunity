import { CustomDomainEventImpl } from "../../../../../../../../seedwork/domain-seedwork/domain-event"
import { MemberEntityReference } from "../../../../community/member/member"
import { ActivityDetail } from "../activity-detail"
import { ServiceTicketV1, ServiceTicketV1Props } from "../service-ticket-v1"
import * as ActivityDetailValueObjects from '../activity-detail.value-objects';

export interface ServiceTicketV1CreatedSyncDomainEventProps {
    requestor: MemberEntityReference
}
export class ServiceTicketV1CreatedSyncDomainEvent extends CustomDomainEventImpl<ServiceTicketV1CreatedSyncDomainEventProps> {}


const addActivityDetailRecord = function(this: ServiceTicketV1<ServiceTicketV1Props>, event: ServiceTicketV1CreatedSyncDomainEvent) {
    let activityDetail = this.props.activityLog.getNewItem();
    let newActivity = new ActivityDetail(activityDetail, this.context, this.visa);
    newActivity.ActivityType = ActivityDetailValueObjects.ActivityTypeCodes.Created;
    newActivity.ActivityDescription = 'Created';
    newActivity.ActivityBy = event.payload.requestor;
}

export const ServiceTicketV1CreatedSyncDomainEventHandlers: ((event: ServiceTicketV1CreatedSyncDomainEvent) => void)[] = [
    addActivityDetailRecord
]