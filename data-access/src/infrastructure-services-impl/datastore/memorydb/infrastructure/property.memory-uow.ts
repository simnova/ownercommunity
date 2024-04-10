import { Property, PropertyProps } from "../../../../app/domain/contexts/property/property";
import { MemoryStore } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-store";
import { MemoryUnitOfWork } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryPropertyRepository } from "./property.memory-repository";
import { InProcEventBusInstance, NodeEventBusInstance } from "../../../../../seedwork/event-bus-seedwork-node";

export const buildMemoryPropertyUnitOfWork = (
  propertyMemoryStore: MemoryStore<PropertyProps>,
) => {
  return new MemoryUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, Property, propertyMemoryStore, MemoryPropertyRepository);
};