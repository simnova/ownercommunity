import { Community, CommunityProps } from "../../../../../app/domain/contexts/community/community/community";
import { MemoryStore } from "../../../../../../framework/seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../../framework/seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryCommunityRepository } from "./community.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../../framework/seedwork/event-bus-seedwork-node";

export const buildMemoryCommunityUnitOfWork = (
  communityMemoryStore: MemoryStore<CommunityProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, Community, communityMemoryStore, MemoryCommunityRepository);
};