import { CosmosDataSource } from "../../../data-sources/cosmos-data-source";
import { StaffRoleData } from "../../../external-dependencies/datastore";
import { AppContext } from "../../../init/app-context-builder";

export interface StaffRoleDataApi {
  getRoleById(id: string): Promise<StaffRoleData>;
  getRoles(): Promise<StaffRoleData[]>;
  getRolesByCommunityId(communityId: string): Promise<StaffRoleData[]>;
}

export class RoleDataApiImpl extends CosmosDataSource<StaffRoleData, AppContext>
  implements StaffRoleDataApi {

  async getRoleById(id: string): Promise<StaffRoleData> {
    const roles = await this.findByFields({ community: this.context.community?.id });
    const roleToReturn = roles.find(role => role.id === id);
    if (roleToReturn && this.applyPermissions(roleToReturn)) {
      return roleToReturn;
    }
  }

  async getRoles(): Promise<StaffRoleData[]> {
    const rolesToReturn = await this.findByFields({ community: this.context.community?.id });
    rolesToReturn.filter(roleData => this.applyPermissions(roleData));
    return rolesToReturn;
  }

  async getRolesByCommunityId(communityId: string): Promise<StaffRoleData[]> {
    const rolesToReturn = await this.findByFields({ community: communityId });
    rolesToReturn.filter(roleData => this.applyPermissions(roleData));
    return rolesToReturn;
  }

  private applyPermissions(roleData: StaffRoleData) {
    if (this.context.passport.datastoreVisa.forStaffRole(roleData).determineIf((permissions) => permissions?.canManageStaffRolesAndPermissions || permissions.isSystemAccount)) {
      return true;
    }
    return false;
  }
}
