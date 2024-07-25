
import { MongoUnitOfWork } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { ViolationTicketModel } from '../../../models/violation-ticket';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../../../seedwork/event-bus-seedwork-node';
import { ViolationTicketV1Converter } from './violation-ticket.domain-adapter';
import { MongoViolationTicketV1Repository as ViolationTicketRepository } from './violation-ticket.mongo-repository';

export const MongoViolationTicketV1UnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, ViolationTicketModel, new ViolationTicketV1Converter(), ViolationTicketRepository);