import { Role as RoleDO } from '../../../app/domain/contexts/community/role';
import { RoleConverter, RoleDomainAdapter }from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/role.domain-adapter';
import { MongoRoleRepository } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/role.mongo-repository';
import { GraphqlContext } from '../../graphql-context';
import { RoleAddInput, RoleDeleteAndReassignInput, RoleUpdateInput } from '../../schema/builder/generated';
import { DomainDataSource } from './domain-data-source';
import { Role } from '../../../infrastructure-services-impl/datastore/mongodb/models/role';
import { CommunityConverter } from '../../../infrastructure-services-impl/datastore/mongodb/infrastructure/community.domain-adapter';
import { ReadOnlyPassport } from '../../../app/domain/contexts/iam/passport';

type PropType = RoleDomainAdapter;
type DomainType = RoleDO<PropType>;
type RepoType = MongoRoleRepository<PropType>;

export class Roles extends DomainDataSource<GraphqlContext,Role,PropType,DomainType,RepoType> {

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