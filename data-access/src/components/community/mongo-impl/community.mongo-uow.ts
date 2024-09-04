import { MongoUnitOfWork } from '../../../../framework/seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { CommunityModel } from '../../../infrastructure-services-impl/datastore/mongodb/models/community';
import { CommunityConverter } from './community.mongo-domain-adapter';
import { MongoCommunityRepository } from './community.mongo-repository';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../framework/seedwork/event-bus-seedwork-node';

export const MongoCommunityUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, CommunityModel, new CommunityConverter(), MongoCommunityRepository);
