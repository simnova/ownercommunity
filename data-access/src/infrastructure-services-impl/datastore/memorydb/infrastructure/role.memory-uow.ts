import { Role, RoleProps } from "../../../../app/domain/contexts/community/role";
import { MemoryStore } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryRoleRepository } from "./role.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../seedwork/event-bus-seedwork-node";

export const buildMemoryRoleUnitOfWork = (
  roleMemoryStore: MemoryStore<RoleProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, Role, roleMemoryStore, MemoryRoleRepository);
};