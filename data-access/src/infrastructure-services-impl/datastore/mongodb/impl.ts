import { DatastoreInfrastructureService } from "../../../app/infrastructure-services/datastore";
import { MongoCommunityUnitOfWork } from "./infrastructure/community/community.mongo-uow";
import { MongoMemberUnitOfWork } from "./infrastructure/member/member.mongo-uow";
import { MongoPropertyUnitOfWork } from "./infrastructure/property/property.mongo-uow";
import { MongoRoleUnitOfWork } from "./infrastructure/role/role.mongo-uow";
import { MongoServiceTicketV1UnitOfWork } from "./infrastructure/service-ticket/v1/service-ticket.uow";
import { MongoServiceUnitOfWork } from "./infrastructure/service/service.uow";
import { MongoUserUnitOfWork } from "./infrastructure/user/user.uow";
import { MongoViolationTicketV1UnitOfWork } from "./infrastructure/violation-ticket/v1/violation-ticket.uow";

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

  get serviceTicketV1UnitOfWork(): typeof MongoServiceTicketV1UnitOfWork {
    return MongoServiceTicketV1UnitOfWork
  }

  get violationTicketV1UnitOfWork(): typeof MongoViolationTicketV1UnitOfWork {
    return MongoViolationTicketV1UnitOfWork
  }
}