import { RoleData } from "../../external-dependencies/datastore";
import { CosmosDataSource } from "./cosmos-data-source";
import { RoleDataApi } from "../../application-services/datastore";
import { AppContext } from "../../app-context-builder";

export class RoleDataApiImpl extends CosmosDataSource<RoleData, AppContext> 
  implements RoleDataApi{

  async getRoleById(id: string): Promise<RoleData> {
    const roles = await this.findByFields({ community: this.context.communityId })
    return roles.find(role => role.id === id);
  }

  async getRoles(): Promise<RoleData[]> {
    return this.findByFields({ community: this.context.communityId });
  }

  async getRolesByCommunityId(communityId: string): Promise<RoleData[]> {
    return this.findByFields({ community: communityId });
  }
}
