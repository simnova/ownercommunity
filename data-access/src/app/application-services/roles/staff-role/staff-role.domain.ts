import { DomainDataSource } from "../../../data-sources/domain-data-source";
import { StaffRole } from "../../../domain/contexts/community/roles/staff-role/staff-role";
import { ReadOnlyDomainVisa } from "../../../domain/domain.visa";
import { StaffRoleData } from "../../../external-dependencies/datastore";
import { StaffRoleDomainAdapter, StaffRoleConverter, StaffRoleRepository } from "../../../external-dependencies/domain";
import { StaffRoleAddInput, StaffRoleDeleteAndReassignInput, StaffRoleUpdateInput } from "../../../external-dependencies/graphql-api";
import { AppContext } from "../../../../../framework/app/app-context-builder";

export interface StaffRoleDomainApi {
  roleAdd(input: StaffRoleAddInput) : Promise<StaffRoleData>;
  roleUpdate(input: StaffRoleUpdateInput) : Promise<StaffRoleData>;
  roleDeleteAndReassign(input: StaffRoleDeleteAndReassignInput) : Promise<StaffRoleData>;
}

type PropType = StaffRoleDomainAdapter;
type DomainType = StaffRole<PropType>;
type RepoType = StaffRoleRepository<PropType>;

export class StaffRoleDomainApiImpl
  extends DomainDataSource<AppContext, StaffRoleData, PropType, DomainType, RepoType>
  implements StaffRoleDomainApi {

  async roleAdd(input: StaffRoleAddInput): Promise<StaffRoleData> {
    console.log(`staffRoleAdd`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'StaffPortal') {
      throw new Error('Unauthorized:staffRoleCreate');
    }

    let staffRoleToReturn: StaffRoleData;

    await this.withTransaction(async (repo) => {
      let staffRoleDo = await repo.getNewInstance(input.roleName);

      staffRoleDo.permissions.communityPermissions.CanManageStaffRolesAndPermissions = (input.permissions.communityPermissions.canManageStaffRolesAndPermissions);
      staffRoleDo.permissions.communityPermissions.CanManageAllCommunities = (input.permissions.communityPermissions.canManageAllCommunities);
      staffRoleDo.permissions.communityPermissions.CanDeleteCommunities = (input.permissions.communityPermissions.canDeleteCommunities);
      staffRoleDo.permissions.communityPermissions.CanChangeCommunityOwner = (input.permissions.communityPermissions.canChangeCommunityOwner);
      staffRoleDo.permissions.communityPermissions.CanReIndexSearchCollections = (input.permissions.communityPermissions.canReIndexSearchCollections);

      staffRoleToReturn = new StaffRoleConverter().toPersistence(await repo.save(staffRoleDo));
    });
    return staffRoleToReturn;
  }

  async roleUpdate(input: StaffRoleUpdateInput): Promise<StaffRoleData> {
    console.log(`staffRoleUpdate`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'StaffPortal') {
      throw new Error('Unauthorized:staffRoleUpdate');
    }

    let staffRoleToReturn: StaffRoleData;
    await this.withTransaction(async (repo) => {
      let staffRoleDo = await repo.getById(input.id);

      if (input?.roleName !== undefined) staffRoleDo.RoleName = (input.roleName);

      staffRoleDo.permissions.communityPermissions.CanManageStaffRolesAndPermissions = (input.permissions.communityPermissions.canManageStaffRolesAndPermissions);
      staffRoleDo.permissions.communityPermissions.CanManageAllCommunities = (input.permissions.communityPermissions.canManageAllCommunities);
      staffRoleDo.permissions.communityPermissions.CanDeleteCommunities = (input.permissions.communityPermissions.canDeleteCommunities);
      staffRoleDo.permissions.communityPermissions.CanChangeCommunityOwner = (input.permissions.communityPermissions.canChangeCommunityOwner);
      staffRoleDo.permissions.communityPermissions.CanReIndexSearchCollections = (input.permissions.communityPermissions.canReIndexSearchCollections);

      // staffRoleDo.permissions.propertyPermissions.canManageProperties = (input.permissions.propertyPermissions.canManageProperties);
      // staffRoleDo.permissions.propertyPermissions.canEditOwnProperty = (input.permissions.propertyPermissions.canEditOwnProperty);

      // staffRoleDo.permissions.serviceTicketPermissions.canCreateTickets = (input.permissions.serviceTicketPermissions.canCreateTickets);
      // staffRoleDo.permissions.serviceTicketPermissions.canManageTickets = (input.permissions.serviceTicketPermissions.canManageTickets);
      // staffRoleDo.permissions.serviceTicketPermissions.canAssignTickets = (input.permissions.serviceTicketPermissions.canAssignTickets);
      // staffRoleDo.permissions.serviceTicketPermissions.canWorkOnTickets = (input.permissions.serviceTicketPermissions.canWorkOnTickets);

      // staffRoleDo.permissions.violationTicketPermissions.canAssignTickets = (input.permissions.violationTicketPermissions.canAssignTickets);
      // staffRoleDo.permissions.violationTicketPermissions.canCreateTickets = (input.permissions.violationTicketPermissions.canCreateTickets);
      // staffRoleDo.permissions.violationTicketPermissions.canManageTickets = (input.permissions.violationTicketPermissions.canManageTickets);
      // staffRoleDo.permissions.violationTicketPermissions.canWorkOnTickets = (input.permissions.violationTicketPermissions.canWorkOnTickets);

      staffRoleToReturn = new StaffRoleConverter().toPersistence(await repo.save(staffRoleDo));
    });
    return staffRoleToReturn;
  }

  async roleDeleteAndReassign(input: StaffRoleDeleteAndReassignInput): Promise<StaffRoleData> {
    console.log(`roleDeleteAndReassign`, this.context.verifiedUser);
    if (this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:roleDeleteAndReassign');
    }

    let mongoNewRole = await this.context.applicationServices.roles.staffRole.dataApi.getRoleById(input.roleToReassignTo);
    let newRoleDo = new StaffRoleConverter().toDomain(mongoNewRole, { domainVisa: ReadOnlyDomainVisa.GetInstance() });
    let roleToReturn: StaffRoleData;
    await this.withTransaction(async (repo) => {
      let staffRoleDo = await repo.getById(input.roleToDelete);
      staffRoleDo.DeleteAndReassignTo = (newRoleDo);
      roleToReturn = new StaffRoleConverter().toPersistence(await repo.save(staffRoleDo));
    });
    return roleToReturn;
  }
}
