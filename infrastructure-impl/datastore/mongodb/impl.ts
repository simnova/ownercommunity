import { DatastoreInfrastructureService } from "../../../infrastructure-services/datastore";
import { MongoCommunityUnitOfWork } from "./infrastructure/community.mongo-uow";
import { MongoMemberUnitOfWork } from "./infrastructure/member.mongo-uow";
import { MongoPropertyUnitOfWork } from "./infrastructure/property.mongo-uow";
import { MongoRoleUnitOfWork } from "./infrastructure/role.mongo-uow";
import { MongoServiceTicketUnitOfWork } from "./infrastructure/service-ticket.uow";
import { MongoServiceUnitOfWork } from "./infrastructure/service.uow";
import { MongoUserUnitOfWork } from "./infrastructure/user.uow";

export class MongodbDatastoreImpl implements DatastoreInfrastructureService {
  
  constructor() {
  }

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

}