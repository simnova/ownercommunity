import { CommunityEntityReference, CommunityProps } from "../../../../app/domain/contexts/community/community";
import { PermissionsProps } from "../../../../app/domain/contexts/community/permissions";
import { Role, RoleProps } from "../../../../app/domain/contexts/community/role";
import { RoleRepository } from "../../../../app/domain/contexts/community/role.repository";
import { DomainExecutionContext } from "../../../../app/domain/contexts/domain-execution-context";
import { MemoryBaseAdapter } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter";
import { MemoryRepositoryBase } from "../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository";


export class MemoryCommunityPermissions extends MemoryBaseAdapter {
  canManageRolesAndPermissions: boolean;
  canManageCommunitySettings: boolean;
  canManageSiteContent: boolean;
  canManageMembers: boolean;
  canEditOwnMemberProfile: boolean;
  canEditOwnMemberAccounts: boolean;
  isEditingOwnMemberAccount: boolean;
  isSystemAccount: boolean;
}

export class MemoryPropertyPermissions extends MemoryBaseAdapter {
  canManageProperties: boolean;
  canEditOwnProperty: boolean;
  isEditingOwnProperty: boolean;
  isSystemAccount: boolean;
}

export class MemoryServicePermissions extends MemoryBaseAdapter {
  canManageServices: boolean;
  isSystemAccount: boolean;
}

export class MemoryServiceTicketPermissions extends MemoryBaseAdapter {
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canAssignTickets: boolean;
  canWorkOnTickets: boolean;
  isEditingOwnTicket: boolean;
  isEditingAssignedTicket: boolean;
  isSystemAccount: boolean;
}
export class MemoryPermissions extends MemoryBaseAdapter implements PermissionsProps {
  private _communityPermissions: MemoryCommunityPermissions;
  get communityPermissions(): MemoryCommunityPermissions {
    if(!this._communityPermissions){
      this._communityPermissions = new MemoryCommunityPermissions();
    }
    return this._communityPermissions;
  }

  private _propertyPermissions: MemoryPropertyPermissions;
  get propertyPermissions(): MemoryPropertyPermissions {
    if(!this._propertyPermissions){
      this._propertyPermissions = new MemoryPropertyPermissions();
    }
    return this._propertyPermissions;
  }

  private _servicePermissions: MemoryServicePermissions;
  get servicePermissions(): MemoryServicePermissions {
    if(!this._servicePermissions){
      this._servicePermissions = new MemoryServicePermissions();
    }
    return this._servicePermissions;
  }

  private _serviceTicketPermissions: MemoryServiceTicketPermissions;
  get serviceTicketPermissions(): MemoryServiceTicketPermissions {
    if(!this._serviceTicketPermissions){
      this._serviceTicketPermissions = new MemoryServiceTicketPermissions();
    }
    return this._serviceTicketPermissions;
  }
}

export class MemoryRole extends MemoryBaseAdapter implements RoleProps {
  // id: string;
  roleName: string;
  community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference): void{
    this.community = community as CommunityProps;
  };
  isDefault: boolean;
  private _permissions: PermissionsProps;
  get permissions(): PermissionsProps {
    if(!this._permissions){
      this._permissions = new MemoryPermissions();
    }
    return this._permissions;
  };
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
} 

export class MemoryRoleRepository<
  PropType extends RoleProps, 
  DomainType extends Role<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
    implements RoleRepository<PropType> 
  {

    async getNewInstance(name: string, community: CommunityEntityReference): Promise<Role<PropType>>{
      return Role.getNewInstance(new MemoryRole as unknown as PropType, name, false, community, this.context);
    }

    async getById(id: string): Promise<Role<PropType>>{
      const role = await this.get(id);
      return role;
    }
}