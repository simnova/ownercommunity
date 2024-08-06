import { CosmosDataSource } from "../../../data-sources/cosmos-data-source";
import { EndUserRoleData } from "../../../external-dependencies/datastore";
import { AppContext } from "../../../init/app-context-builder";

export interface EndUserRoleDataApi {
  getRoleById(id: string): Promise<EndUserRoleData>;
  getRoles(): Promise<EndUserRoleData[]>;
  getRolesByCommunityId(communityId: string): Promise<EndUserRoleData[]>;
}

export class EndUserRoleDataApiImpl extends CosmosDataSource<EndUserRoleData, AppContext>
  implements EndUserRoleDataApi {

  async getRoleById(id: string): Promise<EndUserRoleData> {
    const roles = await this.findByFields({ community: this.context.community?.id });
    const roleToReturn = roles.find(role => role.id === id);
    if (roleToReturn && this.applyPermissions(roleToReturn)) {
      return roleToReturn;
    }
  }

  async getRoles(): Promise<EndUserRoleData[]> {
    let rolesToReturn = await this.findByFields({ community: this.context.community?.id });
    rolesToReturn = rolesToReturn.filter(roleData => this.applyPermissions(roleData));
    return rolesToReturn;
  }

  async getRolesByCommunityId(communityId: string): Promise<EndUserRoleData[]> {
    let rolesToReturn = await this.findByFields({ community: communityId });
    rolesToReturn = rolesToReturn.filter(roleData => this.applyPermissions(roleData));
    return rolesToReturn;
  }

  private applyPermissions(roleData: EndUserRoleData) {
    if (this.context.passport.datastoreVisa.forEndUserRole(roleData).determineIf((permissions) => permissions.canManageStaffRolesAndPermissions || permissions.canManageRolesAndPermissions || permissions.isSystemAccount)) {
      return true;
    }
    return false;
  }
}
