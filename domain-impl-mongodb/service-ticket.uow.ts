import { NodeEventBus } from '../domain-impl-event-bus/node-event-bus';
import { InProcEventBus } from '../domain-impl-event-bus/in-proc-event-bus';
import { MongoUnitOfWork } from '../domain-seedwork-mongodb/mongo-unit-of-work';

import { ServiceTicketModel } from '../infrastructure/data-sources/cosmos-db/models/service-ticket';
import { ServiceTicketConverter } from './service-ticket.domain-adapter';
import { MongoServiceTicketRepository } from './service-ticket.mongo-repository';

export const ServiceTicketUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, ServiceTicketModel, new ServiceTicketConverter(), MongoServiceTicketRepository);