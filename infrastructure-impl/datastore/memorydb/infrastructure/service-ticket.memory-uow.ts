import { ServiceTicket, ServiceTicketProps } from "../../../../domain/contexts/service-ticket/service-ticket";
import { MemoryStore } from "../../../../services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryServiceTicketRepository } from "./service-ticket.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../event-bus-seedwork-node";

export const buildMemoryServiceTicketUnitOfWork = (
  serviceTicketMemoryStore: MemoryStore<ServiceTicketProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, ServiceTicket, serviceTicketMemoryStore, MemoryServiceTicketRepository);
};