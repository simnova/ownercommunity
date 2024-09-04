import { 
  ApplicationServices,
  CommunityApi,
  MemberApi,
  PropertyApi,
  ServiceApi,
  RoleApi,
  UsersApi,
  CasesApi,
} from "./application-services";
import { AppContext } from "./app-context-builder";
import { CommunityApiImpl } from "../../src/components/community/api";
import { MemberApiImpl } from "../../src/components/member/api";
import { PropertyApiImpl } from "../../src/components/application-services/property";
import { RoleApiImpl } from "../../src/components/roles/role.api-impl";
import { ServiceApiImpl } from "../../src/components/service/api";
import { UsersApiImpl } from "../../src/components/users/user.api-impl";
import { CasesApiImpl } from "../../src/components/cases/cases.api-impl";
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