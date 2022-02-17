import { NodeEventBus } from '../../events/node-event-bus';
import { InProcEventBus } from '../../events/in-proc-event-bus';
import { MongoUnitOfWork } from '../mongo-unit-of-work';


import { UserModel } from '../../../../infrastructure/data-sources/cosmos-db/models/user';
import { UserConverter } from '../adapters/user-domain-adapter';
import { MongoUserRepository } from './mongo-user-repository';

export const UserUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, UserModel, new UserConverter(), MongoUserRepository);
