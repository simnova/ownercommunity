import { StaffRole, StaffRoleProps } from "../../../../../../app/domain/contexts/community/roles/staff-role/staff-role";
import { MemoryStore } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryStaffRoleRepository } from "./staff-role.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../../../seedwork/event-bus-seedwork-node";

export const buildMemoryStaffRoleUnitOfWork = (
  staffRoleMemoryStore: MemoryStore<StaffRoleProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, StaffRole, staffRoleMemoryStore, MemoryStaffRoleRepository);
};