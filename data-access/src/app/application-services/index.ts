
import { CommunityApi } from "./community";
import { MemberApi } from "./member";
import { PropertyApi } from "./property";
import { ServiceTicketApi } from "./service-ticket";
import { PaymentApi } from "./payment";
import { RoleApi } from "./role";
import { UserApi } from "./user";
import { ServiceApi } from "./service";
import { ViolationTicketApi } from "./violation-ticket";

export interface ApplicationServices {
  community: CommunityApi;
  member: MemberApi;
  property: PropertyApi;
  serviceTicket: ServiceTicketApi;
  violationTicket: ViolationTicketApi;
  role: RoleApi;
  user: UserApi;
  service: ServiceApi;
  payment: PaymentApi; 
}

export {
  CommunityApi,
  MemberApi,
  PropertyApi,
  ServiceTicketApi,
  ViolationTicketApi,
  RoleApi,
  UserApi,
  ServiceApi,
  PaymentApi
}