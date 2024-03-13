import { NodeEventBus } from '../core/events/node-event-bus';
import { InProcEventBus } from '../core/events/in-proc-event-bus';
import { MongoUnitOfWork } from '../core/mongo/mongo-unit-of-work';

import { CommunityModel } from '../../../infrastructure/data-sources/cosmos-db/models/community';
import { CommunityConverter } from './community.domain-adapter';
import { MongoCommunityRepository } from './community.mongo-repository';

export const MongoCommunityUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, CommunityModel, new CommunityConverter(), MongoCommunityRepository);
