import { NodeEventBus } from '../domain-impl-event-bus/node-event-bus';
import { InProcEventBus } from '../domain-impl-event-bus/in-proc-event-bus';
import { MongoUnitOfWork } from '../domain-seedwork-mongodb/mongo-unit-of-work';

import { RoleModel } from '../infrastructure/data-sources/cosmos-db/models/role';
import { RoleConverter } from './role.domain-adapter';
import { MongoRoleRepository } from './role.mongo-repository';

export const MongoRoleUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, RoleModel, new RoleConverter(), MongoRoleRepository);
