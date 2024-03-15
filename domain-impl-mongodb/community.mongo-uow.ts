import { NodeEventBus } from '../domain-impl-event-bus/node-event-bus';
import { InProcEventBus } from '../domain-impl-event-bus/in-proc-event-bus';
import { MongoUnitOfWork } from '../domain-seedwork-mongodb/mongo-unit-of-work';

import { CommunityModel } from '../infrastructure/data-sources/cosmos-db/models/community';
import { CommunityConverter } from './community.domain-adapter';
import { MongoCommunityRepository } from './community.mongo-repository';

export const MongoCommunityUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, CommunityModel, new CommunityConverter(), MongoCommunityRepository);
