import { User, UserProps } from "../../../../app/domain/contexts/user/user";
import { MemoryStore } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryUserRepository } from "./user.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../seedwork/event-bus-seedwork-node";

export const buildMemoryUserUnitOfWork = (
  userMemoryStore: MemoryStore<UserProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, User, userMemoryStore, MemoryUserRepository);
};