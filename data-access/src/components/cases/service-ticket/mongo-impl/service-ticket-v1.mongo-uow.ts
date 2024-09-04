import { MongoUnitOfWork } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { ServiceTicketModel } from '../../../../../../app/infrastructure-services-impl/datastore/mongodb/models/cases/service-ticket';
import { ServiceTicketV1Converter } from './service-ticket-v1.mongo-domain-adapter';
import { MongoServiceTicketV1Repository } from './service-ticket-v1.mongo-repository';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../../../seedwork/event-bus-seedwork-node';

export const MongoServiceTicketV1UnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, ServiceTicketModel, new ServiceTicketV1Converter(), MongoServiceTicketV1Repository);