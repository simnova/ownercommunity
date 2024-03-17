import { MongoUnitOfWork } from '../../../../../domain-impl-seedwork-datastore-mongodb/mongo-unit-of-work';
import { ServiceTicketModel } from '../models/service-ticket';
import { ServiceTicketConverter } from './service-ticket.domain-adapter';
import { MongoServiceTicketRepository } from './service-ticket.mongo-repository';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../event-bus-seedwork-node';

export const MongoServiceTicketUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, ServiceTicketModel, new ServiceTicketConverter(), MongoServiceTicketRepository);