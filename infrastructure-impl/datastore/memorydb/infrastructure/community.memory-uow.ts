import { Community, CommunityProps } from "../../../../domain/contexts/community/community";
import { MemoryStore } from "../../../../services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryCommunityRepository } from "./community.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../event-bus-seedwork-node";

export const buildMemoryCommunityUnitOfWork = (
  communityMemoryStore: MemoryStore<CommunityProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, Community, communityMemoryStore, MemoryCommunityRepository);
};