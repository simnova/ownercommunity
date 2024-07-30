import { DomainDataSource } from "../../../data-sources/domain-data-source";
import { EndUserRole } from "../../../domain/contexts/community/roles/end-user-role/end-user-role";
import { ReadOnlyDomainVisa } from "../../../domain/domain.visa";
import { EndUserRoleData } from "../../../external-dependencies/datastore";
import { EndUserRoleDomainAdapter, CommunityConverter, EndUserRoleConverter, EndUserRoleRepository } from "../../../external-dependencies/domain";
import { RoleAddInput, RoleDeleteAndReassignInput, RoleUpdateInput } from "../../../external-dependencies/graphql-api";
import { AppContext } from "../../../init/app-context-builder";

export interface EndUserRoleDomainApi {
  roleAdd(input: RoleAddInput) : Promise<EndUserRoleData>;
  roleUpdate(input: RoleUpdateInput) : Promise<EndUserRoleData>;
  roleDeleteAndReassign(input: RoleDeleteAndReassignInput) : Promise<EndUserRoleData>;
}

type PropType = EndUserRoleDomainAdapter;
type DomainType = EndUserRole<PropType>;
type RepoType = EndUserRoleRepository<PropType>;

export class EndUserRoleDomainApiImpl
  extends DomainDataSource<AppContext, EndUserRoleData, PropType, DomainType, RepoType>
  implements EndUserRoleDomainApi {

  async roleAdd(input: RoleAddInput): Promise<EndUserRoleData> {
    console.log(`roleAdd`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:roleCreate');
    }

    let roleToReturn: EndUserRoleData;
    let community = await this.context.applicationServices.community.dataApi.getCommunityById(this.context.community?.id);
    let communityDo = new CommunityConverter().toDomain(community, { domainVisa: ReadOnlyDomainVisa.GetInstance() });

    await this.withTransaction(async (repo) => {
      let roleDo = await repo.getNewInstance(
        input.roleName,
        communityDo);

      roleDo.permissions.communityPermissions.canManageRolesAndPermissions = (input.permissions.communityPermissions.canManageRolesAndPermissions);
      roleDo.permissions.communityPermissions.canManageCommunitySettings = (input.permissions.communityPermissions.canManageCommunitySettings);
      roleDo.permissions.communityPermissions.canManageSiteContent = (input.permissions.communityPermissions.canManageSiteContent);
      roleDo.permissions.communityPermissions.canManageMembers = (input.permissions.communityPermissions.canManageMembers);
      roleDo.permissions.communityPermissions.canEditOwnMemberProfile = (input.permissions.communityPermissions.canEditOwnMemberProfile);
      roleDo.permissions.communityPermissions.canEditOwnMemberAccounts = (input.permissions.communityPermissions.canEditOwnMemberAccounts);

      roleDo.permissions.propertyPermissions.canManageProperties = (input.permissions.propertyPermissions.canManageProperties);
      roleDo.permissions.propertyPermissions.canEditOwnProperty = (input.permissions.propertyPermissions.canEditOwnProperty);

      roleDo.permissions.serviceTicketPermissions.canCreateTickets = (input.permissions.serviceTicketPermissions.canCreateTickets);
      roleDo.permissions.serviceTicketPermissions.canManageTickets = (input.permissions.serviceTicketPermissions.canManageTickets);
      roleDo.permissions.serviceTicketPermissions.canAssignTickets = (input.permissions.serviceTicketPermissions.canAssignTickets);
      roleDo.permissions.serviceTicketPermissions.canWorkOnTickets = (input.permissions.serviceTicketPermissions.canWorkOnTickets);

      roleToReturn = new EndUserRoleConverter().toPersistence(await repo.save(roleDo));
    });
    return roleToReturn;
  }

  async roleUpdate(input: RoleUpdateInput): Promise<EndUserRoleData> {
    console.log(`roleUpdate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:roleUpdate');
    }

    let roleToReturn: EndUserRoleData;
    await this.withTransaction(async (repo) => {
      let roleDo = await repo.getById(input.id);

      roleDo.roleName = (input.roleName);

      roleDo.permissions.communityPermissions.canManageRolesAndPermissions = (input.permissions.communityPermissions.canManageRolesAndPermissions);
      roleDo.permissions.communityPermissions.canManageCommunitySettings = (input.permissions.communityPermissions.canManageCommunitySettings);
      roleDo.permissions.communityPermissions.canManageSiteContent = (input.permissions.communityPermissions.canManageSiteContent);
      roleDo.permissions.communityPermissions.canManageMembers = (input.permissions.communityPermissions.canManageMembers);
      roleDo.permissions.communityPermissions.canEditOwnMemberProfile = (input.permissions.communityPermissions.canEditOwnMemberProfile);
      roleDo.permissions.communityPermissions.canEditOwnMemberAccounts = (input.permissions.communityPermissions.canEditOwnMemberAccounts);

      roleDo.permissions.propertyPermissions.canManageProperties = (input.permissions.propertyPermissions.canManageProperties);
      roleDo.permissions.propertyPermissions.canEditOwnProperty = (input.permissions.propertyPermissions.canEditOwnProperty);

      roleDo.permissions.serviceTicketPermissions.canCreateTickets = (input.permissions.serviceTicketPermissions.canCreateTickets);
      roleDo.permissions.serviceTicketPermissions.canManageTickets = (input.permissions.serviceTicketPermissions.canManageTickets);
      roleDo.permissions.serviceTicketPermissions.canAssignTickets = (input.permissions.serviceTicketPermissions.canAssignTickets);
      roleDo.permissions.serviceTicketPermissions.canWorkOnTickets = (input.permissions.serviceTicketPermissions.canWorkOnTickets);

      roleDo.permissions.violationTicketPermissions.canAssignTickets = (input.permissions.violationTicketPermissions.canAssignTickets);
      roleDo.permissions.violationTicketPermissions.canCreateTickets = (input.permissions.violationTicketPermissions.canCreateTickets);
      roleDo.permissions.violationTicketPermissions.canManageTickets = (input.permissions.violationTicketPermissions.canManageTickets);
      roleDo.permissions.violationTicketPermissions.canWorkOnTickets = (input.permissions.violationTicketPermissions.canWorkOnTickets);

      roleToReturn = new EndUserRoleConverter().toPersistence(await repo.save(roleDo));
    });
    return roleToReturn;
  }

  async roleDeleteAndReassign(input: RoleDeleteAndReassignInput): Promise<EndUserRoleData> {
    console.log(`roleDeleteAndReassign`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:roleDeleteAndReassign');
    }

    let mongoNewRole = await this.context.applicationServices.roles.endUserRole.dataApi.getRoleById(input.roleToReassignTo);
    let newROleDo = new EndUserRoleConverter().toDomain(mongoNewRole, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    let roleToReturn: EndUserRoleData;
    await this.withTransaction(async (repo) => {
      let roleDo = await repo.getById(input.roleToDelete);
      roleDo.deleteAndReassignTo = (newROleDo);
      roleToReturn = new EndUserRoleConverter().toPersistence(await repo.save(roleDo));
    });
    return roleToReturn;
  }
}
