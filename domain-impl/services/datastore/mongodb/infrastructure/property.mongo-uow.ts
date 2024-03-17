import { MongoUnitOfWork } from '../../../../../services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { PropertyModel } from '../models/property';
import { PropertyConverter } from './property.domain-adapter';
import { MongoPropertyRepository } from './property.mongo-repository';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../event-bus-seedwork-node';

export const MongoPropertyUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, PropertyModel, new PropertyConverter(), MongoPropertyRepository);