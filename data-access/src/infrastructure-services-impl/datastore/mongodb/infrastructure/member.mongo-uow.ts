import { MongoUnitOfWork } from '../../../../../seedwork/services-seedwork-datastore-mongodb/infrastructure/mongo-unit-of-work';
import { MemberModel } from '../models/member';
import { MemberConverter } from './member.domain-adapter';
import { MongoMemberRepository } from './member.mongo-repository';
import { InProcEventBusInstance, NodeEventBusInstance } from '../../../../../seedwork/event-bus-seedwork-node';

export const MongoMemberUnitOfWork = new MongoUnitOfWork(InProcEventBusInstance, NodeEventBusInstance, MemberModel, new MemberConverter(), MongoMemberRepository);