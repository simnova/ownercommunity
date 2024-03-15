import { NodeEventBus } from '../domain/infrastructure/core/events/node-event-bus';
import { InProcEventBus } from '../domain/infrastructure/core/events/in-proc-event-bus';
import { MongoUnitOfWork } from '../domain-seedwork-mongo/mongo-unit-of-work';

import { UserModel } from '../infrastructure/data-sources/cosmos-db/models/user';
import { UserConverter } from './user.domain-adapter';
import { MongoUserRepository } from './user.mongo-repository';

export const UserUnitOfWork = new MongoUnitOfWork(InProcEventBus, NodeEventBus, UserModel, new UserConverter(), MongoUserRepository);
