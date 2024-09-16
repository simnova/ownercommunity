// import { ActivityDetail } from "../../activity-detail"
// import { ServiceTicketV1, ServiceTicketV1Props } from "../../service-ticket-v1"
// import * as ActivityDetailValueObjects from '../../activity-detail.value-objects';
// import { ServiceTicketV1CreatedSyncDomainEvent, ServiceTicketV1CreatedSyncDomainEventProps } from "../types/service-ticket-v1-created";
// import { EventHandlerTuple } from "../../../../../../../../../seedwork/domain-seedwork/aggregate-root";
// // import { ServiceTicketV1SyncDomainEventClass } from "../types";

// const addActivityDetailRecord = function(this: ServiceTicketV1<ServiceTicketV1Props>, event: ServiceTicketV1CreatedSyncDomainEvent) {
//     let activityDetail = this.props.activityLog.getNewItem();
//     let newActivity = new ActivityDetail(activityDetail, this.context, this.visa);
//     newActivity.ActivityType = ActivityDetailValueObjects.ActivityTypeCodes.Created;
//     newActivity.ActivityDescription = 'Created';
//     newActivity.ActivityBy = event.payload.requestor;
// }

// // export const ServiceTicketV1CreatedHandlerAddActivityDetailRecord: EventHandler<ServiceTicketV1CreatedSyncDomainEventProps, ServiceTicketV1CreatedSyncDomainEvent> = {
// //     eventClass: ServiceTicketV1CreatedSyncDomainEvent,
// //     eventHandler: addActivityDetailRecord
// // }

// export const ServiceTicketV1CreatedHandlerAddActivityDetailRecordTuple: EventHandlerTuple<ServiceTicketV1CreatedSyncDomainEventProps,ServiceTicketV1CreatedSyncDomainEvent> = [ServiceTicketV1CreatedSyncDomainEvent, addActivityDetailRecord]