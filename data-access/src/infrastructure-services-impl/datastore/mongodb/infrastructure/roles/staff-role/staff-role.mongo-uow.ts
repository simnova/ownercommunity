import { MongoUnitOfWork } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { StaffRoleModel } from '../../../models/roles/staff-role';
import { StaffRoleConverter } from './staff-role.domain-adapter';
import { MongoStaffRoleRepository } from './staff-role.mongo-repository';
import { SyncDomainEventBusInstance, NodeEventBusInstance } from '../../../../../../../seedwork/event-bus-seedwork-node';

export const MongoStaffRoleUnitOfWork = new MongoUnitOfWork(SyncDomainEventBusInstance, NodeEventBusInstance, StaffRoleModel, new StaffRoleConverter(), MongoStaffRoleRepository);