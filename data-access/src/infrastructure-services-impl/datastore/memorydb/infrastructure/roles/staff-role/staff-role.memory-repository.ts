import { MemoryBaseAdapter } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-base-adapter";
import { MemoryRepositoryBase } from "../../../../../../../seedwork/services-seedwork-datastore-memorydb/infrastructure/memory-repository";
import { DomainExecutionContext } from "../../../../../../app/domain/domain-execution-context";
import { StaffRole, StaffRoleProps } from "../../../../../../app/domain/contexts/community/roles/staff-role/staff-role";
import { StaffRoleRepository } from "../../../../../../app/domain/contexts/community/roles/staff-role/staff-role.repository";
import { StaffRolePermissionsProps } from "../../../../../../app/domain/contexts/community/roles/staff-role/staff-role-permissions";



export class MemoryStaffRoleCommunityPermissions extends MemoryBaseAdapter {
  canManageStaffRolesAndPermissions: boolean;
  canManageAllCommunities: boolean;
  canDeleteCommunities: boolean;
  canChangeCommunityOwner: boolean;
  canReIndexSearchCollections: boolean;
}

export class MemoryStaffRolePropertyPermissions extends MemoryBaseAdapter {
  // canManageProperties: boolean;
  // canEditOwnProperty: boolean;
  // isEditingOwnProperty: boolean;
  // isSystemAccount: boolean;
}

export class MemoryStaffRoleServicePermissions extends MemoryBaseAdapter {
  // canManageServices: boolean;
  // isSystemAccount: boolean;
}

export class MemoryStaffRoleServiceTicketPermissions extends MemoryBaseAdapter {
  // canCreateTickets: boolean;
  // canManageTickets: boolean;
  // canAssignTickets: boolean;
  // canWorkOnTickets: boolean;
  // isEditingOwnTicket: boolean;
  // isEditingAssignedTicket: boolean;
  // isSystemAccount: boolean;
}

export class MemoryStaffRoleAdminTicketPermissions extends MemoryBaseAdapter {
  // canCreateTickets: boolean;
  // canManageTickets: boolean;
  // canAssignTickets: boolean;
  // canWorkOnTickets: boolean;
  // isEditingOwnTicket: boolean;
  // isEditingAssignedTicket: boolean;
  // isSystemAccount: boolean;
}
export class MemoryStaffRolePermissions extends MemoryBaseAdapter implements StaffRolePermissionsProps {
  private _communityPermissions: MemoryStaffRoleCommunityPermissions;
  get communityPermissions(): MemoryStaffRoleCommunityPermissions {
    if(!this._communityPermissions){
      this._communityPermissions = new MemoryStaffRoleCommunityPermissions();
    }
    return this._communityPermissions;
  }

  private _propertyPermissions: MemoryStaffRolePropertyPermissions;
  get propertyPermissions(): MemoryStaffRolePropertyPermissions {
    if(!this._propertyPermissions){
      this._propertyPermissions = new MemoryStaffRolePropertyPermissions();
    }
    return this._propertyPermissions;
  }

  private _servicePermissions: MemoryStaffRoleServicePermissions;
  get servicePermissions(): MemoryStaffRoleServicePermissions {
    if(!this._servicePermissions){
      this._servicePermissions = new MemoryStaffRoleServicePermissions();
    }
    return this._servicePermissions;
  }

  private _serviceTicketPermissions: MemoryStaffRoleServiceTicketPermissions;
  get serviceTicketPermissions(): MemoryStaffRoleServiceTicketPermissions {
    if(!this._serviceTicketPermissions){
      this._serviceTicketPermissions = new MemoryStaffRoleServiceTicketPermissions();
    }
    return this._serviceTicketPermissions;
  }

  private _adminTicketPermissions: MemoryStaffRoleAdminTicketPermissions;
  get violationTicketPermissions(): MemoryStaffRoleAdminTicketPermissions {
    if(!this._adminTicketPermissions){
      this._adminTicketPermissions = new MemoryStaffRoleAdminTicketPermissions();
    }
    return this._adminTicketPermissions;
  }
}

export class MemoryStaffRole extends MemoryBaseAdapter implements StaffRoleProps {
  // id: string;
  roleName: string;
  roleType?: string;
  discriminatorKey: string;
  isDefault: boolean;
  private _permissions: StaffRolePermissionsProps;
  get permissions(): StaffRolePermissionsProps {
    if(!this._permissions){
      this._permissions = new MemoryStaffRolePermissions();
    }
    return this._permissions;
  };
  createdAt: Date;
  updatedAt: Date;
  schemaVersion: string;
} 

export class MemoryStaffRoleRepository<
  PropType extends StaffRoleProps, 
  DomainType extends StaffRole<PropType>
  > extends MemoryRepositoryBase<DomainExecutionContext, PropType, DomainType> 
    implements StaffRoleRepository<PropType> 
  {

    async getNewInstance(name: string): Promise<StaffRole<PropType>>{
      return StaffRole.getNewInstance(new MemoryStaffRole as unknown as PropType, name, false, this.context);
    }

    async getById(id: string): Promise<StaffRole<PropType>>{
      const role = await this.get(id);
      return role;
    }
}