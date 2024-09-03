import { MongoUnitOfWork } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { EndUserModel } from '../../../models/users/end-user';
import { EndUserConverter } from './end-user.domain-adapter';
import { MongoEndUserRepository } from './end-user.mongo-repository';
import { NodeEventBusInstance, InProcEventBusInstance } from '../../../../../../seedwork/event-bus-seedwork-node';

export const MongoEndUserUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, EndUserModel, new EndUserConverter(), MongoEndUserRepository);