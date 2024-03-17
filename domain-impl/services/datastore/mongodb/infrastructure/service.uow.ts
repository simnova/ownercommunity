import { MongoUnitOfWork } from '../../../../../domain-impl-seedwork-datastore-mongodb/mongo-unit-of-work';
import { ServiceModel } from '../models/service';
import { ServiceConverter } from './service.domain-adapter';
import { MongoServiceRepository } from './service.mongo-repository';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../event-bus-seedwork-node';

export const MongoServiceUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, ServiceModel, new ServiceConverter(), MongoServiceRepository);