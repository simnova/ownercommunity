import { NodeEventBus } from '../domain/infrastructure/core/events/node-event-bus';
import { InProcEventBus } from '../domain/infrastructure/core/events/in-proc-event-bus';
import { MongoUnitOfWork } from '../domain-seedwork-mongo/mongo-unit-of-work';

import { CommunityModel } from '../infrastructure/data-sources/cosmos-db/models/community';
import { CommunityConverter } from './community.domain-adapter';
import { MongoCommunityRepository } from './community.mongo-repository';

export const MongoCommunityUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, CommunityModel, new CommunityConverter(), MongoCommunityRepository);
