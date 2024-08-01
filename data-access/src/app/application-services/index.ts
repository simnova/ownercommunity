
import { CommunityApi } from "./community";
import { MemberApi } from "./member";
import { PropertyApi } from "./property";
import { CasesApi } from "./cases";
import { PaymentApi } from "./payment";
import { RoleApi } from "./role";
import { UserApi } from "./user";
import { ServiceApi } from "./service";

export interface ApplicationServices {
  community: CommunityApi;
  member: MemberApi;
  property: PropertyApi;
  cases: CasesApi;
  role: RoleApi;
  user: UserApi;
  service: ServiceApi;
  payment: PaymentApi; 
}

export {
  CommunityApi,
  MemberApi,
  PropertyApi,
  CasesApi,
  RoleApi,
  UserApi,
  ServiceApi,
  PaymentApi
}