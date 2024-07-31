
import { CommunityApi } from "./community";
import { MemberApi } from "./member";
import { PropertyApi } from "./property";
import { CasesApi } from "./cases";
import { RoleApi } from "./roles";
import { UserApi } from "./user";
import { ServiceApi } from "./service";

export interface ApplicationServices {
  community: CommunityApi;
  member: MemberApi;
  property: PropertyApi;
  cases: CasesApi;
  roles: RoleApi;
  user: UserApi;
  service: ServiceApi;
}

export {
  CommunityApi,
  MemberApi,
  PropertyApi,
  CasesApi,
  RoleApi,
  UserApi,
  ServiceApi,
}