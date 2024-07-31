
import { CommunityApi } from "./community";
import { MemberApi } from "./member";
import { PropertyApi } from "./property";
import { CasesApi } from "./cases";
import { RoleApi } from "./roles";
import { ServiceApi } from "./service";
import { UsersApi } from "./users";

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