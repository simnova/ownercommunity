import { AdminTicket, AdminTicketProps } from "../../../../app/domain/contexts/service-ticket/admin-ticket";
import { MemoryStore } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../seedwork/event-bus-seedwork-node";
import { MemoryViolationTicketRepository } from "./violation-ticket.memory-repository";

export const buildMemoryViolationTicketUnitOfWork = (
  violationTicketMemoryStore: MemoryStore<AdminTicketProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, AdminTicket, violationTicketMemoryStore, MemoryViolationTicketRepository);
};