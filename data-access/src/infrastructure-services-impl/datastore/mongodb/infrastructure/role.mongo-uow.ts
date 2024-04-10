import { MongoUnitOfWork } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { RoleModel } from '../models/role';
import { RoleConverter } from './role.domain-adapter';
import { MongoRoleRepository } from './role.mongo-repository';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../seedwork/event-bus-seedwork-node';

export const MongoRoleUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, RoleModel, new RoleConverter(), MongoRoleRepository);