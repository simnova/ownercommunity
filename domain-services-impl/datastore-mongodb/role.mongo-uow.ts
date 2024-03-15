import { NodeEventBus } from '../../domain-eventbus-impl-node/node-event-bus';
import { InProcEventBus } from '../../domain-eventbus-impl-node/in-proc-event-bus';
import { MongoUnitOfWork } from '../../domain-seedwork-mongodb/mongo-unit-of-work';

import { RoleModel } from '../../infrastructure/data-sources/cosmos-db/models/role';
import { RoleConverter } from './role.domain-adapter';
import { MongoRoleRepository } from './role.mongo-repository';

export const MongoRoleUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, RoleModel, new RoleConverter(), MongoRoleRepository);
