import { RoleData } from "../../infrastructure-services/datastore";

export interface RoleDatastoreApplicationService {
  getRoleById(id: string): Promise<RoleData>;
  getRoles(): Promise<RoleData[]>;
  getRolesByCommunityId(communityId: string): Promise<RoleData[]>;
}