import { ServiceTicketV1, ServiceTicketV1Props } from "../../../../../../app/domain/contexts/cases/service-ticket/v1/service-ticket";
import { MemoryStore } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryServiceTicketV1Repository } from "./service-ticket.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../../../seedwork/event-bus-seedwork-node";

export const buildMemoryServiceTicketV1UnitOfWork = (
  serviceTicketMemoryStore: MemoryStore<ServiceTicketV1Props>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, ServiceTicketV1, serviceTicketMemoryStore, MemoryServiceTicketV1Repository);
};