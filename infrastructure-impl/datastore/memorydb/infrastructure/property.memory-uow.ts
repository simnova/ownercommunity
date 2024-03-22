import { Property, PropertyProps } from "../../../../domain/contexts/property/property";
import { MemoryStore } from "../../../../services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryPropertyRepository } from "./property.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../event-bus-seedwork-node";

export const buildMemoryPropertyUnitOfWork = (
  propertyMemoryStore: MemoryStore<PropertyProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, Property, propertyMemoryStore, MemoryPropertyRepository);
};