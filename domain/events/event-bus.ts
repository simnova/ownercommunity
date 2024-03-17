import { EventBus } from '../../domain-seedwork/event-bus'
import {NodeEventBusInstance} from '../../event-bus-seedwork-node'

export const EventBusInstance: EventBus = NodeEventBusInstance as EventBus;