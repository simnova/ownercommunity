import { Community, CommunityProps } from "../domain/contexts/community/community";
import { InProcEventBus } from "../domain-impl-event-bus/in-proc-event-bus";
import { NodeEventBus } from "../domain-impl-event-bus/node-event-bus";
import { MemoryStore } from "../domain-seedwork-memorydb/memory-store";
import { MemoryUnitOfWork } from "../domain-seedwork-memorydb/memory-unit-of-work";
import { MemoryCommunityRepository } from "./community.memory-repository";

// export const MemoryCommunityUnitOfWork = new MemoryUnitOfWork(InProcEventBus, NodeEventBus, Community, MemoryCommunityRepository)

export const buildMemoryCommunityUnitOfWork = (communityMemoryStore: MemoryStore<CommunityProps>) => {
  return new MemoryUnitOfWork(InProcEventBus, NodeEventBus, Community, communityMemoryStore, MemoryCommunityRepository);
};