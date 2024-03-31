import { RoleDataStructure } from "../../../infrastructure-impl/datastore/data-structures/role";

export interface RoleDatastoreApplicationService {
  getRoleById(id: string): Promise<RoleDataStructure>;
  getRoles(): Promise<RoleDataStructure[]>;
  getRolesByCommunityId(communityId: string): Promise<RoleDataStructure[]>;
}