import { User, UserProps } from "../../../../../../domain/contexts/user/user";
import { InProcEventBus } from "../../../../../../domain/infrastructure/core/events/in-proc-event-bus";
import { NodeEventBus } from "../../../../../../domain/infrastructure/core/events/node-event-bus";
import { MemoryStore } from "../core/memory-store/memory-store";
import { MemoryUnitOfWork } from "../core/memory-store/memory-unit-of-work";
import { MemoryUserRepository } from "./user.memory-repository";

// export const MemoryUserUnitOfWork = new MemoryUnitOfWork(InProcEventBus, NodeEventBus, User, MemoryUserRepository)

export const buildMemoryUserUnitOfWork = (userMemoryStore: MemoryStore<UserProps>) => {
  return new MemoryUnitOfWork(InProcEventBus, NodeEventBus, User, userMemoryStore, MemoryUserRepository);
};