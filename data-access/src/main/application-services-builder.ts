import { 
  ApplicationServices,
  CommunityApi,
  MemberApi,
  PropertyApi,
  ServiceApi,
  RoleApi,
  UsersApi,
  CasesApi,
} from "../../app/main/application-services";
import { AppContext } from "./app-context-builder";
import { CommunityApiImpl } from "../components/community/api";
import { MemberApiImpl } from "../components/application-services/member";
import { PropertyApiImpl } from "../components/application-services/property";
import { RoleApiImpl } from "../components/application-services/roles";
import { ServiceApiImpl } from "../components/application-services/service";
import { UsersApiImpl } from "../components/application-services/users";
import { CasesApiImpl } from "../components/application-services/cases";
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