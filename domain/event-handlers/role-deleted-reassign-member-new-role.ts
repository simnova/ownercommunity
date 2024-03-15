import { NodeEventBus } from '../infrastructure/core/events/node-event-bus';
import { MongoMemberUnitOfWork } from '../../domain-impl-mongo/member.mongo-uow';
import { SystemExecutionContext, ReadOnlyContext } from '../infrastructure/execution-context';
import { RoleDeletedReassignEvent } from '../events/role-deleted-reassign';
import { RoleModel } from '../../infrastructure/data-sources/cosmos-db/models/role';
import { RoleConverter } from '../../domain-impl-mongo/role.domain-adapter';

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