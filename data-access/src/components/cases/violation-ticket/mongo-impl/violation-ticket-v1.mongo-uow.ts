
import { MongoUnitOfWork } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { ViolationTicketModel } from '../../../../models/cases//violation-ticket';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../../../seedwork/event-bus-seedwork-node';
import { ViolationTicketV1Converter } from './violation-ticket-v1.mongo-domain-adapter';
import { MongoViolationTicketV1Repository } from './violation-ticket-v1.mongo-repository';

export const MongoViolationTicketV1UnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, ViolationTicketModel, new ViolationTicketV1Converter(), MongoViolationTicketV1Repository);