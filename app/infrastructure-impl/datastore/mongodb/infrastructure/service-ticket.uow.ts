import { MongoUnitOfWork } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { ServiceTicketModel } from '../models/service-ticket';
import { ServiceTicketConverter } from './service-ticket.domain-adapter';
import { MongoServiceTicketRepository } from './service-ticket.mongo-repository';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../seedwork/event-bus-seedwork-node';

export const MongoServiceTicketUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, ServiceTicketModel, new ServiceTicketConverter(), MongoServiceTicketRepository);