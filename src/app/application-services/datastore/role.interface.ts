import { RoleDataStructure } from "../../../infrastructure-services-impl/datastore/data-structures/role";

export interface RoleDatastoreApplicationService {
  getRoleById(id: string): Promise<RoleDataStructure>;
  getRoles(): Promise<RoleDataStructure[]>;
  getRolesByCommunityId(communityId: string): Promise<RoleDataStructure[]>;
}