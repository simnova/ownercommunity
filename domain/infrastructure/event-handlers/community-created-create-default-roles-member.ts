import { NodeEventBus } from '../core/events/node-event-bus';
import { CommunityCreatedEvent } from '../../events/community-created';
import { RoleUnitOfWork } from '../persistence/role.uow';
import { MemberUnitOfWork } from '../persistence/member.uow';
import { SystemExecutionContext, ReadOnlyContext } from '../execution-context';
import { CommunityModel } from '../../../infrastructure/data-sources/cosmos-db/models/community';
import { CommunityConverter } from '../persistence/community.domain-adapter';
import { Role } from '../../contexts/community/role';
import { AccountStatusCodes } from '../../contexts/community/account.value-objects';

export default () => { NodeEventBus.register(CommunityCreatedEvent, async (payload) => {

  console.log(`CommunityCreatedEvent -> Default Roles/Member Handler - Called with Payload: ${JSON.stringify(payload)}`);

  const mongoCommunity = await CommunityModel.findById(payload.communityId).populate('createdBy').exec();
  const communityDo = new CommunityConverter().toDomain(mongoCommunity,ReadOnlyContext());
  let role: Role<any>;
  await RoleUnitOfWork.withTransaction(SystemExecutionContext(), async (repo) => {
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

  await MemberUnitOfWork.withTransaction(SystemExecutionContext(), async (repo) => {
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