import { MongoUnitOfWork } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { EndUserRoleModel } from '../../../models/roles/end-user-role';
import { EndUserRoleConverter } from './end-user-role.mongo-domain-adapter';
import { MongoEndUserRoleRepository } from './end-user-role.mongo-repository';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../../seedwork/event-bus-seedwork-node';

export const MongoEndUserRoleUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, EndUserRoleModel, new EndUserRoleConverter(), MongoEndUserRoleRepository);