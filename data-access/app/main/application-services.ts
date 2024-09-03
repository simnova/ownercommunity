
import { CommunityApi } from "../../src/components/community/api";
import { MemberApi } from "../../src/components/application-services/member";
import { PropertyApi } from "../../src/components/application-services/property";
import { CasesApi } from "../../src/components/application-services/cases";
import { RoleApi } from "../../src/components/application-services/roles";
import { ServiceApi } from "../../src/components/application-services/service";
import { UsersApi } from "../../src/components/application-services/users";

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