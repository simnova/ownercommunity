/** @format */

import { RoleDatastoreApplicationService } from "../../app/application-services/datastore/role.interface";
import { RoleDataStructure } from "../../app/application-services/datastore";
import { AppContext } from '../../app/app-context';
import { DatastoreApplicationServiceImpl } from "./_datastore.application-service";

export class RoleDatastoreApplicationServiceImpl 
  extends DatastoreApplicationServiceImpl<AppContext> 
  implements RoleDatastoreApplicationService
{

  async getRoleById(roleId: string): Promise<RoleDataStructure> {
    let roleToReturn: RoleDataStructure;
    await this.withDatastore(async (_passport, datastore) => {
      roleToReturn = (await datastore.roleDatastore.findByFields({ id: roleId, community: this.context.communityId }))?.[0];
    });
    return roleToReturn;
  }

  async getRoles(): Promise<RoleDataStructure[]> {
    let roleToReturn: RoleDataStructure[];
    await this.withDatastore(async (_passport, datastore) => {
      roleToReturn = await datastore.roleDatastore.findByFields({ community: this.context.communityId });
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
