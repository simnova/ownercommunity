/** @format */

import { Role } from "../../../infrastructure-impl/datastore/mongodb/models/role";
import { Context } from "../../context";
import { CosmosDataSource } from "./cosmos-data-source";

export class Roles extends CosmosDataSource<Role, Context> {

  async getRoleById(id: string): Promise<Role> {
    const roles = await this.findByFields({ community: this.context.community })
    const result = roles.find(role => role.id === id);
    return result
  }

  async getRoles(): Promise<Role[]> {
    return this.findByFields({ community: this.context.community });
  }

  async getRolesByCommunityId(communityId: string): Promise<Role[]> {
    return this.findByFields({ community: communityId });
  }
}
