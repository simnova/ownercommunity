import { NodeEventBus } from '../core/events/node-event-bus';
import { InProcEventBus } from '../core/events/in-proc-event-bus';
import { MongoUnitOfWork } from '../core/mongo/mongo-unit-of-work';

import { MemberModel } from '../../../infrastructure/data-sources/cosmos-db/models/member';
import { MemberConverter } from './member.domain-adapter';
import { MongoMemberRepository } from './member.mongo-repository';

export const MemberUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, MemberModel, new MemberConverter(), MongoMemberRepository);