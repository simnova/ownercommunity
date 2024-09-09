
import { MongoUnitOfWork } from '../../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { ViolationTicketModel } from '../../../../models/cases//violation-ticket';
import { SyncDomainEventBusInstance, NodeEventBusInstance } from '../../../../../../../../seedwork/event-bus-seedwork-node';
import { ViolationTicketV1Converter } from './violation-ticket.domain-adapter';
import { MongoViolationTicketV1Repository } from './violation-ticket.mongo-repository';

export const MongoViolationTicketV1UnitOfWork = new MongoUnitOfWork(SyncDomainEventBusInstance, NodeEventBusInstance, ViolationTicketModel, new ViolationTicketV1Converter(), MongoViolationTicketV1Repository);