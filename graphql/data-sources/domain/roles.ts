import { Role as RoleDO } from '../../../domain/contexts/community/role';
import { RoleConverter, RoleDomainAdapter }from '../../../domain/infrastructure/persistance/adapters/role-domain-adapter';
import { MongoRoleRepository } from '../../../domain/infrastructure/persistance/repositories/mongo-role-repository';
import { Context } from '../../context';
import { RoleAddInput, RoleDeleteAndReassignInput, RoleUpdateInput } from '../../generated';
import { DomainDataSource } from './domain-data-source';
import { Role } from '../../../infrastructure/data-sources/cosmos-db/models/role';
import { CommunityConverter } from '../../../domain/infrastructure/persistance/adapters/community-domain-adapter';
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

      roleDo.permissions.communityPermissions.setCanManageRolesAndPermissions(input.permissions.communityPermissions.canManageRolesAndPermissions);
      roleDo.permissions.communityPermissions.setCanManageCommunitySettings(input.permissions.communityPermissions.canManageCommunitySettings);
      roleDo.permissions.communityPermissions.setCanManageSiteContent(input.permissions.communityPermissions.canManageSiteContent);
      roleDo.permissions.communityPermissions.setCanManageMembers(input.permissions.communityPermissions.canManageMembers);
      roleDo.permissions.communityPermissions.setCanEditOwnMemberProfile(input.permissions.communityPermissions.canEditOwnMemberProfile);
      roleDo.permissions.communityPermissions.setCanEditOwnMemberAccounts(input.permissions.communityPermissions.canEditOwnMemberAccounts);

      roleDo.permissions.propertyPermissions.setCanManageProperties(input.permissions.propertyPermissions.canManageProperties);
      roleDo.permissions.propertyPermissions.setCanEditOwnProperty(input.permissions.propertyPermissions.canEditOwnProperty);

      roleDo.permissions.serviceTicketPermissions.setCanCreateTickets(input.permissions.serviceTicketPermissions.canCreateTickets);
      roleDo.permissions.serviceTicketPermissions.setCanManageTickets(input.permissions.serviceTicketPermissions.canManageTickets);
      roleDo.permissions.serviceTicketPermissions.setCanAssignTickets(input.permissions.serviceTicketPermissions.canAssignTickets);
      roleDo.permissions.serviceTicketPermissions.setCanWorkOnTickets(input.permissions.serviceTicketPermissions.canWorkOnTickets);

      roleToReturn = new RoleConverter().toMongo(await repo.save(roleDo));
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

      roleDo.requestSetRoleName(input.roleName);
      
      roleDo.permissions.communityPermissions.setCanManageRolesAndPermissions(input.permissions.communityPermissions.canManageRolesAndPermissions);
      roleDo.permissions.communityPermissions.setCanManageCommunitySettings(input.permissions.communityPermissions.canManageCommunitySettings);
      roleDo.permissions.communityPermissions.setCanManageSiteContent(input.permissions.communityPermissions.canManageSiteContent);
      roleDo.permissions.communityPermissions.setCanManageMembers(input.permissions.communityPermissions.canManageMembers);
      roleDo.permissions.communityPermissions.setCanEditOwnMemberProfile(input.permissions.communityPermissions.canEditOwnMemberProfile);
      roleDo.permissions.communityPermissions.setCanEditOwnMemberAccounts(input.permissions.communityPermissions.canEditOwnMemberAccounts);

      roleDo.permissions.propertyPermissions.setCanManageProperties(input.permissions.propertyPermissions.canManageProperties);
      roleDo.permissions.propertyPermissions.setCanEditOwnProperty(input.permissions.propertyPermissions.canEditOwnProperty);

      roleDo.permissions.serviceTicketPermissions.setCanCreateTickets(input.permissions.serviceTicketPermissions.canCreateTickets);
      roleDo.permissions.serviceTicketPermissions.setCanManageTickets(input.permissions.serviceTicketPermissions.canManageTickets);
      roleDo.permissions.serviceTicketPermissions.setCanAssignTickets(input.permissions.serviceTicketPermissions.canAssignTickets);
      roleDo.permissions.serviceTicketPermissions.setCanWorkOnTickets(input.permissions.serviceTicketPermissions.canWorkOnTickets);

      roleToReturn = new RoleConverter().toMongo(await repo.save(roleDo));
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
      roleDo.requestDeleteAndReassignTo(newROleDo);
      roleToReturn = new RoleConverter().toMongo(await repo.save(roleDo))
    });
    return roleToReturn;
  }
}