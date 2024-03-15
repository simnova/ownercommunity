import { NodeEventBus } from '../domain/infrastructure/core/events/node-event-bus';
import { InProcEventBus } from '../domain/infrastructure/core/events/in-proc-event-bus';
import { MongoUnitOfWork } from '../domain-seedwork-mongo/mongo-unit-of-work';

import { MemberModel } from '../infrastructure/data-sources/cosmos-db/models/member';
import { MemberConverter } from './member.domain-adapter';
import { MongoMemberRepository } from './member.mongo-repository';

export const MongoMemberUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, MemberModel, new MemberConverter(), MongoMemberRepository);