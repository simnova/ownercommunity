import { Service, ServiceProps } from "../../../../domain/contexts/service-ticket/service";
import { MemoryStore } from "../../../../services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryServiceRepository } from "./service.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../event-bus-seedwork-node";

export const buildMemoryServiceUnitOfWork = (
  serviceMemoryStore: MemoryStore<ServiceProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, Service, serviceMemoryStore, MemoryServiceRepository);
};