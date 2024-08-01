import { 
  ApplicationServices,
  CommunityApi,
  MemberApi,
  PropertyApi,
  PaymentApi,
  ServiceApi,
  RoleApi,
  UserApi,
  CasesApi,
} from "../application-services";
import { AppContext } from "./app-context-builder";
import { CommunityApiImpl } from "../application-services/community";
import { MemberApiImpl } from "../application-services/member";
import { PropertyApiImpl } from "../application-services/property";
import { RoleApiImpl } from "../application-services/role";
import { ServiceApiImpl } from "../application-services/service";
import { UserApiImpl } from "../application-services/user";
import { PaymentApiImpl } from "../application-services/payment";
import { CasesApiImpl } from "../application-services/cases";
;
export class ApplicationServicesBuilder implements ApplicationServices {
  community: CommunityApi;
  member: MemberApi;
  property: PropertyApi;
  cases: CasesApi;
  service: ServiceApi;
  role: RoleApi;
  user: UserApi;
  payment: PaymentApi;

  constructor(context: AppContext) {
    this.community = new CommunityApiImpl(context);
    this.member = new MemberApiImpl(context);
    this.property = new PropertyApiImpl(context);
    this.cases = new CasesApiImpl(context);
    this.service = new ServiceApiImpl(context);
    this.role = new RoleApiImpl(context);
    this.user = new UserApiImpl(context);
    this.payment = new PaymentApiImpl(context);
  }
}