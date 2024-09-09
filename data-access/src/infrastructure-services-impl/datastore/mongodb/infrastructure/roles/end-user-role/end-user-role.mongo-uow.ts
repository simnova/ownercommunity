import { MongoUnitOfWork } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { EndUserRoleModel } from '../../../models/roles/end-user-role';
import { EndUserRoleConverter } from './end-user-role.domain-adapter';
import { MongoEndUserRoleRepository } from './end-user-role.mongo-repository';
import { SyncDomainEventBusInstance, NodeEventBusInstance } from '../../../../../../../seedwork/event-bus-seedwork-node';

export const MongoEndUserRoleUnitOfWork = new MongoUnitOfWork(SyncDomainEventBusInstance, NodeEventBusInstance, EndUserRoleModel, new EndUserRoleConverter(), MongoEndUserRoleRepository);