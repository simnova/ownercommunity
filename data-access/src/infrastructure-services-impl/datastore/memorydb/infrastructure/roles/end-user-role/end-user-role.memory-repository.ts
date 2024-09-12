import { MemoryBaseAdapter } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter";
import { MemoryRepositoryBase } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository";
import { CommunityProps, CommunityEntityReference } from "../../../../../../app/domain/contexts/community/community/community";
import { EndUserRoleProps } from "../../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role";
import { EndUserRolePermissionsProps } from "../../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role-permissions";
import { DomainExecutionContext } from "../../../../../../app/domain/domain-execution-context";
import { EndUserRoleRepository } from "../../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role.repository";
import { EndUserRole } from "../../../../../../app/domain/contexts/community/roles/end-user-role/end-user-role";
import { CommunityVisa } from "../../../../../../app/domain/contexts/community/community.visa";

export class MemoryEndUserRoleCommunityPermissions extends MemoryBaseAdapter {
  canManageRolesAndPermissions: boolean;
  canManageCommunitySettings: boolean;
  canManageSiteContent: boolean;
  canManageMembers: boolean;
  canEditOwnMemberProfile: boolean;
  canEditOwnMemberAccounts: boolean;
  isEditingOwnMemberAccount: boolean;
  isSystemAccount: boolean;
}

export class MemoryEndUserRolePropertyPermissions extends MemoryBaseAdapter {
  canManageProperties: boolean;
  canEditOwnProperty: boolean;
  isEditingOwnProperty: boolean;
  isSystemAccount: boolean;
}

export class MemoryEndUserRoleServicePermissions extends MemoryBaseAdapter {
  canManageServices: boolean;
  isSystemAccount: boolean;
}

export class MemoryEndUserRoleServiceTicketPermissions extends MemoryBaseAdapter {
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canAssignTickets: boolean;
  canWorkOnTickets: boolean;
  isEditingOwnTicket: boolean;
  isEditingAssignedTicket: boolean;
  isSystemAccount: boolean;
}

export class MemoryEndUserRoleAdminTicketPermissions extends MemoryBaseAdapter {
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canAssignTickets: boolean;
  canWorkOnTickets: boolean;
  isEditingOwnTicket: boolean;
  isEditingAssignedTicket: boolean;
  isSystemAccount: boolean;
}
export class MemoryPermissions extends MemoryBaseAdapter implements EndUserRolePermissionsProps {
  private _communityPermissions: MemoryEndUserRoleCommunityPermissions;
  get communityPermissions(): MemoryEndUserRoleCommunityPermissions {
    if(!this._communityPermissions){
      this._communityPermissions = new MemoryEndUserRoleCommunityPermissions();
    }
    return this._communityPermissions;
  }

  private _propertyPermissions: MemoryEndUserRolePropertyPermissions;
  get propertyPermissions(): MemoryEndUserRolePropertyPermissions {
    if(!this._propertyPermissions){
      this._propertyPermissions = new MemoryEndUserRolePropertyPermissions();
    }
    return this._propertyPermissions;
  }

  private _servicePermissions: MemoryEndUserRoleServicePermissions;
  get servicePermissions(): MemoryEndUserRoleServicePermissions {
    if(!this._servicePermissions){
      this._servicePermissions = new MemoryEndUserRoleServicePermissions();
    }
    return this._servicePermissions;
  }

  private _serviceTicketPermissions: MemoryEndUserRoleServiceTicketPermissions;
  get serviceTicketPermissions(): MemoryEndUserRoleServiceTicketPermissions {
    if(!this._serviceTicketPermissions){
      this._serviceTicketPermissions = new MemoryEndUserRoleServiceTicketPermissions();
    }
    return this._serviceTicketPermissions;
  }

  private _adminTicketPermissions: MemoryEndUserRoleAdminTicketPermissions;
  get violationTicketPermissions(): MemoryEndUserRoleAdminTicketPermissions {
    if(!this._adminTicketPermissions){
      this._adminTicketPermissions = new MemoryEndUserRoleAdminTicketPermissions();
    }
    return this._adminTicketPermissions;
  }
}

export class MemoryEndUserRole extends MemoryBaseAdapter implements EndUserRoleProps {
  // id: string;
  roleName: string;
  roleType?: string;
  discriminatorKey: string;
  community: CommunityProps;
  setCommunityRef(community: CommunityEntityReference): void{
    this.community = community as CommunityProps;
  };
  isDefault: boolean;
  private _permissions: EndUserRolePermissionsProps;
  get permissions(): EndUserRolePermissionsProps {
    if(!this._permissions){
      this._permissions = new MemoryPermissions();
    }
    return this._permissions;
  };
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
} 

export class MemoryEndUserRoleRepository<
  PropType extends EndUserRoleProps, 
  DomainType extends EndUserRole<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, CommunityVisa, DomainType> 
    implements EndUserRoleRepository<PropType> 
  {

    async getNewInstance(name: string, community: CommunityEntityReference): Promise<EndUserRole<PropType>>{
      return EndUserRole.getNewInstance(new MemoryEndUserRole as unknown as PropType, name, false, community, this.context);
    }

    async getById(id: string): Promise<EndUserRole<PropType>>{
      const role = await this.get(id);
      return role;
    }
}