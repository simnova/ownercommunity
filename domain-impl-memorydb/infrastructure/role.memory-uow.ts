import { Role, RoleProps } from "../../domain/contexts/community/role";
import { InProcEventBus } from "../../domain-impl-event-bus/in-proc-event-bus";
import { NodeEventBus } from "../../domain-impl-event-bus/node-event-bus";
import { MemoryStore } from "../../domain-seedwork-memorydb/memory-store";
import { MemoryUnitOfWork } from "../../domain-seedwork-memorydb/memory-unit-of-work";
import { MemoryRoleRepository } from "./role.memory-repository";

// export const MemoryRoleUnitOfWork = new MemoryUnitOfWork(InProcEventBus, NodeEventBus, Role, MemoryRoleRepository)

export const buildMemoryRoleUnitOfWork = (roleMemoryStore: MemoryStore<RoleProps>) => {
  return new MemoryUnitOfWork(InProcEventBus, NodeEventBus, Role, roleMemoryStore, MemoryRoleRepository);
};