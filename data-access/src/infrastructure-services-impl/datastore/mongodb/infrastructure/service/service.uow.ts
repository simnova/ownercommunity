import { MongoUnitOfWork } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { ServiceModel } from '../../models/service';
import { ServiceConverter } from './service.domain-adapter';
import { MongoServiceRepository } from './service.mongo-repository';
import { SyncDomainEventBusInstance, NodeEventBusInstance } from '../../../../../../seedwork/event-bus-seedwork-node';

export const MongoServiceUnitOfWork = new MongoUnitOfWork(SyncDomainEventBusInstance, NodeEventBusInstance, ServiceModel, new ServiceConverter(), MongoServiceRepository);