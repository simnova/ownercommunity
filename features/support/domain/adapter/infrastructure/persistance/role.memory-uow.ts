import { Role, RoleProps } from "../../../../../../domain/contexts/community/role";
import { InProcEventBus } from "../../../../../../domain/infrastructure/core/events/in-proc-event-bus";
import { NodeEventBus } from "../../../../../../domain/infrastructure/core/events/node-event-bus";
import { MemoryStore } from "../core/memory-store/memory-store";
import { MemoryUnitOfWork } from "../core/memory-store/memory-unit-of-work";
import { MemoryRoleRepository } from "./role.memory-repository";

// export const MemoryRoleUnitOfWork = new MemoryUnitOfWork(InProcEventBus, NodeEventBus, Role, MemoryRoleRepository)

export const buildMemoryRoleUnitOfWork = (roleMemoryStore: MemoryStore<RoleProps>) => {
  return new MemoryUnitOfWork(InProcEventBus, NodeEventBus, Role, roleMemoryStore, MemoryRoleRepository);
};