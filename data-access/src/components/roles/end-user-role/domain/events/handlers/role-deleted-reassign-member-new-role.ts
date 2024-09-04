import { MongoMemberUnitOfWork } from '../../../../infrastructure-services-impl/datastore/mongodb/infrastructure/member/member.mongo-uow';
import { SystemExecutionContext, ReadOnlyContext } from '../../../../../framework/domain/domain-execution-context';
import { RoleDeletedReassignEvent } from '../types/role-deleted-reassign';
import { EndUserRoleModel } from '../../../../infrastructure-services-impl/datastore/mongodb/models/roles/end-user-role';
import { EndUserRoleConverter } from '../../../../../../infrastructure-services-impl/datastore/mongodb/infrastructure/roles/end-user-role/end-user-role.domain-adapter';
import { EventBusInstance } from '../../../../../framework/domain/event-bus';

export default (
) => { EventBusInstance.register(RoleDeletedReassignEvent, async (payload) => {

  console.log(`RoleDeletedEvent -> Reassign new Role to Member Handler - Called with Payload: ${JSON.stringify(payload)}`);

  const mongoNewRole = await EndUserRoleModel.findById(payload.newRoleId).exec();
  const roleDo = new EndUserRoleConverter().toDomain(mongoNewRole,ReadOnlyContext());

  await MongoMemberUnitOfWork.withTransaction(SystemExecutionContext(), async (repo) => {
    const members = await repo.getAssignedToRole(payload.deletedRoleId);
    members.forEach(async (member) => {
      member.Role=(roleDo);
      await repo.save(member);
    });
  });
  
})};