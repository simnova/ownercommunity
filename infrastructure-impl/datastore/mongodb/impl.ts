import { DatastoreInfrastructureService, UserDatastoreInfrastructureService } from "../../../infrastructure-services/datastore";
import { MongoCommunityUnitOfWork } from "./infrastructure/community.mongo-uow";
import { MongoMemberUnitOfWork } from "./infrastructure/member.mongo-uow";
import { MongoPropertyUnitOfWork } from "./infrastructure/property.mongo-uow";
import { MongoRoleUnitOfWork } from "./infrastructure/role.mongo-uow";
import { MongoServiceTicketUnitOfWork } from "./infrastructure/service-ticket.uow";
import { MongoServiceUnitOfWork } from "./infrastructure/service.uow";
import { MongoUserUnitOfWork } from "./infrastructure/user.uow";
import { MongoUserDatastore } from "./infrastructure/user.mongo-datastore";
import { MongoCommunityDatastore } from "./infrastructure/community.mongo-datastore";
import { MongoMemberDatastore } from "./infrastructure/member.mongo-datastore";
import { MongoPropertyDatastore } from "./infrastructure/property.mongo-datastore";
import { MongoRoleDatastore } from "./infrastructure/role.mongo-datastore";
import { MongoServiceDatastore } from "./infrastructure/service.mongo-datastore";
import { MongoServiceTicketDatastore } from "./infrastructure/service-ticket.mongo-datastore";

export class MongodbDatastoreImpl implements DatastoreInfrastructureService {

  startup = async (): Promise<void> => {
    console.log('MongodbDatastoreImpl startup');
  }

  shutdown = async (): Promise<void> => {
    console.log('MongodbDatastoreImpl shutdown');
  }

  get userUnitOfWork(): typeof MongoUserUnitOfWork {
    return MongoUserUnitOfWork
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

  get communityDatastore(): MongoCommunityDatastore {
    return new MongoCommunityDatastore();
  }

  get memberDatastore(): MongoMemberDatastore {
    return new MongoMemberDatastore();
  }

  get roleDatastore(): MongoRoleDatastore {
    return new MongoRoleDatastore();
  }

  get propertyDatastore(): MongoPropertyDatastore {
    return new MongoPropertyDatastore();
  }

  get serviceDatastore(): MongoServiceDatastore {
    return new MongoServiceDatastore();
  }

  get serviceTicketDatastore(): MongoServiceTicketDatastore {
    return new MongoServiceTicketDatastore();
  }
}