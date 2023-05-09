/** @format */

import { Role } from "../../../infrastructure/data-sources/cosmos-db/models/role";
import { Context } from "../../context";
import { CosmosDataSource } from "./cosmos-data-source";

export class Roles extends CosmosDataSource<Role, Context> {
  
  async getRoleById(id: string): Promise<Role> {
    return (
      await this.findByFields({ id: id, community: this.context.community })
    )?.[0];
  }

  async getRoles(): Promise<Role[]> {
    return this.findByFields({ community: this.context.community });
  }

  async getRolesByCommunityId(communityId: string): Promise<Role[]> {
    return this.findByFields({ community: communityId });
  }
}
