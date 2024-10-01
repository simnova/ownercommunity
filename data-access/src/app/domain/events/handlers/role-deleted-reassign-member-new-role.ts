import { MongoMemberUnitOfWork } from '../../../../infrastructure-services-impl/datastore/mongodb/infrastructure/member/member.mongo-uow';
import { SystemDomainExecutionContext, ReadOnlyDomainExecutionContext } from '../../domain-execution-context';
import { RoleDeletedReassignEvent } from '../types/role-deleted-reassign';
import { EndUserRoleModel } from '../../../../infrastructure-services-impl/datastore/mongodb/models/roles/end-user-role';
import { EndUserRoleConverter } from '../../../../infrastructure-services-impl/datastore/mongodb/infrastructure/roles/end-user-role/end-user-role.domain-adapter';
import { EventBusInstance } from '../event-bus';
import { ReadOnlyInfrastructureContext, SystemInfrastructureContext } from '../../../init/infrastructure-context';

export default (
) => { EventBusInstance.register(RoleDeletedReassignEvent, async (payload) => {

  console.log(`RoleDeletedEvent -> Reassign new Role to Member Handler - Called with Payload: ${JSON.stringify(payload)}`);

  const mongoNewRole = await EndUserRoleModel.findById(payload.newRoleId).exec();
  const roleDo = new EndUserRoleConverter().toDomain(mongoNewRole,ReadOnlyInfrastructureContext(),ReadOnlyDomainExecutionContext());

  await MongoMemberUnitOfWork.withTransaction(SystemDomainExecutionContext(), SystemInfrastructureContext(), async (repo) => {
    const members = await repo.getAssignedToRole(payload.deletedRoleId);
    members.forEach(async (member) => {
      member.Role=(roleDo);
      await repo.save(member);
    });
  });
  
})};