import { MongoUnitOfWork } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { VendorUserRoleModel } from '../../../models/roles/vendor-user-role';
import { VendorUserRoleConverter } from './vendor-user-role.domain-adapter';
import { MongoVendorUserRoleRepository } from './vendor-user-role.mongo-repository';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../../../seedwork/event-bus-seedwork-node';

export const MongoVendorUserRoleUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, VendorUserRoleModel, new VendorUserRoleConverter(), MongoVendorUserRoleRepository);