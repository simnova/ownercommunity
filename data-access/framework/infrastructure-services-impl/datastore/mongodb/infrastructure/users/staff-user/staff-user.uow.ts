import { MongoUnitOfWork } from '../../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { StaffUserModel } from '../../../models/users/staff-user';
import { StaffUserConverter } from './staff-user.domain-adapter';
import { MongoStaffUserRepository } from './staff-user.mongo-repository';
import { NodeEventBusInstance, InProcEventBusInstance } from '../../../../../../seedwork/event-bus-seedwork-node';

export const MongoStaffUserUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, StaffUserModel, new StaffUserConverter(), MongoStaffUserRepository);