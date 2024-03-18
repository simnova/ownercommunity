import { User, UserProps } from "../../../../domain/contexts/user/user";
import { MemoryStore } from "../../../../services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryUserRepository } from "./user.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../event-bus-seedwork-node";

export const buildMemoryUserUnitOfWork = (
  userMemoryStore: MemoryStore<UserProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, User, userMemoryStore, MemoryUserRepository);
};