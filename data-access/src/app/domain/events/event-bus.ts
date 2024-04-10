import { EventBus } from '../../../../seedwork/domain-seedwork/event-bus'
import {NodeEventBusInstance} from '../../../../seedwork/event-bus-seedwork-node'

export const EventBusInstance: EventBus = NodeEventBusInstance as EventBus;