/** @format */

import { Role } from "../../../infrastructure-services-impl/datastore/mongodb/models/role";
import { GraphqlContext } from "../../graphql-context";
import { CosmosDataSource } from "./cosmos-data-source";

export class Roles extends CosmosDataSource<Role, GraphqlContext> {

  async getRoleById(id: string): Promise<Role> {
    const roles = await this.findByFields({ community: this.context.community })
    return roles.find(role => role.id === id);
  }

  async getRoles(): Promise<Role[]> {
    return this.findByFields({ community: this.context.community });
  }

  async getRolesByCommunityId(communityId: string): Promise<Role[]> {
    return this.findByFields({ community: communityId });
  }
}
