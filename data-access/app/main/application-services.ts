
import { CommunityApi } from "../../src/components/community/api";
import { MemberApi } from "../../src/components/member/api";
import { PropertyApi } from "../../src/components/application-services/property";
import { CasesApi } from "../../src/components/cases/cases.api-impl";
import { RoleApi } from "../../src/components/roles/role.api-impl";
import { ServiceApi } from "../../src/components/service/api";
import { UsersApi } from "../../src/components/users/user.api-impl";

export interface ApplicationServices {
  community: CommunityApi;
  member: MemberApi;
  property: PropertyApi;
  cases: CasesApi;
  roles: RoleApi;
  users: UsersApi;
  service: ServiceApi;
}

export {
  CommunityApi,
  MemberApi,
  PropertyApi,
  CasesApi,
  RoleApi,
  UsersApi,
  ServiceApi,
}