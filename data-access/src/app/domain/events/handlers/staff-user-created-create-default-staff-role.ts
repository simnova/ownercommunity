import { StaffUserCreatedEvent } from '../types/staff-user-created';
import { SystemExecutionContext } from '../../domain-execution-context';
import { StaffRole } from '../../contexts/community/roles/staff-role/staff-role';
import { StaffRoleUnitOfWork } from '../../contexts/community/roles/staff-role/staff-role.uow';
import { StaffUserUnitOfWork } from '../../contexts/users/staff-user/staff-user.uow';
import { EventBusInstance } from '../event-bus';


export default (
  roleUnitOfWork: StaffRoleUnitOfWork,
  staffUserUnitOfWork: StaffUserUnitOfWork
) => { EventBusInstance.register(StaffUserCreatedEvent, async (payload) => {

  console.log(`StaffUserCreatedEvent -> Default Staff Role Handler - Called with Payload: ${JSON.stringify(payload)}`);

  let role: StaffRole<any>;
  await roleUnitOfWork.withTransaction(SystemExecutionContext(), async (repo) => {
    role = await repo.getByRoleName('admin');
    if (!role) {
      role = await repo.getNewInstance('admin');
      role.isDefault=(true);

      role.permissions.communityPermissions.canManageStaffRolesAndPermissions=(true);
      role.permissions.communityPermissions.canManageAllCommunities=(true);
      role.permissions.communityPermissions.canDeleteCommunities=(true);
      role.permissions.communityPermissions.canChangeCommunityOwner=(true);
      role.permissions.communityPermissions.canReIndexSearchCollections=(true);

      role = await repo.save(role);
    }
  });

  await staffUserUnitOfWork.withTransaction(SystemExecutionContext(), async (repo) => {
      const user = await repo.getByExternalId(payload.externalId);
      user.Role=(role);
      await repo.save(user);
  });

  console.log(`StaffUserCreatedEvent -> Default Staff Role Handler - Completed`);
  
})};