import { CommunityCreatedSyncDomainEvent, CommunityCreatedSyncDomainEventHandlers } from "./community-created.sync-domain-events";

// export const communitySyncDomainEventMap = new Map<string, ((event: CommunityCreatedSyncDomainEvent) => void)[]>([
//     [CommunityCreatedSyncDomainEvent.name, CommunityCreatedSyncDomainEventHandlers]
// ])

// export const communitySyncDomainEventClass= {mg: new (aggregateId: string) => CommunityCreatedSyncDomainEvent};
// // communitySyncDomainEventClass[CommunityCreatedSyncDomainEvent.name] = CommunityCreatedSyncDomainEvent;

export const CommunitySyncDomainEventClass = {
    CommunityCreated : CommunityCreatedSyncDomainEvent
}

export const CommunitySyncDomainEventHandlers = {
    CommunityCreated : CommunityCreatedSyncDomainEventHandlers
}