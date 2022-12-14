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
    role.requestSetIsDefault(true);

    role.permissions.communityPermissions.setCanManageRolesAndPermissions(true);
    role.permissions.communityPermissions.setCanManageCommunitySettings(true);
    role.permissions.communityPermissions.setCanManageSiteContent(true);
    role.permissions.communityPermissions.setCanManageMembers(true);
    role.permissions.communityPermissions.setCanEditOwnMemberProfile(true);
    role.permissions.communityPermissions.setCanEditOwnMemberAccounts(true);

    role.permissions.propertyPermissions.setCanManageProperties(true);
    role.permissions.propertyPermissions.setCanEditOwnProperty(true);

    role.permissions.serviceTicketPermissions.setCanCreateTickets(true);
    role.permissions.serviceTicketPermissions.setCanManageTickets(true);
    role.permissions.serviceTicketPermissions.setCanAssignTickets(true);
    role.permissions.serviceTicketPermissions.setCanWorkOnTickets(true);

    role = await repo.save(role);
  });

  const fullName = `${communityDo.createdBy.firstName?? ''} ${communityDo.createdBy.lastName?? ''}`;

  await MemberUnitOfWork.withTransaction(SystemExecutionContext(), async (repo) => {
    const member = await repo.getNewInstance(fullName, communityDo);
    member.requestSetRole(role);
    const account = member.requestNewAccount();
    account.requestSetCreatedBy(communityDo.createdBy);
    account.requestSetFirstName(communityDo.createdBy.firstName);
    account.requestSetLastName(communityDo.createdBy.lastName);
    account.requestSetStatusCode(AccountStatusCodes.Accepted);
    account.requestSetUser(communityDo.createdBy);
  
    await repo.save(member);
  });
  
})};