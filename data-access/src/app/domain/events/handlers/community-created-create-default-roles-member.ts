import { CommunityCreatedEvent } from '../types/community-created';
import { ReadOnlyContext, SystemExecutionContext } from '../../domain-execution-context';
import { EndUserRole } from '../../contexts/community/roles/end-user-role/end-user-role';
import { AccountStatusCodes } from '../../contexts/community/member/account.value-objects';
import { Community, CommunityProps } from '../../contexts/community/community/community';
import { CommunityUnitOfWork } from '../../contexts/community/community/community.uow';
import { EndUserRoleUnitOfWork } from '../../contexts/community/roles/end-user-role/end-user-role.uow';
import { MemberUnitOfWork } from '../../contexts/community/member/member.uow';
import { EventBusInstance } from '../event-bus';

export default (
  communityUnitOfWork: CommunityUnitOfWork,
  roleUnitOfWork: EndUserRoleUnitOfWork,
  memberUnitOfWork: MemberUnitOfWork
) => { EventBusInstance.register(CommunityCreatedEvent, async (payload) => {

  console.log(`CommunityCreatedEvent -> Default Roles/Member Handler - Called with Payload: ${JSON.stringify(payload)}`);

  let communityDo: Community<CommunityProps>;
  await communityUnitOfWork.withTransaction(ReadOnlyContext(), async (repo) => {
    communityDo = await repo.getByIdWithCreatedBy(payload.communityId);
  });
  let role: EndUserRole<any>;
  await roleUnitOfWork.withTransaction(SystemExecutionContext(), async (repo) => {
    role = await repo.getNewInstance('admin', communityDo);
    role.isDefault=(true);

    role.permissions.communityPermissions.canManageRolesAndPermissions=(true);
    role.permissions.communityPermissions.canManageCommunitySettings=(true);
    role.permissions.communityPermissions.canManageSiteContent=(true);
    role.permissions.communityPermissions.canManageMembers=(true);
    role.permissions.communityPermissions.canEditOwnMemberProfile=(true);
    role.permissions.communityPermissions.canEditOwnMemberAccounts=(true);

    role.permissions.propertyPermissions.canManageProperties=(true);
    role.permissions.propertyPermissions.canEditOwnProperty=(true);

    role.permissions.serviceTicketPermissions.canCreateTickets=(true);
    role.permissions.serviceTicketPermissions.canManageTickets=(true);
    role.permissions.serviceTicketPermissions.canAssignTickets=(true);
    role.permissions.serviceTicketPermissions.canWorkOnTickets=(true);

    role.permissions.violationTicketPermissions.canCreateTickets=(true);
    role.permissions.violationTicketPermissions.canManageTickets=(true);
    role.permissions.violationTicketPermissions.canAssignTickets=(true);
    role.permissions.violationTicketPermissions.canWorkOnTickets=(true);

    role = await repo.save(role);
  });

  const fullName = communityDo.createdBy.personalInformation?.identityDetails?.legalNameConsistsOfOneName ? 
                  `${communityDo.createdBy.personalInformation?.identityDetails?.lastName}` :
                  `${communityDo.createdBy.personalInformation?.identityDetails?.restOfName} ${communityDo.createdBy.personalInformation?.identityDetails?.lastName}`;

  await memberUnitOfWork.withTransaction(SystemExecutionContext(), async (repo) => {
    const member = await repo.getNewInstance(fullName, communityDo);
    member.Role=(role);
    const account = member.requestNewAccount();
    account.createdBy=communityDo.createdBy
    account.firstName=communityDo.createdBy.personalInformation.identityDetails?.restOfName
    account.lastName=communityDo.createdBy.personalInformation.identityDetails.lastName
    account.statusCode=AccountStatusCodes.Accepted
    account.user=communityDo.createdBy
    await repo.save(member);
  });
  
})};