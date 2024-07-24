import { ViolationTicketV1, ViolationTicketV1Props } from "../../../../app/domain/contexts/cases/violation-ticket/v1/violation-ticket";
import { MemoryStore } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../seedwork/event-bus-seedwork-node";
import { MemoryViolationTicketRepository } from "./violation-ticket.memory-repository";

export const buildMemoryViolationTicketUnitOfWork = (
  violationTicketMemoryStore: MemoryStore<ViolationTicketV1Props>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, ViolationTicketV1, violationTicketMemoryStore, MemoryViolationTicketRepository);
};