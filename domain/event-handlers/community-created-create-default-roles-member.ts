import { NodeEventBus } from '../../domain-impl-event-bus/node-event-bus';
import { CommunityCreatedEvent } from '../events/community-created';
import { ReadOnlyContext, SystemExecutionContext } from '../infrastructure/execution-context';
import { Role } from '../contexts/community/role';
import { AccountStatusCodes } from '../contexts/community/account.value-objects';
import { Community, CommunityProps } from '../contexts/community/community';
import { CommunityUnitOfWork } from '../contexts/community/community.uow';
import { RoleUnitOfWork } from '../contexts/community/role.uow';
import { MemberUnitOfWork } from '../contexts/community/member.uow';

export default (
  communityUnitOfWork: CommunityUnitOfWork,
  roleUnitOfWork: RoleUnitOfWork,
  memberUnitOfWork: MemberUnitOfWork
) => { NodeEventBus.register(CommunityCreatedEvent, async (payload) => {

  console.log(`CommunityCreatedEvent -> Default Roles/Member Handler - Called with Payload: ${JSON.stringify(payload)}`);

  let communityDo: Community<CommunityProps>;
  await communityUnitOfWork.withTransaction(ReadOnlyContext(), async (repo) => {
    communityDo = await repo.getByIdWithCreatedBy(payload.communityId);
  });
  let role: Role<any>;
  await roleUnitOfWork.withTransaction(SystemExecutionContext(), async (repo) => {
    role = await repo.getNewInstance('admin', communityDo);
    role.isDefault=(true);

    role.permissions.communityPermissions.CanManageRolesAndPermissions=(true);
    role.permissions.communityPermissions.CanManageCommunitySettings=(true);
    role.permissions.communityPermissions.CanManageSiteContent=(true);
    role.permissions.communityPermissions.CanManageMembers=(true);
    role.permissions.communityPermissions.CanEditOwnMemberProfile=(true);
    role.permissions.communityPermissions.CanEditOwnMemberAccounts=(true);

    role.permissions.propertyPermissions.canManageProperties=(true);
    role.permissions.propertyPermissions.canEditOwnProperty=(true);

    role.permissions.serviceTicketPermissions.canCreateTickets=(true);
    role.permissions.serviceTicketPermissions.canManageTickets=(true);
    role.permissions.serviceTicketPermissions.canAssignTickets=(true);
    role.permissions.serviceTicketPermissions.canWorkOnTickets=(true);

    role = await repo.save(role);
  });

  const fullName = `${communityDo.createdBy.firstName?? ''} ${communityDo.createdBy.lastName?? ''}`;

  await memberUnitOfWork.withTransaction(SystemExecutionContext(), async (repo) => {
    const member = await repo.getNewInstance(fullName, communityDo);
    member.Role=(role);
    const account = member.requestNewAccount();
    account.createdBy=communityDo.createdBy
    account.firstName=communityDo.createdBy.firstName
    account.lastName=communityDo.createdBy.lastName
    account.statusCode=AccountStatusCodes.Accepted
    account.user=communityDo.createdBy
    await repo.save(member);
  });
  
})};