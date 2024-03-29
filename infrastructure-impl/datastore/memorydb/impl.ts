import { CommunityDatastoreInfrastructureService, DatastoreInfrastructureService, MemberDatastoreInfrastructureService, PropertyDatastoreInfrastructureService, RoleDatastoreInfrastructureService, ServiceDatastoreInfrastructureService, ServiceTicketDatastoreInfrastructureService, UserDatastoreInfrastructureService } from "../../../infrastructure-services/datastore";
import { MongoCommunityUnitOfWork } from "../mongodb/infrastructure/community.mongo-uow";
import { MongoMemberUnitOfWork } from "../mongodb/infrastructure/member.mongo-uow";
import { MongoPropertyUnitOfWork } from "../mongodb/infrastructure/property.mongo-uow";
import { MongoRoleUnitOfWork } from "../mongodb/infrastructure/role.mongo-uow";
import { MongoServiceTicketUnitOfWork } from "../mongodb/infrastructure/service-ticket.uow";
import { MongoServiceUnitOfWork } from "../mongodb/infrastructure/service.uow";
import { MongoUserUnitOfWork } from "../mongodb/infrastructure/user.uow";
import { MongoUserDatastore } from "../mongodb/infrastructure/user.mongo-datastore";
import { MongoCommunityDatastore } from "../mongodb/infrastructure/community.mongo-datastore";
import { MongoMemberDatastore } from "../mongodb/infrastructure/member.mongo-datastore";
import { MongoPropertyDatastore } from "../mongodb/infrastructure/property.mongo-datastore";
import { MongoRoleDatastore } from "../mongodb/infrastructure/role.mongo-datastore";
import { MongoServiceDatastore } from "../mongodb/infrastructure/service.mongo-datastore";
import { MongoServiceTicketDatastore } from "../mongodb/infrastructure/service-ticket.mongo-datastore";
import { IMemoryDatabase, MemoryDatabase } from "./memory-database";
import { MemoryUnitOfWork } from "../../../services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";
import { MemoryCommunityDatastore } from "./infrastructure/community.memory-datastore";
import { MemoryUserDatastore } from "./infrastructure/user.memory-datastore";
import { MemoryMemberDatastore } from "./infrastructure/member.memory-datastore";
import { MemoryRoleDatastore } from "./infrastructure/role.memory-datastore";
import { MemoryPropertyDatastore } from "./infrastructure/property.memory-datastore";
import { MemoryServiceDatastore } from "./infrastructure/service.memory-datastore";
import { MemoryServiceTicketDatastore } from "./infrastructure/service-ticket.memory-datastore";

export class MemorydbDatastoreImpl extends MemoryDatabase implements DatastoreInfrastructureService {

  constructor(private readonly db: IMemoryDatabase){
    super()
  }

  startup = async (): Promise<void> => {
    // console.log('MemorydbDatastoreImpl startup');
  }

  shutdown = async (): Promise<void> => {
    // console.log('MemorydbDatastoreImpl shutdown');
  }

  get userUnitOfWork() {
    return this.db.userUnitOfWork;
  }

  get communityUnitOfWork() {
    return this.db.communityUnitOfWork;
  }

  get memberUnitOfWork() {
    return this.db.memberUnitOfWork;
  }

  get roleUnitOfWork() {
    return this.db.roleUnitOfWork;
  }

  get propertyUnitOfWork() {
    return this.db.propertyUnitOfWork;
  }

  get serviceUnitOfWork() {
    return this.db.serviceUnitOfWork;
  }

  get serviceTicketUnitOfWork() {
    return this.db.serviceTicketUnitOfWork;
  }

  get userDatastore(): UserDatastoreInfrastructureService {
    return new MemoryUserDatastore(this.db.userMemoryStore);
  }

  get communityDatastore(): CommunityDatastoreInfrastructureService {
    return new MemoryCommunityDatastore(this.db.communityMemoryStore);
  }

  get memberDatastore(): MemberDatastoreInfrastructureService {
    return new MemoryMemberDatastore(this.db.memberMemoryDatastore);
  }

  get roleDatastore(): RoleDatastoreInfrastructureService {
    return new MemoryRoleDatastore(this.db.roleMemoryDatastore);
  }

  get propertyDatastore(): PropertyDatastoreInfrastructureService {
    return new MemoryPropertyDatastore(this.db.propertyMemoryDatastore);
  }

  get serviceDatastore(): ServiceDatastoreInfrastructureService {
    return new MemoryServiceDatastore(this.db.serviceMemoryStore);
  }

  get serviceTicketDatastore(): ServiceTicketDatastoreInfrastructureService {
    return new MemoryServiceTicketDatastore(this.db.serviceTicketMemoryDatastore);
  }
}