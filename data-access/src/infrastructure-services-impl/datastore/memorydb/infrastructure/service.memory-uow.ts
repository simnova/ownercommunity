import { Service, ServiceProps } from "../../../../app/domain/contexts/service-ticket/service";
import { MemoryStore } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryServiceRepository } from "./service.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../seedwork/event-bus-seedwork-node";

export const buildMemoryServiceUnitOfWork = (
  serviceMemoryStore: MemoryStore<ServiceProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, Service, serviceMemoryStore, MemoryServiceRepository);
};