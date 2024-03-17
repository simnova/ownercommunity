import { Role, RoleProps } from "../../../../../domain/contexts/community/role";
import { MemoryStore } from "../../../../../domain-impl-seedwork-datastore-memorydb/memory-store";
import { MemoryUnitOfWork } from "../../../../../domain-impl-seedwork-datastore-memorydb/memory-unit-of-work";
import { MemoryRoleRepository } from "./role.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../event-bus-seedwork-node";

export const buildMemoryRoleUnitOfWork = (
  roleMemoryStore: MemoryStore<RoleProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, Role, roleMemoryStore, MemoryRoleRepository);
};