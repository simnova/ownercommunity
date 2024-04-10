import { MongoUnitOfWork } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { CommunityModel } from '../models/community';
import { CommunityConverter } from './community.domain-adapter';
import { MongoCommunityRepository } from './community.mongo-repository';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../seedwork/event-bus-seedwork-node';

export const MongoCommunityUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, CommunityModel, new CommunityConverter(), MongoCommunityRepository);
