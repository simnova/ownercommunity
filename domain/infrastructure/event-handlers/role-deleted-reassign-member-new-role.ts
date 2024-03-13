import { NodeEventBus } from '../core/events/node-event-bus';
import { MongoMemberUnitOfWork } from '../persistence/member.mongo-uow';
import { SystemExecutionContext, ReadOnlyContext } from '../execution-context';
import { RoleDeletedReassignEvent } from '../../events/role-deleted-reassign';
import { RoleModel } from '../../../infrastructure/data-sources/cosmos-db/models/role';
import { RoleConverter } from '../persistence/role.domain-adapter';

export default () => { NodeEventBus.register(RoleDeletedReassignEvent, async (payload) => {

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