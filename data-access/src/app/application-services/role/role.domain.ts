import { DomainDataSource } from "../../data-sources/domain-data-source";
import { Role } from "../../domain/contexts/community/role/role";
import { ReadOnlyDomainVisa } from "../../domain/contexts/domain-visa";
import { RoleData } from "../../external-dependencies/datastore";
import { RoleDomainAdapter, CommunityConverter, RoleConverter, RoleRepository } from "../../external-dependencies/domain";
import { RoleAddInput, RoleDeleteAndReassignInput, RoleUpdateInput } from "../../external-dependencies/graphql-api";
import { AppContext } from "../../init/app-context-builder";

export interface RoleDomainApi {
  roleAdd(input: RoleAddInput) : Promise<RoleData>;
  roleUpdate(input: RoleUpdateInput) : Promise<RoleData>;
  roleDeleteAndReassign(input: RoleDeleteAndReassignInput) : Promise<RoleData>;
}

type PropType = RoleDomainAdapter;
type DomainType = Role<PropType>;
type RepoType = RoleRepository<PropType>;

export class RoleDomainApiImpl
  extends DomainDataSource<AppContext, RoleData, PropType, DomainType, RepoType>
  implements RoleDomainApi {

  async roleAdd(input: RoleAddInput): Promise<RoleData> {
    console.log(`roleAdd`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:roleCreate');
    }

    let roleToReturn: RoleData;
    let community = await this.context.applicationServices.community.dataApi.getCommunityById(this.context.communityId);
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

      roleToReturn = new RoleConverter().toPersistence(await repo.save(roleDo));
    });
    return roleToReturn;
  }

  async roleUpdate(input: RoleUpdateInput): Promise<RoleData> {
    console.log(`roleUpdate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:roleUpdate');
    }

    let roleToReturn: RoleData;
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

      roleToReturn = new RoleConverter().toPersistence(await repo.save(roleDo));
    });
    return roleToReturn;
  }

  async roleDeleteAndReassign(input: RoleDeleteAndReassignInput): Promise<RoleData> {
    console.log(`roleDeleteAndReassign`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:roleDeleteAndReassign');
    }

    let mongoNewRole = await this.context.applicationServices.role.dataApi.getRoleById(input.roleToReassignTo);
    let newROleDo = new RoleConverter().toDomain(mongoNewRole, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    let roleToReturn: RoleData;
    await this.withTransaction(async (repo) => {
      let roleDo = await repo.getById(input.roleToDelete);
      roleDo.deleteAndReassignTo = (newROleDo);
      roleToReturn = new RoleConverter().toPersistence(await repo.save(roleDo));
    });
    return roleToReturn;
  }
}
