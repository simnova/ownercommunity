import { MongoUnitOfWork } from '../../../../../domain-impl-seedwork-datastore-mongodb/mongo-unit-of-work';
import { CommunityModel } from '../models/community';
import { CommunityConverter } from './community.domain-adapter';
import { MongoCommunityRepository } from './community.mongo-repository';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../event-bus-seedwork-node';

export const MongoCommunityUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, CommunityModel, new CommunityConverter(), MongoCommunityRepository);
