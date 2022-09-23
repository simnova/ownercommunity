import { NodeEventBus } from '../core/events/node-event-bus';
import { InProcEventBus } from '../core/events/in-proc-event-bus';
import { MongoUnitOfWork } from '../core/mongo/mongo-unit-of-work';

import { ServiceModel } from '../../../infrastructure/data-sources/cosmos-db/models/service';
import { ServiceConverter } from './service.domain-adapter';
import { MongoServiceRepository } from './service.mongo-repository';

export const ServiceUnitOfWork = new MongoUnitOfWork(InProcEventBus, NodeEventBus, ServiceModel, new ServiceConverter(), MongoServiceRepository);