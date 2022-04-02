import { NodeEventBus } from '../events/node-event-bus';
import { MemberUnitOfWork } from '../persistance/repositories';
import { SystemExecutionContext, ReadOnlyContext } from '../persistance/execution-context';
import { RoleDeletedReassignEvent } from '../../events/role-deleted-reassign';
import { RoleModel } from '../../../infrastructure/data-sources/cosmos-db/models/role';
import { RoleConverter } from '../persistance/adapters/role-domain-adapter';

export default () => { NodeEventBus.register(RoleDeletedReassignEvent, async (payload) => {

  console.log(`RoleDeletedEvent -> Reassign new Role to Member Handler - Called with Payload: ${JSON.stringify(payload)}`);

  const mongoNewRole = await RoleModel.findById(payload.newRoleId).exec();
  const roleDo = new RoleConverter().toDomain(mongoNewRole,ReadOnlyContext());

  await MemberUnitOfWork.withTransaction(SystemExecutionContext(), async (repo) => {
    const members = await repo.getAssignedToRole(payload.deletedRoleId);
    members.forEach(async (member) => {
      member.requestSetRole(roleDo);
      await repo.save(member);
    });
  });
  
})};