import { DatastoreInfrastructureService } from "../../../app/infrastructure-services/datastore";
import { MongoCommunityUnitOfWork } from "./infrastructure/community/community.mongo-uow";
import { MongoMemberUnitOfWork } from "./infrastructure/member/member.mongo-uow";
import { MongoPropertyUnitOfWork } from "./infrastructure/property/property.mongo-uow";
import { MongoRoleUnitOfWork } from "./infrastructure/role/role.mongo-uow";
import { MongoServiceTicketUnitOfWork } from "./infrastructure/service-ticket/v1/service-ticket.uow";
import { MongoServiceUnitOfWork } from "./infrastructure/service/service.uow";
import { MongoUserUnitOfWork } from "./infrastructure/user/user.uow";
import { MongoViolationTicketUnitOfWork } from "./infrastructure/violation-ticket/v1/violation-ticket.uow";

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

  get violationTicketUnitOfWork(): typeof MongoViolationTicketUnitOfWork {
    return MongoViolationTicketUnitOfWork
  }
}