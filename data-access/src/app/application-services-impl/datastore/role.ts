import { RoleData } from "../../external-dependencies/datastore";
import { CosmosDataSource } from "./cosmos-data-source";
import { RoleDataApi } from "../../application-services/datastore";
import { AppContext } from "../../init/app-context-builder";

export class RoleDataApiImpl extends CosmosDataSource<RoleData, AppContext> 
  implements RoleDataApi{

  async getRoleById(id: string): Promise<RoleData> {
    const roles = await this.findByFields({ community: this.context.communityId })
    const roleToReturn = roles.find(role => role.id === id);
    if(roleToReturn && this.applyPermissions(roleToReturn)){
      return roleToReturn;
    }
  }

  async getRoles(): Promise<RoleData[]> {
    const rolesToReturn = await this.findByFields({ community: this.context.communityId });
    rolesToReturn.filter(roleData => this.applyPermissions(roleData));
    return rolesToReturn;
  }

  async getRolesByCommunityId(communityId: string): Promise<RoleData[]> {
    const rolesToReturn = await this.findByFields({ community: communityId });
    rolesToReturn.filter(roleData => this.applyPermissions(roleData));
    return rolesToReturn;
  }

  private applyPermissions(roleData: RoleData) {
    if(this.context.passport.datastoreVisa.forRole(roleData).determineIf((permissions) => permissions.canManageRolesAndPermissions || permissions.isSystemAccount)){
      return true;
    }
    return false;
  }
}

