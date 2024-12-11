import { MongoUnitOfWork } from '../../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { VendorUserConverter } from './vendor-user.domain-adapter';
import { MongoVendorUserRepository } from './vendor-user.mongo-repository';
import { NodeEventBusInstance, InProcEventBusInstance } from '../../../../../../../seedwork/event-bus-seedwork-node';
import { VendorUserModel } from '../../../models/users/vendor-user';

export const MongoVendorUserUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, VendorUserModel, new VendorUserConverter(), MongoVendorUserRepository);