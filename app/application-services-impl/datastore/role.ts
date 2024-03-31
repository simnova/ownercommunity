/** @format */

import { RoleDatastoreApplicationService } from "../../core/application-services/datastore/role.interface";
import { RoleDataStructure } from "../../core/application-services/datastore";
import { Context } from '../../core/context';
import { DatastoreApplicationServiceImpl } from "./_datastore.application-service";

export class RoleDatastoreApplicationServiceImpl 
  extends DatastoreApplicationServiceImpl<Context> 
  implements RoleDatastoreApplicationService
{

  async getRoleById(roleId: string): Promise<RoleDataStructure> {
    let roleToReturn: RoleDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      roleToReturn = (await datastore.roleDatastore.findByFields({ id: roleId, community: this.context.community }))?.[0];
    });
    return roleToReturn;
  }

  async getRoles(): Promise<RoleDataStructure[]> {
    let roleToReturn: RoleDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      roleToReturn = await datastore.roleDatastore.findByFields({ community: this.context.community });
    });
    return roleToReturn;
  }

  async getRolesByCommunityId(communityId: string): Promise<RoleDataStructure[]> {
    let roleToReturn: RoleDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      roleToReturn = await datastore.roleDatastore.findByFields({ community: communityId });
    });
    return roleToReturn;
  }
}
