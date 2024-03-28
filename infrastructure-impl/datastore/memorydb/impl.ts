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
import { MemoryDatabase } from "./memory-database";
import { MemoryUnitOfWork } from "../../../services-seedwork-datastore-memorydb/infrastructure/memory-unit-of-work";

export class MemorydbDatastoreImpl extends MemoryDatabase implements DatastoreInfrastructureService {

  startup = async (): Promise<void> => {
    // console.log('MemorydbDatastoreImpl startup');
  }

  shutdown = async (): Promise<void> => {
    // console.log('MemorydbDatastoreImpl shutdown');
  }

  get userUnitOfWork(): typeof MemoryUnitOfWork {
    return MemoryUnitOfWork
  }

  get communityUnitOfWork(): typeof MongoCommunityUnitOfWork {
    return MongoCommunityUnitOfWork
  }

  get memberUnitOfWork(): typeof MongoMemberUnitOfWork {
    return MongoMemberUnitOfWork
  }

  get roleUnitOfWork(): typeof MongoRoleUnitOfWork {
    return MongoRoleUnitOfWork
  }

  get propertyUnitOfWork(): typeof MongoPropertyUnitOfWork {
    return MongoPropertyUnitOfWork
  }

  get serviceUnitOfWork(): typeof MongoServiceUnitOfWork {
    return MongoServiceUnitOfWork
  }

  get serviceTicketUnitOfWork(): typeof MongoServiceTicketUnitOfWork {
    return MongoServiceTicketUnitOfWork
  }

  get userDatastore(): UserDatastoreInfrastructureService {
    return new MongoUserDatastore();
  }

  get communityDatastore(): CommunityDatastoreInfrastructureService {
    return new MongoCommunityDatastore();
  }

  get memberDatastore(): MemberDatastoreInfrastructureService {
    return new MongoMemberDatastore();
  }

  get roleDatastore(): RoleDatastoreInfrastructureService {
    return new MongoRoleDatastore();
  }

  get propertyDatastore(): PropertyDatastoreInfrastructureService {
    return new MongoPropertyDatastore();
  }

  get serviceDatastore(): ServiceDatastoreInfrastructureService {
    return new MongoServiceDatastore();
  }

  get serviceTicketDatastore(): ServiceTicketDatastoreInfrastructureService {
    return new MongoServiceTicketDatastore();
  }
}