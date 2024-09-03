import { EndUser, EndUserProps } from "../../../../../../app/domain/contexts/users/end-user/end-user";
import { MemoryStore } from "../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryEndUserRepository } from "./end-user.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../../seedwork/event-bus-seedwork-node";

export const buildMemoryEndUserUnitOfWork = (
  userMemoryStore: MemoryStore<EndUserProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, EndUser, userMemoryStore, MemoryEndUserRepository);
};