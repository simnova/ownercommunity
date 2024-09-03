import { EventBus } from "@library/domain-seedwork/event-bus";
import { NodeEventBusInstance } from "@library/event-bus-seedwork-node";

export const EventBusInstance: EventBus = NodeEventBusInstance as EventBus;