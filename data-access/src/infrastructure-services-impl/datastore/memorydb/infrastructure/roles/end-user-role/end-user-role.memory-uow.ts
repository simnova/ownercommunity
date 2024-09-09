import { EndUserRole, EndUserRoleProps } from "../../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role";
import { MemoryStore } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryEndUserRoleRepository } from "./end-user-role.memory-repository";
import { SyncDomainEventBusInstance, NodeEventBusInstance } from "../../../../../../../seedwork/event-bus-seedwork-node";

export const buildMemoryEndUserRoleUnitOfWork = (
  endUserRoleMemoryStore: MemoryStore<EndUserRoleProps>,
) => {
  return new MemoryUnitOfWork(SyncDomainEventBusInstance, NodeEventBusInstance, EndUserRole, endUserRoleMemoryStore, MemoryEndUserRoleRepository);
};