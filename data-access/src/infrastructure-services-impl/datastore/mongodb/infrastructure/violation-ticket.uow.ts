
import { MongoUnitOfWork } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { ViolationTicketModel } from '../models/violation-ticket';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../seedwork/event-bus-seedwork-node';
import { ViolationTicketConverter } from './violation-ticket.domain-adapter';
import { MongoViolationTicketRepository as ViolationTicketRepository } from './violation-ticket.mongo-repository';

export const MongoViolationTicketUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, ViolationTicketModel, new ViolationTicketConverter(), ViolationTicketRepository);