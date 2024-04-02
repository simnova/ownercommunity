import { Role, RoleEntityReference } from '../../app/domain/contexts/community/role';
import { RoleAddInput, RoleDeleteAndReassignInput, RoleUpdateInput } from '../../app/application-services/domain/role.interface';
import { RoleProps } from '../../app/domain/contexts/community/role';
import { RoleRepository } from '../../app/domain/contexts/community/role.repository';
import { DomainApplicationServiceImpl } from './_domain.application-service';
import { BaseApplicationServiceExecutionContext } from '../_base.application-service';
import { RoleDomainApplicationService } from '../../app/application-services/domain/role.interface';
import { CommunityEntityReference } from '../../app/domain/contexts/community/community';

type PropType = RoleProps;
type Root = Role<PropType>;
type RepoType = RoleRepository<PropType>;

export class RoleDomainApplicationServiceImpl<Context extends BaseApplicationServiceExecutionContext> 
  extends DomainApplicationServiceImpl<Context, PropType, Root, RepoType> 
  implements RoleDomainApplicationService
{
  async roleAdd(input: RoleAddInput) : Promise<Root> {
    console.log(`roleAdd`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:roleCreate');
    }
    
    let roleToReturn : Root;
    let community = await this.context.applicationServices.communityDataApi.getCommunityById(this.context.communityId);
    let communityDo = community as CommunityEntityReference; // new CommunityConverter().toDomain(community,{passport:ReadOnlyPassport.GetInstance()});

    await this.withTransaction(async (repo) => {
      let roleDo = await repo.getNewInstance(
        input.roleName,
        communityDo);

      roleDo.permissions.communityPermissions.canManageRolesAndPermissions=(input.permissions.communityPermissions.canManageRolesAndPermissions);
      roleDo.permissions.communityPermissions.canManageCommunitySettings=(input.permissions.communityPermissions.canManageCommunitySettings);
      roleDo.permissions.communityPermissions.canManageSiteContent=(input.permissions.communityPermissions.canManageSiteContent);
      roleDo.permissions.communityPermissions.canManageMembers=(input.permissions.communityPermissions.canManageMembers);
      roleDo.permissions.communityPermissions.canEditOwnMemberProfile=(input.permissions.communityPermissions.canEditOwnMemberProfile);
      roleDo.permissions.communityPermissions.canEditOwnMemberAccounts=(input.permissions.communityPermissions.canEditOwnMemberAccounts);

      roleDo.permissions.propertyPermissions.canManageProperties=(input.permissions.propertyPermissions.canManageProperties);
      roleDo.permissions.propertyPermissions.canEditOwnProperty=(input.permissions.propertyPermissions.canEditOwnProperty);

      roleDo.permissions.serviceTicketPermissions.canCreateTickets=(input.permissions.serviceTicketPermissions.canCreateTickets);
      roleDo.permissions.serviceTicketPermissions.canManageTickets=(input.permissions.serviceTicketPermissions.canManageTickets);
      roleDo.permissions.serviceTicketPermissions.canAssignTickets=(input.permissions.serviceTicketPermissions.canAssignTickets);
      roleDo.permissions.serviceTicketPermissions.canWorkOnTickets=(input.permissions.serviceTicketPermissions.canWorkOnTickets);

      roleToReturn = await repo.save(roleDo);
    });
    return roleToReturn;
  }

  async roleUpdate(input: RoleUpdateInput) : Promise<Root> {
    console.log(`roleUpdate`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:roleUpdate');
    }
    
    let roleToReturn : Root;
    await this.withTransaction(async (repo) => {
      let roleDo = await repo.getById(input.id);

      roleDo.roleName=(input.roleName);
      
      roleDo.permissions.communityPermissions.canManageRolesAndPermissions=(input.permissions.communityPermissions.canManageRolesAndPermissions);
      roleDo.permissions.communityPermissions.canManageCommunitySettings=(input.permissions.communityPermissions.canManageCommunitySettings);
      roleDo.permissions.communityPermissions.canManageSiteContent=(input.permissions.communityPermissions.canManageSiteContent);
      roleDo.permissions.communityPermissions.canManageMembers=(input.permissions.communityPermissions.canManageMembers);
      roleDo.permissions.communityPermissions.canEditOwnMemberProfile=(input.permissions.communityPermissions.canEditOwnMemberProfile);
      roleDo.permissions.communityPermissions.canEditOwnMemberAccounts=(input.permissions.communityPermissions.canEditOwnMemberAccounts);

      roleDo.permissions.propertyPermissions.canManageProperties=(input.permissions.propertyPermissions.canManageProperties);
      roleDo.permissions.propertyPermissions.canEditOwnProperty=(input.permissions.propertyPermissions.canEditOwnProperty);

      roleDo.permissions.serviceTicketPermissions.canCreateTickets=(input.permissions.serviceTicketPermissions.canCreateTickets);
      roleDo.permissions.serviceTicketPermissions.canManageTickets=(input.permissions.serviceTicketPermissions.canManageTickets);
      roleDo.permissions.serviceTicketPermissions.canAssignTickets=(input.permissions.serviceTicketPermissions.canAssignTickets);
      roleDo.permissions.serviceTicketPermissions.canWorkOnTickets=(input.permissions.serviceTicketPermissions.canWorkOnTickets);

      roleToReturn = await repo.save(roleDo);
    });
    return roleToReturn;
  }

  async roleDeleteAndReassign(input: RoleDeleteAndReassignInput) : Promise<Root> {
    console.log(`roleDeleteAndReassign`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:roleDeleteAndReassign');
    }

    let newRole = await this.context.applicationServices.roleDataApi.getRoleById(input.roleToReassignTo);
    let newRoleDo = newRole as RoleEntityReference; // new RoleConverter().toDomain(mongoNewRole,{passport:ReadOnlyPassport.GetInstance()});
    let roleToReturn : Root;
    await this.withTransaction(async (repo) => {
      let roleDo = await repo.getById(input.roleToDelete);
      roleDo.deleteAndReassignTo=(newRoleDo);
      roleToReturn = await repo.save(roleDo)
    });
    return roleToReturn;
  }
}