import { MongoMemberUnitOfWork } from '../../../../infrastructure-services-impl/datastore/mongodb/infrastructure/member.mongo-uow';
import { SystemExecutionContext, ReadOnlyContext } from '../../contexts/domain-execution-context';
import { RoleDeletedReassignEvent } from '../types/role-deleted-reassign';
import { RoleModel } from '../../../../infrastructure-services-impl/datastore/mongodb/models/role';
import { RoleConverter } from '../../../../infrastructure-services-impl/datastore/mongodb/infrastructure/role.domain-adapter';
import { EventBusInstance } from '../event-bus';

export default (
) => { EventBusInstance.register(RoleDeletedReassignEvent, async (payload) => {

  console.log(`RoleDeletedEvent -> Reassign new Role to Member Handler - Called with Payload: ${JSON.stringify(payload)}`);

  const mongoNewRole = await RoleModel.findById(payload.newRoleId).exec();
  const roleDo = new RoleConverter().toDomain(mongoNewRole,ReadOnlyContext());

  await MongoMemberUnitOfWork.withTransaction(SystemExecutionContext(), async (repo) => {
    const members = await repo.getAssignedToRole(payload.deletedRoleId);
    members.forEach(async (member) => {
      member.Role=(roleDo);
      await repo.save(member);
    });
  });
  
})};