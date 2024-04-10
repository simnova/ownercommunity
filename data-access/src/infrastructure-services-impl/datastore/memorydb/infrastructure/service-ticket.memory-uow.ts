import { ServiceTicket, ServiceTicketProps } from "../../../../app/domain/contexts/service-ticket/service-ticket";
import { MemoryStore } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryServiceTicketRepository } from "./service-ticket.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../seedwork/event-bus-seedwork-node";

export const buildMemoryServiceTicketUnitOfWork = (
  serviceTicketMemoryStore: MemoryStore<ServiceTicketProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, ServiceTicket, serviceTicketMemoryStore, MemoryServiceTicketRepository);
};