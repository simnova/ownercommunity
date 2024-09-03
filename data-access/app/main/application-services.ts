
import { CommunityApi } from "../../src/app/community/api";
import { MemberApi } from "../../src/app/application-services/member";
import { PropertyApi } from "../../src/app/application-services/property";
import { CasesApi } from "../../src/app/application-services/cases";
import { RoleApi } from "../../src/app/application-services/roles";
import { ServiceApi } from "../../src/app/application-services/service";
import { UsersApi } from "../../src/app/application-services/users";

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