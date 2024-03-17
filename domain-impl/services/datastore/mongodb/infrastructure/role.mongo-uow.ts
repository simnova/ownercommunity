import { MongoUnitOfWork } from '../../../../../domain-impl-seedwork-datastore-mongodb/mongo-unit-of-work';
import { RoleModel } from '../models/role';
import { RoleConverter } from './role.domain-adapter';
import { MongoRoleRepository } from './role.mongo-repository';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../event-bus-seedwork-node';

export const MongoRoleUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, RoleModel, new RoleConverter(), MongoRoleRepository);