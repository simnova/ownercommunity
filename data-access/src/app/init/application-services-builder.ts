import { 
  ApplicationServices,
  CommunityApi,
  MemberApi,
  PropertyApi,
  ServiceTicketApi,
  PaymentApi,
  ViolationTicketApi,
  ServiceApi,
  RoleApi,
  UserApi,
} from "../application-services";
import { AppContext } from "./app-context-builder";
import { CommunityApiImpl } from "../application-services/community";
import { MemberApiImpl } from "../application-services/member";
import { PropertyApiImpl } from "../application-services/property";
import { RoleApiImpl } from "../application-services/role";
import { ServiceApiImpl } from "../application-services/service";
import { ServiceTicketApiImpl } from "../application-services/service-ticket";
import { UserApiImpl } from "../application-services/user";
import { ViolationTicketApiImpl } from "../application-services/violation-ticket";
import { PaymentApiImpl } from "../application-services/payment";
;
export class ApplicationServicesBuilder implements ApplicationServices {
  community: CommunityApi;
  member: MemberApi;
  property: PropertyApi;
  serviceTicket: ServiceTicketApi;
  violationTicket: ViolationTicketApi;
  service: ServiceApi;
  role: RoleApi;
  user: UserApi;
  payment: PaymentApi;

  constructor(context: AppContext) {
    this.community = new CommunityApiImpl(context);
    this.member = new MemberApiImpl(context);
    this.property = new PropertyApiImpl(context);
    this.serviceTicket = new ServiceTicketApiImpl(context);
    this.violationTicket = new ViolationTicketApiImpl(context);
    this.service = new ServiceApiImpl(context);
    this.role = new RoleApiImpl(context);
    this.user = new UserApiImpl(context);
    this.payment = new PaymentApiImpl(context);
  }
}