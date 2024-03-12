import { Community, CommunityProps } from "../../../../../../domain/contexts/community/community";
import { InProcEventBus } from "../../../../../../domain/infrastructure/core/events/in-proc-event-bus";
import { NodeEventBus } from "../../../../../../domain/infrastructure/core/events/node-event-bus";
import { MemoryStore } from "../core/memory-store/memory-store";
import { MemoryUnitOfWork } from "../core/memory-store/memory-unit-of-work";
import { MemoryCommunityRepository } from "./community.memory-repository";

// export const MemoryCommunityUnitOfWork = new MemoryUnitOfWork(InProcEventBus, NodeEventBus, Community, MemoryCommunityRepository)

export const buildMemoryCommunityUnitOfWork = (communityMemoryStore: MemoryStore<CommunityProps>) => {
  return new MemoryUnitOfWork(InProcEventBus, NodeEventBus, Community, communityMemoryStore, MemoryCommunityRepository);
};