import { DatastoreInfrastructureService } from "../../../app/infrastructure-services/datastore";
import { MongoCommunityUnitOfWork } from "./infrastructure/community/community.mongo-uow";
import { MongoMemberUnitOfWork } from "./infrastructure/member/member.mongo-uow";
import { MongoPropertyUnitOfWork } from "./infrastructure/property/property.mongo-uow";
import { MongoEndUserRoleUnitOfWork } from "./infrastructure/roles/end-user-role/end-user-role.mongo-uow";
import { MongoStaffRoleUnitOfWork } from "./infrastructure/roles/staff-role/staff-role.mongo-uow";
import { MongoServiceTicketV1UnitOfWork } from "./infrastructure/cases/service-ticket/v1/service-ticket.uow";
import { MongoServiceUnitOfWork } from "./infrastructure/service/service.uow";
import { MongoViolationTicketV1UnitOfWork } from "./infrastructure/cases/violation-ticket/v1/violation-ticket.uow";
import { MongoEndUserUnitOfWork } from "./infrastructure/users/end-user/end-user.uow";
import { MongoStaffUserUnitOfWork } from "./infrastructure/users/staff-user/staff-user.uow";

export class MongodbDatastoreImpl implements DatastoreInfrastructureService {

  startup = async (): Promise<void> => {
    console.log('custom-log | MongodbDatastoreImpl | startup');
  }

  shutdown = async (): Promise<void> => {
    console.log('custom-log | MongodbDatastoreImpl | shutdown');
  }

  get endUserUnitOfWork(): typeof MongoEndUserUnitOfWork {
    return MongoEndUserUnitOfWork
  }

  get staffUserUnitOfWork(): typeof MongoStaffUserUnitOfWork {
    return MongoStaffUserUnitOfWork
  }

  get communityUnitOfWork(): typeof MongoCommunityUnitOfWork {
    return MongoCommunityUnitOfWork
  }

  get memberUnitOfWork(): typeof MongoMemberUnitOfWork {
    return MongoMemberUnitOfWork
  }

  get endUserRoleUnitOfWork(): typeof MongoEndUserRoleUnitOfWork {
    return MongoEndUserRoleUnitOfWork
  }

  get staffRoleUnitOfWork(): typeof MongoStaffRoleUnitOfWork {
    return MongoStaffRoleUnitOfWork
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