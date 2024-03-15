import { User, UserProps } from "../domain/contexts/user/user";
import { InProcEventBus } from "../domain-impl-event-bus/in-proc-event-bus";
import { NodeEventBus } from "../domain-impl-event-bus/node-event-bus";
import { MemoryStore } from "../domain-seedwork-memorydb/memory-store";
import { MemoryUnitOfWork } from "../domain-seedwork-memorydb/memory-unit-of-work";
import { MemoryUserRepository } from "./user.memory-repository";

// export const MemoryUserUnitOfWork = new MemoryUnitOfWork(InProcEventBus, NodeEventBus, User, MemoryUserRepository)

export const buildMemoryUserUnitOfWork = (userMemoryStore: MemoryStore<UserProps>) => {
  return new MemoryUnitOfWork(InProcEventBus, NodeEventBus, User, userMemoryStore, MemoryUserRepository);
};