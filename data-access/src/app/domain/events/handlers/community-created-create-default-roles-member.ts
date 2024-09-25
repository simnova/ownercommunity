import { CommunityCreatedEvent } from '../types/community-created';
import { ReadOnlyDomainExecutionContext, SystemDomainExecutionContext } from '../../domain-execution-context';
import { EndUserRole } from '../../contexts/community/roles/end-user-role/end-user-role';
import { AccountStatusCodes } from '../../contexts/community/member/member-account.value-objects';
import { Community, CommunityProps } from '../../contexts/community/community/community';
import { CommunityUnitOfWork } from '../../contexts/community/community/community.uow';
import { EndUserRoleUnitOfWork } from '../../contexts/community/roles/end-user-role/end-user-role.uow';
import { MemberUnitOfWork } from '../../contexts/community/member/member.uow';
import { EventBusInstance } from '../event-bus';
import { SystemInfrastructureContext } from '../../../init/infrastructure-context';

export default (
  communityUnitOfWork: CommunityUnitOfWork,
  roleUnitOfWork: EndUserRoleUnitOfWork,
  memberUnitOfWork: MemberUnitOfWork
) => { EventBusInstance.register(CommunityCreatedEvent, async (payload) => {

  console.log(`CommunityCreatedEvent -> Default Roles/Member Handler - Called with Payload: ${JSON.stringify(payload)}`);

  let communityDo: Community<CommunityProps>;
  await communityUnitOfWork.withTransaction(ReadOnlyDomainExecutionContext(), SystemInfrastructureContext(), async (repo) => {
    communityDo = await repo.getByIdWithCreatedBy(payload.communityId);
  });
  let role: EndUserRole<any>;
  await roleUnitOfWork.withTransaction(SystemDomainExecutionContext(), SystemInfrastructureContext(), async (repo) => {
    role = await repo.getNewInstance('admin', communityDo);
    role.IsDefault=(true);

    role.permissions.communityPermissions.CanManageRolesAndPermissions=(true);
    role.permissions.communityPermissions.CanManageCommunitySettings=(true);
    role.permissions.communityPermissions.CanManageSiteContent=(true);
    role.permissions.communityPermissions.CanManageMembers=(true);
    role.permissions.communityPermissions.CanEditOwnMemberProfile=(true);
    role.permissions.communityPermissions.CanEditOwnMemberAccounts=(true);

    role.permissions.propertyPermissions.CanManageProperties=(true);
    role.permissions.propertyPermissions.CanEditOwnProperty=(true);

    role.permissions.serviceTicketPermissions.CanCreateTickets=(true);
    role.permissions.serviceTicketPermissions.CanManageTickets=(true);
    role.permissions.serviceTicketPermissions.CanAssignTickets=(true);
    role.permissions.serviceTicketPermissions.CanWorkOnTickets=(true);

    role.permissions.violationTicketPermissions.CanCreateTickets=(true);
    role.permissions.violationTicketPermissions.CanManageTickets=(true);
    role.permissions.violationTicketPermissions.CanAssignTickets=(true);
    role.permissions.violationTicketPermissions.CanWorkOnTickets=(true);

    role = await repo.save(role);
  });

  const fullName = communityDo.createdBy.personalInformation?.identityDetails?.legalNameConsistsOfOneName ? 
                  `${communityDo.createdBy.personalInformation?.identityDetails?.lastName}` :
                  `${communityDo.createdBy.personalInformation?.identityDetails?.restOfName} ${communityDo.createdBy.personalInformation?.identityDetails?.lastName}`;

  await memberUnitOfWork.withTransaction(SystemDomainExecutionContext(), SystemInfrastructureContext(), async (repo) => {
    const member = await repo.getNewInstance(fullName, communityDo);
    member.Role=(role);
    const account = member.requestNewAccount();
    account.CreatedBy = (communityDo.createdBy)
    account.FirstName = (communityDo.createdBy.personalInformation.identityDetails?.restOfName)
    account.LastName = (communityDo.createdBy.personalInformation.identityDetails.lastName)
    account.StatusCode = (AccountStatusCodes.Accepted)
    account.User = (communityDo.createdBy);
    await repo.save(member);
  });
  
})};