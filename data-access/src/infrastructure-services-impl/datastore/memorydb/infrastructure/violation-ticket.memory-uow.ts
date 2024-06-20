import { ViolationTicket, ViolationTicketProps } from "../../../../app/domain/contexts/violation-ticket/violation-ticket";
import { MemoryStore } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../seedwork/event-bus-seedwork-node";
import { MemoryViolationTicketRepository } from "./violation-ticket.memory-repository";

export const buildMemoryViolationTicketUnitOfWork = (
  violationTicketMemoryStore: MemoryStore<ViolationTicketProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, ViolationTicket, violationTicketMemoryStore, MemoryViolationTicketRepository);
};