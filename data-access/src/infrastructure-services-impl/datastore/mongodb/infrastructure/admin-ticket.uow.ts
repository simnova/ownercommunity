
import { MongoUnitOfWork } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { AdminTicketModel } from '../models//admin-ticket';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../seedwork/event-bus-seedwork-node';
import { AdminTicketConverter } from './admin-ticket.domain-adapter';
import { MongoAdminTicketRepository } from './admin-ticket.mongo-repository';

export const MongoAdminTicketUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, AdminTicketModel, new AdminTicketConverter(), MongoAdminTicketRepository);