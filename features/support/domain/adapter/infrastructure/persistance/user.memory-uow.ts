import { User } from "../../../../../../domain/contexts/user/user";
import { InProcEventBus } from "../../../../../../domain/infrastructure/core/events/in-proc-event-bus";
import { NodeEventBus } from "../../../../../../domain/infrastructure/core/events/node-event-bus";
import { MemoryUnitOfWork } from "../core/memory-store/memory-unit-of-work";
import { MemoryUserRepository } from "./user.memory-repository";

export const MemoryUserUnitOfWork = new MemoryUnitOfWork(InProcEventBus, NodeEventBus, User, MemoryUserRepository)