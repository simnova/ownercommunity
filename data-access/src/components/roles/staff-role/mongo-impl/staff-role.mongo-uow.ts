import { MongoUnitOfWork } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { StaffRoleModel } from '../../../models/roles/staff-role';
import { StaffRoleConverter } from './staff-role.mongo-domain-adapter';
import { MongoStaffRoleRepository } from './staff-role.mongo-repository';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../../seedwork/event-bus-seedwork-node';

export const MongoStaffRoleUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, StaffRoleModel, new StaffRoleConverter(), MongoStaffRoleRepository);