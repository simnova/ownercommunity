import { NodeEventBus } from '../../events/node-event-bus';
import { InProcEventBus } from '../../events/in-proc-event-bus';
import { MongoUnitOfWork } from '../mongo-unit-of-work';

import { UserModel } from '../../../../infrastructure/data-sources/cosmos-db/models/user';
import { UserConverter } from '../adapters/user-domain-adapter';
import { MongoUserRepository } from './mongo-user-repository';

import { CommunityModel } from '../../../../infrastructure/data-sources/cosmos-db/models/community';
import { CommunityConverter } from '../adapters/community-domain-adapter';
import { MongoCommunityRepository } from './mongo-community-repository';

import { MemberModel } from '../../../../infrastructure/data-sources/cosmos-db/models/member';
import { MemberConverter } from '../adapters/member-domain-adapter';
import { MongoMemberRepository } from './mongo-member-repository';

import { RoleModel } from '../../../../infrastructure/data-sources/cosmos-db/models/role';
import { RoleConverter } from '../adapters/role-domain-adapter';
import { MongoRoleRepository } from './mongo-role-repository';

import { PropertyModel } from '../../../../infrastructure/data-sources/cosmos-db/models/property';
import { PropertyConverter } from '../adapters/property-domain-adapter';
import { MongoPropertyRepository } from './mongo-property-repository';

import { LocationModel } from '../../../../infrastructure/data-sources/cosmos-db/models/location';
import { LocationConverter } from '../adapters/location-domain-adapter';
import { MongoLocationRepository } from './mongo-location-repository';

import { ServiceTicketModel } from '../../../../infrastructure/data-sources/cosmos-db/models/service-ticket';
import { ServiceTicketConverter } from '../adapters/service-ticket-domain-adapter';
import { MongoServiceTicketRepository } from './mongo-service-ticket-repository';

export const UserUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, UserModel, new UserConverter(), MongoUserRepository);
export const CommunityUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, CommunityModel, new CommunityConverter(), MongoCommunityRepository);
export const MemberUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, MemberModel, new MemberConverter(), MongoMemberRepository);
export const RoleUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, RoleModel, new RoleConverter(), MongoRoleRepository);
export const PropertyUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, PropertyModel, new PropertyConverter(), MongoPropertyRepository);
export const LocationUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, LocationModel, new LocationConverter(), MongoLocationRepository);
export const ServiceTicketUnitOfWork = new MongoUnitOfWork(InProcEventBus,NodeEventBus, ServiceTicketModel, new ServiceTicketConverter(), MongoServiceTicketRepository);