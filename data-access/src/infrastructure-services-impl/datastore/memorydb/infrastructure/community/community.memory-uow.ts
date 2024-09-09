import { Community, CommunityProps } from "../../../../../app/domain/contexts/community/community/community";
import { MemoryStore } from "../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryCommunityRepository } from "./community.memory-repository";
import { SyncDomainEventBusInstance, NodeEventBusInstance } from "../../../../../../seedwork/event-bus-seedwork-node";

export const buildMemoryCommunityUnitOfWork = (
  communityMemoryStore: MemoryStore<CommunityProps>,
) => {
  return new MemoryUnitOfWork(SyncDomainEventBusInstance, NodeEventBusInstance, Community, communityMemoryStore, MemoryCommunityRepository);
};