import { NodeEventBus } from '../domain/infrastructure/core/events/node-event-bus';
import { InProcEventBus } from '../domain/infrastructure/core/events/in-proc-event-bus';
import { MongoUnitOfWork } from '../domain-seedwork-mongo/mongo-unit-of-work';

import { ServiceModel } from '../infrastructure/data-sources/cosmos-db/models/service';
import { ServiceConverter } from './service.domain-adapter';
import { MongoServiceRepository } from './service.mongo-repository';

export const ServiceUnitOfWork = new MongoUnitOfWork(InProcEventBus, NodeEventBus, ServiceModel, new ServiceConverter(), MongoServiceRepository);