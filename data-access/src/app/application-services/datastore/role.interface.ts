import { RoleData } from "../../external-dependencies/datastore";

export interface RoleDatastoreApplicationService {
  getRoleById(id: string): Promise<RoleData>;
  getRoles(): Promise<RoleData[]>;
  getRolesByCommunityId(communityId: string): Promise<RoleData[]>;
}