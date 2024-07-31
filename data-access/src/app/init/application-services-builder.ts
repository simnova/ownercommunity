import { 
  ApplicationServices,
  CommunityApi,
  MemberApi,
  PropertyApi,
  ServiceApi,
  RoleApi,
  UsersApi,
  CasesApi,
} from "../application-services";
import { AppContext } from "./app-context-builder";
import { CommunityApiImpl } from "../application-services/community";
import { MemberApiImpl } from "../application-services/member";
import { PropertyApiImpl } from "../application-services/property";
import { RoleApiImpl } from "../application-services/roles";
import { ServiceApiImpl } from "../application-services/service";
import { UsersApiImpl } from "../application-services/users";
import { CasesApiImpl } from "../application-services/cases";
;
export class ApplicationServicesBuilder implements ApplicationServices {
  community: CommunityApi;
  member: MemberApi;
  property: PropertyApi;
  cases: CasesApi;
  service: ServiceApi;
  roles: RoleApi;
  users: UsersApi;

  constructor(context: AppContext) {
    this.community = new CommunityApiImpl(context);
    this.member = new MemberApiImpl(context);
    this.property = new PropertyApiImpl(context);
    this.cases = new CasesApiImpl(context);
    this.service = new ServiceApiImpl(context);
    this.roles = new RoleApiImpl(context);
    this.users = new UsersApiImpl(context);
  }
}