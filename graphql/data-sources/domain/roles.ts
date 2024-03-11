import { Role as RoleDO } from '../../../domain/contexts/community/role';
import { RoleConverter, RoleDomainAdapter }from '../../../domain/infrastructure/persistence/role.domain-adapter';
import { MongoRoleRepository } from '../../../domain/infrastructure/persistence/role.mongo-repository';
import { Context } from '../../context';
import { RoleAddInput, RoleDeleteAndReassignInput, RoleUpdateInput } from '../../generated';
import { DomainDataSource } from './domain-data-source';
import { Role } from '../../../infrastructure/data-sources/cosmos-db/models/role';
import { CommunityConverter } from '../../../domain/infrastructure/persistence/community.domain-adapter';
import { ReadOnlyPassport } from '../../../domain/contexts/iam/passport';

type PropType = RoleDomainAdapter;
type DomainType = RoleDO<PropType>;
type RepoType = MongoRoleRepository<PropType>;

export class Roles extends DomainDataSource<Context,Role,PropType,DomainType,RepoType> {

  async roleAdd(input: RoleAddInput) : Promise<Role> {
    console.log(`roleAdd`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:roleCreate');
    }
    
    let roleToReturn : Role;
    let community = await this.context.dataSources.communityCosmosdbApi.getCommunityById(this.context.community);
    let communityDo = new CommunityConverter().toDomain(community,{passport:ReadOnlyPassport.GetInstance()});

    await this.withTransaction(async (repo) => {
      let roleDo = await repo.getNewInstance(
        input.roleName,
        communityDo);

      roleDo.permissions.communityPermissions.CanManageRolesAndPermissions=(input.permissions.communityPermissions.canManageRolesAndPermissions);
      roleDo.permissions.communityPermissions.CanManageCommunitySettings=(input.permissions.communityPermissions.canManageCommunitySettings);
      roleDo.permissions.communityPermissions.CanManageSiteContent=(input.permissions.communityPermissions.canManageSiteContent);
      roleDo.permissions.communityPermissions.CanManageMembers=(input.permissions.communityPermissions.canManageMembers);
      roleDo.permissions.communityPermissions.CanEditOwnMemberProfile=(input.permissions.communityPermissions.canEditOwnMemberProfile);
      roleDo.permissions.communityPermissions.CanEditOwnMemberAccounts=(input.permissions.communityPermissions.canEditOwnMemberAccounts);

      roleDo.permissions.propertyPermissions.canManageProperties=(input.permissions.propertyPermissions.canManageProperties);
      roleDo.permissions.propertyPermissions.canEditOwnProperty=(input.permissions.propertyPermissions.canEditOwnProperty);

      roleDo.permissions.serviceTicketPermissions.canCreateTickets=(input.permissions.serviceTicketPermissions.canCreateTickets);
      roleDo.permissions.serviceTicketPermissions.canManageTickets=(input.permissions.serviceTicketPermissions.canManageTickets);
      roleDo.permissions.serviceTicketPermissions.canAssignTickets=(input.permissions.serviceTicketPermissions.canAssignTickets);
      roleDo.permissions.serviceTicketPermissions.canWorkOnTickets=(input.permissions.serviceTicketPermissions.canWorkOnTickets);

      roleToReturn = new RoleConverter().toPersistence(await repo.save(roleDo));
    });
    return roleToReturn;
  }

  async roleUpdate(input: RoleUpdateInput) : Promise<Role> {
    console.log(`roleUpdate`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:roleUpdate');
    }
    
    let roleToReturn : Role;
    await this.withTransaction(async (repo) => {
      let roleDo = await repo.getById(input.id);

      roleDo.roleName=(input.roleName);
      
      roleDo.permissions.communityPermissions.CanManageRolesAndPermissions=(input.permissions.communityPermissions.canManageRolesAndPermissions);
      roleDo.permissions.communityPermissions.CanManageCommunitySettings=(input.permissions.communityPermissions.canManageCommunitySettings);
      roleDo.permissions.communityPermissions.CanManageSiteContent=(input.permissions.communityPermissions.canManageSiteContent);
      roleDo.permissions.communityPermissions.CanManageMembers=(input.permissions.communityPermissions.canManageMembers);
      roleDo.permissions.communityPermissions.CanEditOwnMemberProfile=(input.permissions.communityPermissions.canEditOwnMemberProfile);
      roleDo.permissions.communityPermissions.CanEditOwnMemberAccounts=(input.permissions.communityPermissions.canEditOwnMemberAccounts);

      roleDo.permissions.propertyPermissions.canManageProperties=(input.permissions.propertyPermissions.canManageProperties);
      roleDo.permissions.propertyPermissions.canEditOwnProperty=(input.permissions.propertyPermissions.canEditOwnProperty);

      roleDo.permissions.serviceTicketPermissions.canCreateTickets=(input.permissions.serviceTicketPermissions.canCreateTickets);
      roleDo.permissions.serviceTicketPermissions.canManageTickets=(input.permissions.serviceTicketPermissions.canManageTickets);
      roleDo.permissions.serviceTicketPermissions.canAssignTickets=(input.permissions.serviceTicketPermissions.canAssignTickets);
      roleDo.permissions.serviceTicketPermissions.canWorkOnTickets=(input.permissions.serviceTicketPermissions.canWorkOnTickets);

      roleToReturn = new RoleConverter().toPersistence(await repo.save(roleDo));
    });
    return roleToReturn;
  }

  async roleDeleteAndReassign(input: RoleDeleteAndReassignInput) : Promise<Role> {
    console.log(`roleDeleteAndReassign`,this.context.verifiedUser);
    if(this.context.verifiedUser.openIdConfigKey !== 'AccountPortal') {
      throw new Error('Unauthorized:roleDeleteAndReassign');
    }

    let mongoNewRole = await this.context.dataSources.roleCosmosdbApi.getRoleById(input.roleToReassignTo);
    let newROleDo = new RoleConverter().toDomain(mongoNewRole,{passport:ReadOnlyPassport.GetInstance()});
    let roleToReturn : Role;
    await this.withTransaction(async (repo) => {
      let roleDo = await repo.getById(input.roleToDelete);
      roleDo.deleteAndReassignTo=(newROleDo);
      roleToReturn = new RoleConverter().toPersistence(await repo.save(roleDo))
    });
    return roleToReturn;
  }
}