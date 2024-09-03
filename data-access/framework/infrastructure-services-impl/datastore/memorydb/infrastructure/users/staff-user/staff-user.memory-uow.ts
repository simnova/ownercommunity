import { StaffUser, StaffUserProps } from "../../../../../../app/domain/contexts/users/staff-user/staff-user";
import { MemoryStore } from "../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryStaffUserRepository } from "./staff-user.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../../seedwork/event-bus-seedwork-node";

export const buildMemoryStaffUserUnitOfWork = (
  userMemoryStore: MemoryStore<StaffUserProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, StaffUser, userMemoryStore, MemoryStaffUserRepository);
};