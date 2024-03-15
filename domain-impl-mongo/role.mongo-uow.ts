import { NodeEventBus } from '../domain/infrastructure/core/events/node-event-bus';
import { InProcEventBus } from '../domain/infrastructure/core/events/in-proc-event-bus';
import { MongoUnitOfWork } from '../domain-seedwork-mongo/mongo-unit-of-work';

import { RoleModel } from '../infrastructure/data-sources/cosmos-db/models/role';
import { RoleConverter } from './role.domain-adapter';
import { MongoRoleRepository } from './role.mongo-repository';

export const MongoRoleUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, RoleModel, new RoleConverter(), MongoRoleRepository);
