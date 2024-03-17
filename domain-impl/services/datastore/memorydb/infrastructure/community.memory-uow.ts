import { Community, CommunityProps } from "../../../../../domain/contexts/community/community";
import { MemoryStore } from "../../../../../domain-impl-seedwork-datastore-memorydb/memory-store";
import { MemoryUnitOfWork } from "../../../../../domain-impl-seedwork-datastore-memorydb/memory-unit-of-work";
import { MemoryCommunityRepository } from "./community.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../event-bus-seedwork-node";

export const buildMemoryCommunityUnitOfWork = (
  communityMemoryStore: MemoryStore<CommunityProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, Community, communityMemoryStore, MemoryCommunityRepository);
};