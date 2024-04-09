import { RoleData } from "../../external-dependencies/datastore";
import { RoleAddInput, RoleDeleteAndReassignInput, RoleUpdateInput } from "../../external-dependencies/graphql-api";

export interface RoleDomainApplicationService {
  roleAdd(input: RoleAddInput) : Promise<RoleData>;
  roleUpdate(input: RoleUpdateInput) : Promise<RoleData>;
  roleDeleteAndReassign(input: RoleDeleteAndReassignInput) : Promise<RoleData>;
}